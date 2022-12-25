# React Part 3

## 01. Transition
- UI가 나타나거나 사자릴 때 특정 애니메이션을 추가해줌
- CSS를 통해 transition 효과를 줄 수 있음!

### 구현 방법
- 애니메이션 동작 전/후로 CSS를 제작
- 나타나거나 사라질 때 탈부착시켜줌!
- App.css
  ```css
  .aniStart {
    opacity: 0;
    transform: scale(0);
  }

  .aniDispose {
    opacity: 1;
    transform: scale(1);
    /* transition: opacity 0.5s; */  
    /* opacity가 변경되었을 때 0.5초간 서서히 변경됨 */

    /* transition: all 0.5s; */
    transition: opacity 1s, transform 0.5s;
    /* 여러 효과를 적용 시, all 또는 쉼표로 나누어 적으면 됨 */
  }
  ```
- Detail.js
  ```jsx
  // 탭 애니메이션
  let [fade, setFade] = useState('')

  useEffect(
    () => {
      // react18 Automatic batching
      let fader = setTimeout(() => {
        setFade('aniDispose')
      }, 100);
      return () => {
        setFade('')
        clearTimeout(fader)
      }
    },
    [tabIdx]
  )

  return (
    <div className={`aniStart ${fade}`}>
      { 
        [
          <div>내용0</div>,
          <div>내용1</div>,
          <div>내용2</div>,
        ][tabIdx]
      }
    </div>
  )
  ```

### CSS 클래스명이 여러 개일 경우?
- **❗️CSS 파일 내부에 작성된❗️ 클래스명 순서대로 CSS가 적용된다.**
- 따라서, `className = "aniStart aniDispose"`인 경우,
- opacity는 1이 적용된다!
- [참고](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=ath87&logNo=220364319713)

### CSS 여러 transition 주고 싶은 경우?
- 여러 효과를 적용 시, all 또는 쉼표로 나누어 적으면 됨
  ```css
  {
    transition: all 0.5s;
    /* 또는 */
    transition: opacity 1s, transform 0.5s;
  }
  ```

### Automatic Batching
- 위의 예제에서 왜 `setTimeout()`으로 시간차를 두었을까?
- React18, `Automatic Batching` 기능!
  - state 변경 함수 실행할 때마다 재랜더링 되는 것이 아니라
  - 마지막 state 변경된 이후 재랜더링을 하게 됨!
  - 따라서, `start → dispose` state 변경 시, `dispose`만 적용됨!



### Destructuring ⭐️
- ES6 문법
- 배열 또는 객체를 분해된 상태로 받을 수 있음!
- 배열
  ```js
  function useState() {
    return [state, setter]
  }
  ...
  let [number, setNumber] = useState(0)
  ```
- 객체
  ```js
  let obj = { car: "Hyundai", phone: "Galaxy" }
  let carName = obj.car
  let { car } = obj
  ```
