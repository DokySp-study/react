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
- 컴포넌트 간 state 공유
- `redux store.js` 안에 모든 state를 저장해두고 꺼내쓰는 느낌!
- 정말 많이 쓰는 라이브러리

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