- [참고](https://poiemaweb.com/es6-destructuring)

<br>

## 02. 상태관리 (Context API)

### SPA 문제점
- 컴포넌트간 state 공유가 어려움!
- 부모에서 자식의 자식으로 넘기기 위해
  - 부모 → 자식1 → 자식2 → ... → 자식n 까지 계속해서 props로 넘겨야 함!
- React에서 이를 해결하기 위한 방법은 2가지가 있음
  - Context API (React 기본문법)
  - Redux, React Query, Recoil같은 외부 라이브러리 사용하기

### Context API
- props 전송 없이 state 공유 가능!
- 단, 많이 사용되지는 않는데...
  - 성능 이슈, 컴포넌트 재활용이 어려움 등...

### Context API 사용해보자!
- App.js
  ```jsx
  import { useState } from "react";

  // Context(state 바구니) 생성
  export let Context1 = createContext()
  ...
  let stock = useState()
  ...
  <Context1.Provider 
    value={
      {stock, shoesData}
    }>
    <Detail/> 
  </Context1.Provider>
  ```
- Detail.js
  ```jsx
  import { Context1 } from './App.js'
  ...
  function TabContent({tabIdx}) {
    // 바구니 해체
    let contextData = useContext(Context1)
    let { shoesData, stock } = useContext(Context1)
    // 값 사용
    console.log(contextData)
    console.log(shoesData)
    console.log(stock)
    ...
  }
  ```

### 근데 왜 Context API 안쓸까?
- 작은 프로젝트에서는 나름 쓸만하지만, 프로젝트가 커질수록 아래와 같은 문제가 발생
  1. `<Context.Provider>` 안에 묶인 모든 컴포넌트를 재랜더링함
  2. 컴포넌트 재사용이 어려움
    - Ex> `<TabContent>` 안에서 `useContext()` 사용했는데...
    - 다른 페이지에 Context가 묶여있지 않아 Component 링킹이 안될 경우!

그래서...

<br>

## 03. 상태관리 (Redux)
- State 관리 라이브러리
- 컴포넌트 간 state 공유 시 활용
- `redux store.js` 안에 모든 state를 저장해두고 꺼내쓰는 느낌!
- 정말 많이 쓰는 라이브러리
  - `Jotai`, `Zustand` 등 다른 라이브러리들도 있음

### redux 설치하기
- React18 이상
- 설치 스크립트
  ```sh
  $ npm install @reduxjs/toolkit react-redux
  # 또는
  $ yarn add @reduxjs/toolkit react-redux
  ```
- store.js 생성
  ```js
  import { configureStore } from "@reduxjs/toolkit";

  export default configureStore(
    {
      reducer: {

      }
    }
  )
  ```
- index.js
  ```js
  import { Provider } from 'react-redux';
  import store from './store/store';
  ...
  <Provider
    store={store}
    >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ```

### redux 사용해보기
- redux store에 state 만들기
  1. slice 생성 후,
    - 하나의 state를 slice라고 함!
    - `createSlice()`: `useState()`와 비슷한 역할
  2. reducer에 등록!
    - 여기에 등록한 형태와 같은 형태로 저장됨! (키: 값)
    ```js
    import { configureStore, createSlice } from "@reduxjs/toolkit";

    // 1.
    let user = createSlice({
      name: "user",
      initialState: "김길동"
    })

    let stock = createSlice({
      name: "stock",
      initialState: 0,
    })

    export default configureStore(
      {
        reducer: {
          // 2.
          user: user.reducer,
          stock: stock.reducer,
        }
      }
    )
    ```
- 컴포넌트에서 정보 가져오기
  ```js
  // store에 있는 state 가져옴
  let data = useSelector(
    (state) => {
      // store안에 모든 state
      return state
    }
  )
  console.log(data)
  ```
  ```js
  {user: '김길동', stock: 0}
  ```

### useSelector()
- state를 파라미터로 하는 함수를 콜백으로 넣어야 함
- 여기에서 state는 **redux store에 저장한 것을 말함!!**
  ```js
  // name값만 가져옴
  let username = useSelector(
    (state) => state.name
  )

  // 재고값만 가져옴
  let stockRemain = useSelector(
    (state) => state.stock
  )
  ```

### redux 주의점
- 모든 state를 redux에 넣을 필요는 없다!!


### redux setState
1. state를 수정하는 함수를 slice안에 구현하고
2. 만든 함수 export
3. 필요한 곳에서 불러와서 사용 (store.js에 요청하도록 제작)
  ```jsx
  let user = createSlice({
    name: "user",
    initialState: "김길동",

    // 1.
    reducers: {
      setUser(state) {
        return "홍길동 " + state
      }
    }
  })

  // 2. 
  // user.actions -> reducers 안에 내용이 나옴
  export let { setUser } = user.actions
  ```
  ```jsx
  // 3.
  import { setUser } from "../store/store"
  ...
  let dispatch = useDispatch()
  ...
  <button
    onClick={() => {
      dispatch(setUser())
      // setUser() // 이거만쓰면 동작 안함
      console.log(user)
    }}>
    +
  </button>
  ```

#### redux 왜 이렇게 복잡한가 (`dispatch()`) ⭐️⭐️⭐️
- dispatch → '보내다'라는 뜻
  - store.js에 setUser() 실행해달라고 요청한 것
- **컴포넌트 개수가 무지막지하게 늘어났을 경우..**
- 여러 컴포넌트가 변경함수를 각각 짜서 수정하면 디버깅이 매우 어려워짐!!
- 요청 함수(dispatch)를 통해 요청하면?
  - 변경은 무조건 변경 함수(위에서는 `setUser()`)에서만 일어나므로 이거만 조사하면 됨!

### redux에 state가 array 또는 object인 경우
1. 함수 return을 해도 되지만
2. **직접 state를 변경해도 가능!!**
  ```jsx
  reducers: {
    setPerson(state) {
      // 1. 
      // return { name: "홍길동", age: 20 }  
      
      // 2.
      state.name = "홍길동"
    },
    addAge(state, action) {
      state.age += action.payload // payload: 화물/소포
    }
  }
  ```
- state 변경 시, array/object 타입이면 `.`연산자로 접근하여 변경
  - state로 수정을 편리하게 하기 위해 **보통 그냥 값도 {} 형태로 저장함!!**

### redux action에 파라미터를 추가로 받는 방법
- slice 안에있는 모든 함수들을 엑션이라고 함!!
  ```js
  reducers: {
    setPerson(state) {},
    addAge(state, action) {},
    ...
  }
  ```
- 여기서 액션함수에서 action 파라미터를 받을 수 있는데,
- `action.payload`를 하면 함수 파라미터를 값으로 받을 수 있다!
  - store.js  
    ```js
    dispatch(addAge(12))
    ```
  - cart.js
    ```js
    addAge(state, action) {
      state = action.payload
    },
    ```

### slice를 외부 파일로 빼내기
- slice 코드가 길어지기 때문에 보통 파일을 빼서 import/export로 관리함!!
  - personSlice.js
    ```js
    import { createSlice } from "@reduxjs/toolkit";

    const person = createSlice({
      name: "person",
      initialState: {},
      reducers: {
        setPerson(state) {},
        addAge(state, action) {}
        ...
      }
    })

    export let { setPerson, addAge } = person.actions
    export default person
    ```
  - store.js
    ```js
    import person from './personSlice'
    ...
    export default configureStore(
      {
        reducer: {
          person: person.reducer,
        }
      }
    )
    ```
  - cart.js
    ```js
    import { addAge, setPerson } from "../store/personSlice"
    ...
    dispatch(setPerson())
    ```

### Redux Toolkit
- 지금까지 배운 내용은 Redux가 아닌 Redux Toolkit에 대한 내용임
- 둘 다 같은 개발자가 만든 것이고,
- Redux Toolkit 사용이 권장됨
- 기능은 동일하고 표현법이 약간 다름 (기존 Redux가 사용하기 어려웠음)

### Redux Toolkit 정리!!
- Redux Store & Slice 만들기
  - 최상위 태그에 `<Provider store={store}>` 등록
  - `store.js`에 `configureSlice()` 생성 (reducer)
  - `createSlice()` 생성 (name, initialState, reducers)

<br>

- 값 가져다쓰기
  1. `useSelector(state => state)`로 redux state 가져오기
  2. reducer에 등록한 state에 접근해서 값 가져오기

<br>

- state 수정함수 만들기
  1. 수정함수(action) 만들기
    - 수정된 값을 return하거나, 직접 `state`를 수정
    - `action.payload`를 통해 파라미터값 가져오기
  2. export
  3. 원하는 곳에서 import한 이후에
  4. `useDispatch()`, `dispatch(수정함수())` 사용

### Redux 상태가 살아있는 기간
- 새로고침하거나 페이지가 아예 리로딩(리랜더링X)되면 **store가 초기화된다!!**
- `redux-persist`를 사용하거나,
- **Local Storage**를 사용해야 함!!

<br>

## 04. Local Storage

### state가 유지되는 기간
- 새로고침하거나 재접속하면 모든 state가 날아감!!
- 이를 해결하기 위해,
  1. 서버 DB에 정보를 저장
  2. 브라우저 안에 있는 Local Storage에 저장!!
    - 개발자 도구 → Application 탭 → Local Storage 탭

### Local Stroage 저장 방식
- key-value 형태
- 문자만 저장 가능
- 5MB 저장 가능
- **사용자가 브라우저 청소 안하면 영구적으로 남게 됨!!**

### Session Storage
- 휘발성, 브라우저를 종료하면 데이터가 날라감!

### Console창을 활용하여 Local Storage 사용해보기
- 생성, 수정: `localStorage.setItem("key", "value")`
- 값 가져오기: `localStorage.getItem("key")`
- 삭제: `localStorage.removeItem()`
- localStorage를 sessionStorage로 바꾸면 세션 스토리지 사용 가능!!
- 단, **문자만 저장 가능!!**
  - `localStorage.setItem("age", 23)`
  - `localStorage.getItem("age")` → `'23'`

### Local Storage에 object, array 저장하는 방법
- 문자만 저장되기 때문에 아래와 같이 정상적으로 저장되지 않음  
  ```js
  let obj = {name: "kim"}
  localStorage.setItem("key", obj)
  localStorage.getItem("key")
  ```
  ```js
  '[object Object]'
  ```
- 따라서 JSON을 활용!
  - js → string: `JSON.stringify()`
    ```js
    let obj = {name: "kim"}
    localStorage.setItem("key", JSON.stringify(obj))
    localStorage.getItem("key")
    ```
    ```js
    '{"name":"kim"}'
    ```
  - js → string: `JSON.parse()`
    ```js
    JSON.parse(localStorage.getItem("key"))
    ```

<br>

## 05. React Query

### 서버와 통신하는 코드 작성 시 고려할 점
- AJAX 성공 및 실패 시 보여줄 HTML?
- 일정 시간마다 AJAX 요청
- 실패 시, 일정 시간 이후 다시 재요청?
- 다음 페이지 내용을 미리 가져오기? (prefetch)
- **이러한 기능들을 React Query로 쉽게 구현할 수 있음!!**
  - 실시간 데이터를 지속적으로 사용하는 경우 유용함 (주식, 실시간 SNS 등)
### 사용해보기! 
- 페키지 설치
  ```sh
  $ npm install react-query
  # 혹은
  $ yarn add react-query
  ```
- index.js
  ```js
  // react-query 설정
  import { QueryClient, QueryClientProvider } from 'react-query'
  const queryClient = new QueryClient()
  ...
  root.render(
    <QueryClientProvider client={queryClient}>
      ...
    </QueryClientProvider>
  );
  ```

### 서버에서 정보 가져와보기
- 코드
  ```js
  // react-query!
  let result = useQuery('queryKey', () => {
    return axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
      console.log('api 요청됨')
      return a.data
    })
  })
  ```

### useQuery()
- 실제 받아온 데이터: `data`
- 상태 확인: `dataUpdatedAt`, `error`, `errorUpdateCount`, `errorUpdatedAt`, `failureCount`, `status`
- 상태 확인(T/F): `isError`, `isFetched`, `isFetchedAfterMount`, `isFetching`, `isIdle`, `isLoading`, `isLoadingError`, `isPlaceholderData`, `isPreviousData`, `isRefetchError`, `isRefetching`, `isStale`, `isSuccess`
- 함수 제공: `refetch`, `remove`

### 실제 활용 예시
- 이렇게 사용하면 state 관리 없이도 편하게 개발이 가능해진다!!
  ```jsx
  <Nav className="ms-auto">
    {(result.isLoading) ? `로딩중` : `반가워요 ${result.data.name}`}
  </Nav>
  ```
  ```jsx
  <Nav className="ms-auto">
    { result.isLoading && '로딩중' }
    { result.isError && '에러' }
    { result.data && `반가워요 ${result.data.name}` }
  </Nav>
  ```

### refetch()
- 브라우저 이외 다른 창 포커스 갔다가 다시오면
- `api 요청됨` 로그 찍히는 것을 볼 수 있음!!
- 자동으로 `refetch()` 기능을 동작시킴!!
- `staleTime` 옵션주면, 2초 안에는 refetch가 되지 않음!
  ```js
  // react-query!
  let result = useQuery('queryKey', () => {
    return axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
      console.log('api 요청됨')
      return a.data
    })
  }, { staleTime: 2000 })
  ```
- 실패 시 알아서 다시 데이터를 가져오려고 함 (3번 정도)
  ```js
  // react-query!
  let result = useQuery('queryKey', () => {
    return axios.get("https://codingapple1.github.io/알수없는경로.json").then((a) => {
      console.log('api 요청됨')
      return a.data
    })
  })
  ```
  ```
  GET https://codingapple1.github.io/알수없는경로.json 404
  GET https://codingapple1.github.io/알수없는경로.json 404
  GET https://codingapple1.github.io/알수없는경로.json 404
  GET https://codingapple1.github.io/알수없는경로.json 404
  AxiosError {message: 'Request failed with status code 404' ...
  ```

### react-query state 공유
- `App.js`, `Detail.js`에 각각 위에 이름을 요청하는 react-query 코드를 작성했다고 가정하면,
- react-query가 알아서 한번에 묶어서 실행을 시켜준다!

### react-query caching
- 5분동안 AJAX 결과를 캐싱해둠!
- 결과를 먼저 보여주고 AJAX 요청 후 최신 데이터를 가져옴!

### RTK Query
- Redux Toolkit Query
- redux-toolkit 설치 시 자동으로 따라옴
- 이거를 가져다가 비슷하게 구현이 가능은 함!
- 그러나... 문법이 깨끗하지는 않음.

<br>

## 06. 최적화 & 성능향상/개선

### React Developer Tools
- 구글 크롬 웹스토어에서 설치 가능
- Components
  - 컴포넌트 단위로 UI 확인이 가능함!
  - 각 컴포넌트의 props, state 등을 확인할 수 있음!
- Profiler
  - 각 컴포넌트 별 렌더링 시간을 보여줌
  - 성능 저하를 일으키는 컴포넌트를 찾아볼 수 있음!
  - 참고: 성능 지연의 주요 원인은 AJAX
  
### Redux DevTools
- 구글 크롬 웹스토어에서 설치 가능
- Redux 내의 변경사항을 볼 수 있음!!

### lazy()
- 리엑트는 SPA 컨셉을 가짐!
- 즉, 배포 시, 하나의 JS 파일에 모든 코드 및 컴포넌트가 들어가게 됨!
- 따라서, 한번에 매우 큰 JS, CSS, HTML 파일을 로드해야 사용자가 사용이 가능해짐. (로딩 전까지는 흰 화면)
- `react`에서 제공하는 `lazy()`를 활용하면 필요할 때 해당 컴포넌트를 로딩하게 됨!
  - 또한 빌드 시, JS파일도 별도로 분리됨!
  ```js
  // import Detail from "./pages/Detail";
  // import Cart from "./pages/Cart";

  const Detail = lazy(() => import('./pages/Detail'))
  const Cart = lazy(() => import('./pages/Cart'))
  ``` 
- 단, 해당 컴포넌트 로딩이 지연되어 흰 화면이 뜰 수 있음!
  - `react`의 `<Suspense>` 태그를 활용하여 로딩 페이지를 따로 만들 수 있음!
  ```jsx
  <Suspense fallback={<div>로딩중...</div>}>
    <Routes>
      <Route path="/" element={ <MainPage/> }/>
      <Route path="/cart" element={<Cart/>}/>
      ...
      <Route path="*" element={ <>없는 페이지입니다.</> } />
    </Routes>
  </Suspense>
  ```

### memo()
- 자식 컴포넌트의 재랜더링을 방지할 때 사용하는 방법
- `memo()`를 씌어둔 컴포넌트는 꼭 필요한 경우가 아니라면 리랜더링하지 않음!
  ```jsx
  const Child = memo(function() {
    console.log("재랜더링됨")
    return <div>자식</div>
  })

  function Cart() {
    let [count, setCount] = useState(0)

    return (
      <div>
        <Child></Child>
        <button onClick={() => { setCount(count+1) }}>+</button>
      </div>
  }
  ```
  - `memo()`를 씌우지 않은 경우, 
    - 부모에서 count state 변경 시마다 '재랜더링됨' 로그 띄움
  - `memo()`를 씌운 경우,
    - 부모에서 count state 변경해도 '재랜더링됨' 로그가 안뜸!!

#### memo()의 정확한 원리
- 특정 상황에서만 리랜더링을 해줌
  - **props가 변경될 때에만 리랜더링!!**
    ```jsx
    <Child count={count}></Child>
    ```
  - 이렇게 작성하면 '재랜더링됨' 로그 띄움!!
- 즉, 기존 props와 새로운 props를 비교한 이후에 리랜더링을 함
  - props가 크면 클수록 효율이 떨어짐!!

### useMemo() (? 잘 모르겠음)
- useEffect와 유사
  - useEffect: 랜더링 이후 동작
  - useMemo: 랜더링과 함께 동작
  ```jsx
  function hardWorks() {
    let i = 0
    for(i=0; i < 1e9; i++) continue
    return i
  }

  function Cart() {
    // 처음 실행될 때에만 실행
    let result = useMemo(() => {
      return hardWorks()
    }, [])

    let result2 = useMemo(() => {
      return hardWorks()
    }, [감시할_state])
  }
  ```
  - [https://whales.tistory.com/87](https://whales.tistory.com/87)

### Automatic Batching (React18)
- 여러 개의 state 변경이 동시에 일어날 시, 재랜더링이 딱 한번만 일어남!
- AJAX, setTimeout → 동작에 지연이 발생하는 코드들
  - 이것들도 18 버전부터 Automatic Batching 동작함

### useTransition() (React18)
- 동작이 느린 컴포넌트 성능을 향상시킴!
- 브라우저 → 한번에 하나씩 작업할 수 밖에 없음
  1. 타이핑한 텍스트를 input box에 표시하기
  2. `<div>`를 10,000개 만들기
  ```jsx
  import { useState, useTransition } from "react";

  function Test() {
    let [name, setName] = useState('')
    let arr = new Array(10000).fill(0)
    let [isPending, startTransition] = useTransition()

    return (
      <div>
        <input onChange={(e) => 
          startTransition(() => {
            setName(e.target.value)
          })
        }/>
        { isPending ? "✴️" : "✅" }
        {
          arr.map(() => <div>{name}</div>)
        }
      </div>
    )
  }

  export default Test
  ```
- `startTransition()`
  - 이 안에 있는 코드를 늦게 실행함!
  - 다른 중요한 작업들을 먼저 처리하게 됨!
  - 따라서, 1번 작업을 먼저 수행하고 10,000개를 만들게 됨!
- `isPending`
  - `startTransition()` 처리 중일 때 true!

### useDeferredValue() (React18)
- 변동 사항이 생겼을 시, 지정한 state가 늦게 처리됨!
- useTransition과 동작은 비슷하게 처리됨!
  ```jsx
  import { useDeferredValue, useState } from "react";

  function Test() {
    let [name, setName] = useState('')
    let arr = new Array(10000).fill(0)

    // 변동 사항이 생겼을 시, state가 늦게 처리됨!
    let state = useDeferredValue(name)

    return (
      <div>
        <input onChange={(e) => setName(e.target.value)}/>
        { arr.map(() => <div>{state}</div>) }
      </div>
    )
  }

  export default Test
  ```

<br>

## 07. Progressive Web App

### PWA
- 설치가 가능한, 앱처럼 보이게하는 웹페이지

### PWA 장점
- 앱으로써의 기능을 손쉽게 구현이 가능함
- PWA 기술을 활용하면 센서, 푸시알림 등의 기능도 활용이 가능

### PWA 만들어보기
- 프로젝트 생성 시, 템플릿을 적용해야 함
  ```bash
  $ npx create-react-app 앱이름 --template cra-template-pwa
  ```
- 그게 아니라면 아래 글을 참고
  - [https://kwanghyuk.tistory.com/200](https://kwanghyuk.tistory.com/200)

### PWA 설정하기
- 2개의 파일을 생성해야 함
  1. `./public/manifest.json`: 앱 정보
    - 이름, 플랫폼별 아이콘, start_url(첫 페이지 경로), display(상단바 유무), 각종 색상 등
    - ![PWA Splash Image](https://miro.medium.com/max/1400/1*k07wulFO297SXn7EZ-Xaow.png)
  2. `./src/service-worker.js`
    - `./src/index.js`에서 `serviceWorkerRegistration.unregister()`를 `register()`로 변경
    - 오프라인 동작 가능 및 빠른 로딩을 지원
      - 일반 앱은 리소스가 휴대폰에 설치되어있기 때문에 오프라인 상태여도 구동이 가능함
      - 웹사이트는 오프라인인 경우 에러 메시지만 보임
      - 웹사이트에 필요한 html, css, js 파일을 휴대폰에 미리 다운로드 시켜주는 역할!
      - `./build/asset-manifest.json`에 저장할 파일 목록이 적혀있음!
    - 빌드 시 `service-worker.js`가 생성됨! (minify된 파일)
    - `$ npm run build` 혹은 `$ yarn build`
- 위에 2개의 파일이 존재하면 사이트 접속 시 브라우저가 PWA 사이트로 인식하고
- 알아서 PWA 설치 안내 팝업을 브라우저가 띄움

### PWA 테스트해보기
- 빌드된 사이트가 있는 폴더에서 `live-server` 구동하면 확인 가능!
- 개발자도구 → Application 들어가면 manifest 등 PWA 관련 설정들을 볼 수 있음
  - Cache Storage: 오프라인에서도 동작 가능하도록 저장해둔 파일들!

### PWA Caching 예외 지정하기
- `./node-modules/react-script/config/webpack.config.js`
- `new WorkboxWebpackPlugin.InjectManifest()`에서 `exclude`에 제외할 파일이름 혹은 정규식을 추가

### 설치 안내화면 만들어보기
```markdown
강제로 prompt 띄우는 코드는 다음과 같습니다 
https://web.dev/customize-install/

근데 그래도 안뜰 때도 있어서 HTML로 설치버튼 UI를 만들어주는 것도 좋은 방법입니다 
https://dev.to/woile/simplest-react-hook-component-for-pwa-install-button-2die
버튼 컴포넌트로 설치팝업 띄워주는 방법같습니다. 

그리고 원래 아이폰 아이패드같은 iOS에선 팝업 안뜰걸요
https://github.com/chrisdancee/react-ios-pwa-prompt
커스텀 UI로 팝업띄우는거 라이브러리로 누가 만들어놨네요 설치하면 코드한줄 컷인가봅니다 

Writted by CodingApple
```

<br>

## 08. Node.js와 연동해보기
- 작성중...
