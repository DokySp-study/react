# React Part 2

## 01. 프로젝트 생성 Tip

### Yarn ⭐️

- `npm` 명령어 대신 `yarn`을 사용할 수 있음
- `npm`, `npx`보다 빠른 환경을 제공
- `yarn v1.x.x`가 괜찮음 `22년 1월 기준`

### Bootstrap

- CSS 디자인 라이브러리
- 각종 버튼 및 UI들의 디자인을 미리 만들어둠
  - [https://getbootstrap.com](https://getbootstrap.com)
- CDN 방식 혹은 React 버전의 Bootstrap을 사용
  - [https://react-bootstrap.github.io](https://react-bootstrap.github.io)
  - `$ yarn add react-bootstrap bootstrap`
  - 이후 매뉴얼대로 기타 파일 수정
  - CDN일 경우, 패키지를 직접 파일을 다운받아 사용하는 것이 서비스 시 안정적으로 사용 가능!


### Bootstrap 사용해보기

- Bootstrap Documentation탭, React-Bootstrap Getting Started탭에서 사이트에 에서 필요한 UI 요소를 찾아서 사용 가능
  ```jsx
  {/* Bootstrap */}
  <button type="button" class="btn btn-primary">Primary</button>
  {/* React-Bootstrap */}
  <button variant="primary">Primary</button>
  ```

<br>

## 02. React-Bootstrap 활용하기

### import

- `{}`를 쓰면 전부가 아닌 해당되는 컴포넌트만 로드할 수 있음!
  ```jsx
  import { Button, Navbar, Nav, NavDropdown } from 'react-bootstrap';
  ```

### Bootstrap5 Jumbotron
- 없을 수도 있음
- 이러한 경우, 그냥 직접 만드는 것이 나음

### Customizing
- 태그의 `className`을 설정한 후, `App.css` 파일에 스타일링 적용

### 에셋 파일 추가
- `/src` 혹은 `/public`에 추가 가능
  - `/src`: 패키징 시 영향 받음
  - `/public`: 패키징 시 영향 X → 절대경로로 가져와야 함
    - 절대경로 가져오는 법: `process.env.PUBLIC_URL + "/img/bg.png"`

### Bootstrap 반응형 웹
- `container` → `row` → `col-md-#`
- 이런 식으로 구성하면 아이템 정렬이 모바일에서 세로, PC에서는 가로가 됨

### Bootstrap className Vs. Component
```jsx
<div className="Nav"/>
<Nav/>
```
- 원조(className) 방식 → 용량은 증가됨
- CDN 설치 방식을 적용해야 사용이 가능!

<br>

## 03. Import & Export ⭐️

- JS 코드가 너무 긴 경우, 파일로 분리해서 사용할 수 있도록 할 때 유용

### Export
- 다른 파일로 변수, 함수를 내보낼 때 사용
- `export defalut`
  - 보통 **코드 마지막**에 옴
  - **한번만 사용이 가능!!**
    ```js
    var name = "Asdf";
    export default name;
    ```
- `export {}`
  - 여러 개 있는 경우, 중괄호로 여러 변수를 내보낼 수 있음
  - 이렇게 내보낸 경우, `import` 시 동일한 이름을 사용해야 함!
    ```js
    var name = "Asdf";
    var age = 12;
    export { name, age };

    // 다른 파일
    import { name, age } from './exp.js'
    ```
### Import
- `export`한 변수 또는 함수를 가져다 사용할 때 사용
  ```js
  import 이름 from 경로;
  ```
- 리소스 파일도 가져올 수 있음!
  ```js
  import bgImg from './img/bg.png';
  ```

### 활용예제
  ```jsx
  // App.js
  import React, { useState } from 'react';
  import rawData from './data.js';

  let [data, setData] = useState(rawData);
  ```

  ```js
  // data.js
  export default [
    {
      ...
    },
    {
      ...
    },
    ...
  ];
  ```

### ES Lint 끄기
```js
/* eslint-disable */
```

### Template Literals ⭐️⭐️
- ES6 문법
- 텍스트 안에 변수를 넣을 때 유용하게 사용 가능
- `` `(Backtick) ``을 사용해서 string 묶어주고 `${변수명}`을 사용!
- [참고](https://eblee-repo.tistory.com/38)
  ```js
  let i = 0;
  for (i = 0; i < 10; i++){
    console.log(`Counter: ${i}sec`)
  }
  ```

<br>

## 04. React Router DOM ⭐️⭐️⭐️

### 설치하기
```bash
$ yarn add react-router-dom
```

### BrowserRouter 설정하기
- URL 라우팅을 가능하게 해줌
- 단, 실수로 백엔드 API를 요청할 수 있기 때문에 주의 필요
- `index.js`
  ```jsx
  import { BrowserRouter } from 'react-router-dom';

  // 'root'에 App 컴포넌트를 적용
  ReactDOM.render(
    <React.StrictMode>
      
      {/* 라우터 세팅!! */}
      <BrowserRouter>
        <App/>
      </BrowserRouter>

    </React.StrictMode>,
    document.getElementById('root')
  )
  ```

### HashRouter 설정하기
- URL 맨 뒤에 `/#/`을 추가해줌
- 라우팅을 안전하게 해주는 것
  - 백엔드 API와 간섭이 생기는 것을 방지하기 위한 용도
- `index.js`
  ```jsx
  import { HashRouter } from 'react-router-dom';

  // 'root'에 App 컴포넌트를 적용
  ReactDOM.render(
    <React.StrictMode>
      
      {/* 라우터 세팅!! */}
      <HashRouter>
        <App/>
      </HashRouter>

    </React.StrictMode>,
    document.getElementById('root')
  )
  ```

### 라우팅해보기 (v6)
- 아래와 같이 가정할 때,
  - 메인 페이지: `/`
  - 상세 페이지: `/detail`
  - 요약 페이지: `/about`
  ```jsx
  import { Routes, Route, Link } from 'react-router-dom';
  ...
  <Routes>
    <Route path="/"/>
    <Route path="/detail" element={ <div>상세 페이지</div> }/>
    <Route path="/about" element={ <AboutPage/> }/>
  </Routes>
  ```
- 각각의 url 접속 시, 각각의 엘리먼트들이 화면에 표시됨
- 동일 경로인 경우, 상단에 있는 라우터를 표시
- **페이지별로 컴포넌트화**하면 쉽게 관리할 수 있다
- 라우터 장점
  - 뒤로가기 등 네비게이션 관리 용이 & 속도 빠름
  - 페이지 이동이 쉬움 (필요에따라 원하는 페이지를 보여줄 수 있음)


<details>
<summary>react-router-dom-v5</summary>

### 라우팅해보기 (v5)
- 아래와 같이 가정할 때,
  - 메인 페이지: `/`
  - 상세 페이지: `/detail`
  ```jsx
  import { Router } from 'react-router-dom';

  function App() {
    ...
    return (
      <div>
        ...
        <Router path="/">
          <div>메인 페이지</div>
        </Router>

        <Router path="/detail">
          <div>상세 페이지</div>
        </Router>

        {/* 컴포넌트 하나만 넣는 경우 이렇게 사용 가능 */}
        <Router path="/modal" component={Modal}>
        ...
      </div>
    )
  }
  ```
- 위에 코드 동작 시,
  - 메인 페이지: "메인 페이지" 표시
  - 상세 페이지: "메인 페이지", **"상세 페이지"** 표시
- 위와 같은 문제 해결하기 위해 `exact` 요소 추가!
  - **react-router-dom v6 에서는 사용방법 변함!! (위 항목 참고)**
  ```jsx
  <Router exact path="/">
    <div>메인 페이지</div>
  </Router>

  <Router path="/detail">
    <div>상세 페이지</div>
  </Router>
  ```

</details>

### 라우팅 시 알아둘 점
- 페이지마다 다른 HTML 파일이 아님
- 리엑트가 경로마다 랜더링을 해주는 것! → 속도가 빠른 이유!

### 페이지를 컴포넌트로 만들기 (모듈화)
- 파일로 분리를 한 이후에
- `export default 컴포넌트`로 만들어서
- `import`로 가져와서 사용!
- 단, 리엑트 컴포넌트를 파일로 만들 때 **반드시 `import React from 'react'`할 것!!**
  ```jsx
  // Detail.js
  import React from 'react'

  function Detail() {
    return (
      <>
        ...
      </>
    )
  }

  export default Detail;
  ```
  ```jsx
  // App.js
  import Detail from './Detail.js'
  ...
  <Route path="detail" element={ <Detail/> }/>
  ```
  <details>
  <summary>react-router-dom-v5</summary>

  ```jsx
  // App.js
  import Detail from './Detail.js'
  ...
  <Router path="detail">
    <Detail/>
  </Router>
  ```
  </details>

### Link로 페이지 이동
- `Link` 컴포넌트를 사용해서 작성
  ```jsx
  import { Link } from 'react-router-dom';
  ...
  <div>
    <Link to="/detail">
      Detail
    </Link>
  </div>
  ```

### Navigation (v6)
- `useNavigate` hook을 사용해서 작성
```jsx
import { useNavigate, Outlet } from 'react-router-dom'

function App() {
  let navigate = useNavigate();
  ...
  return (
    ...
    {/* 원하는 경로로 이동시켜줌 */}
    <button onClick={ () => navigate('/이동할경로') }/>
    {/* 뒤로 한 페이지 이동 → 뒤로가기 */}
    <button onClick={ () => navigate(-1) }/>
    {/* 앞으로 한 페이지 이동 */}
    <button onClick={ () => navigate(1) }/>
    ...
  )
}
```

### useHistory() (v5)
<details>
<summary>자세한 내용은 여기에서 확인</summary>

- `useHistory` hook을 사용해서 작성
  ```jsx
  import { Link, useHistory } from 'react-router-dom';
  ...
  function App() {
    // Hook의 일종
    // react-router-dom v5, react v16.3 이상
    // 이동했던 모든 경로를 저장해둔 스택!
    let history = useHistory();
    ...
    return (
      <>
        {/* 뒤로가기 */}
        <CustomButton onClick={ () => {
          history.goBack();
        } }>
          뒤로가기
        </CustomButton>

        {/* 원하는 URL로 이동 */}
        <CustomButton onClick={ () => {
          history.push("/detail");
        } }>
          상세 페이지
        </CustomButton>
        ...
      </>
    )
  }
  ```
</details>

### 404 페이지
- 이상한 경로로 사용자가 접근했을 떄, 별도 처리를 안하면 아무것도 뜨지 않음
- `*` route를 추가하여 모든 경로를 빨아들이는 역할을 만들어 처리
  ```jsx
  <Routes>
    ...
    <Route path="*" element={ <ErrorPage/> }/>
  </Routes>
  ```

### Nested Routes (v6)
- 세부 라우팅을 줄 때 아래와 같이 주어도 동작은 한다.
  ```jsx
  <Routes>
    <Route path="/about" element={ <AboutPage/> }/>
    <Route path="/about/member" element={ <AboutMemPage/> }/>
    <Route path="/about/location" element={ <AboutLocPage/> }/>
  </Routes>
  ```
- 그러나 Nested Routes를 활용하면 아래와 같이 구성이 가능하다.
  ```jsx
  <Routes>
    <Route path="/about" element={ <AboutPage/> } >
      <Route path="member" element={ <AboutMemberSubPage/> }/>
      <Route path="location" element={ <AboutLocationSubPage/> }/>
    </Route>
  </Routes>
  ```
- 장점 1. 코드가 간단해짐
- 장점 2. **자기 자신의 엘리먼트와 부모 엘리먼트를 같이 한 페이지에 표시해줌**
  - 부모 컴포넌트 내에 `<Outlet/>` 컴포넌트에 나의 내용을 표시해줌
    ```jsx
    <Routes>
      <Route path="/about" element={ 
          <>
            어바웃페이지<br/>
            <Outlet/>
          </>}>
        <Route path="member" element={ <>멤버</> }/>
        <Route path="location" element={ <>위치</> }/>
      </Route>
    </Routes>
    ```
    ```text
    /about
    어바웃페이지

    /about/member
    어바웃페이지
    멤버

    /about/location
    어바웃페이지
    위치
    ```
- 언제 사용할까?
  - 여러 유사한 페이지에 내용만 살짝씩 바꿔야 하는 경우!

### React 폴더 구조
- 비슷한 파일끼리 묶어놓는 경우가 많음
- `/routes`, `/pages`, `/components` 등등

### Hook
- 유용한 기능들을 하는 함수
- `useState()`, `useNavigate()`, `userParams()` 등등

### Switch (v5)
<details>
<summary>자세한 내용은 여기에서 확인</summary>

- 아래 코드에서 `<Switch>`를 안쓰면 1번과 2번 모두 표시됨 (둘 다 조건 만족하기 때문)
- `<Switch>`를 사용하면 **조건을 만족하는 최상위 라우터를 보여줌**
  ```jsx
  import { Router, Link, useHistory, Switch } from 'react-router-dom';
  ...
  <Switch>
    {/* 1. detail 경로 */}
    <Router path="/detail">
      <div>...</div>
    </Router>
    
    {/* 2. 아무거나 적었을 떄, id로 파라미터를 받음 */}
    <Router path="/:id">
      <div>...</div>
    </Router>
  </Switch>  
  ```
</details>

### state를 어디에 담아둘 것인가?
- 홈페이지를 구성하는 중요한 정보의 경우, App.js (또는 최상위 컴포넌트)에 두는 것이 좋음!
- 자식에서 상위 컴포넌트로 보내는 것이 어렵기 때문!
- 데이터가 많아지는 경우, **redux를 통해 상태관리를 용이**하게 할 수 있음!

### Path Variable (Params)
- `/detail/0`, `/detail/1`, `/detail/2`
- 이런 식으로 경로를 변수로 받는 방법!
  - `/:변수명`으로 받고, 
  - `userParams()` hook으로 받아올 수 있음!
  ```jsx
  <Router path="/detail/:id">
    <Detail data=shoes[]/>
  </Router>
  ```
  ```jsx
  import { useHistory, useParams } from 'react-router-dom';
  
  let { id } = useParams() // hook
  // url에 path variables(param)을 받음!

  <div>params.data[id].title</div>
  <div>params.data[id].content</div>
  ```
- 파라미터는 여러 개를 사용할 수 있음
  - `/detail/:id/:name/:enable`
  - `let { id, name, enable } = useParams()`

<br>

## 05. Styled Components

### 설치

```sh
$ npm install styled-components
# 또는
$ yarn add styled-components
```

### styled-components란?
- 보통은 아래와 같이 className 지정하고, 이에 맞게 CSS 파일을 수정
  ```jsx
  <button className='btnAdd'>추가하기</button>
  ```
  ```css
  .btnAdd {
    background: yellow;
    color: black;
    padding: 10px;
  }
  ```
- styled-components를 사용하면 JSX에서 바로 해결이 가능!
- 백팁을 뒤에 붙이는 것은 **Tagged Template Literals**문법임
  ```jsx
  import styled from 'styled-components'

  let YellowButton = styled.button`
    background: yellow;
    color: black;
    padding: 10px;
  `
  ...
  <YellowButton>노랑버튼</YellowButton>
  ```

### 장점
1. CSS 파일을 수정하지 않고 JS 내부에서 해결이 가능!
2. 스타일이 다른 JS 파일에 간섭되지 않음!
  - Ex> `App.css` 파일에 적용한 스타일이 `Detail.js`에도 적용됨!
    - `App.module.css` 이런 식으로 파일 이름을 만들면 `App.js`에만 적용됨!
  - 코드를 하나로 빌드하는 과정에서 CSS 파일이 합쳐지기 때문
  - styled-components는 간섭이 되지 않음!
3. 페이지 로딩 시간이 단축됨
  - styled-components는 별도 CSS 파일을 만드는 것이 아니라 해당 컴포넌트를 style 태그에 넣어주게 됨
  - 각 페이지마다 필요한 CSS만 로드하게 됨!

### props 활용하기
- 이 친구도 결국 컴포넌트이기 때문에 props를 받을 수 있음
- 아래와 같이 사용 가능하며, 중괄호 안의 내용은 **Tagged Template Literals**문법에 의해 가변인자로 컴포넌트에 들어가게 됨
  ```jsx
  let CustomButton = styled.button`
    background: ${ props => props.bg };
    color: ${ props => props.bg === 'blue' ? 'white' : 'black' };
    padding: 10px;
  `
  ...
  <CustomButton bg="orange">노랑버튼</CustomButton>
  ```

### styled-components 복사하기
- `styled(복사할_컴포넌트_이름)`를 사용하면 됨
  ```jsx
  let CustomButton = styled.button`
    ...
  `
  let NewCustomButton = styled(CustomButton)``
  ...
  <CustomButton bg="orange">노랑버튼</CustomButton>
  <NewCustomButton bg="blue">파랑버튼</NewCustomButton>
  ```

### 단점
1. JS 파일이 복잡해짐
2. 다른 파일에서 스타일 재사용 시, 결국 CSS와 차이점이 없음
3. 협업 시, 퍼블리셔가 스타일드 컴포넌트 문법을 모를 수 있음 (Tagged Template Literals)

### Tagged Template Literals
- ES6 문법
- 함수(인자1, 가변인자) 가정 시,
- 함수\`내용내용내용 \${변수1} 내용내용 \${변수2}\` → 이렇게 쓰면
- 함수에서 `["내용내용내용 ", " 내용내용 "]`, `[변수1, 변수2]` 이런 식으로 받아옴
- [https://mygumi.tistory.com/395](https://mygumi.tistory.com/395)

<br>

## 06. Lifecycle Hook

### 컴포넌트 생명주기
- mount: 보여지는 순간
- update: 제곧내 (state 업데이트 등, 재랜더링 시)
- unmount: 사라지는 순간

### 그래서 뭐가 중요한데?
- 위의 생명주기 중간중간에 간섭(interrupt)이 가능!
- onCreate(), onDispose()와 비슷
- 갈고리(Hook)를 걸어서 코드를 실행 가능!

### 이전 방식: 메소드 사용
  ```js
  class Detail2 extends React.Component {
    // 아래와 같은 함수로 Lifecycle 중간에 개입이 가능했음
    componentDidMount() {}
    componentDidUpdate() {}
    componentWillUnmount() {}
  }
  ```

### 최신 방식: useEffect()
- 아래와 같이 `useEffect()` hook을 사용하면 됨
- `useEffect(훅_콜백, [디팬던시])`
  ```js
  function Detail(props) {
    let [count, setCount] = useState(1)

    useEffect( () => {
      console.log("useEffect Hook")
    })

    // 1번
    console.log("change state")

    return (
      <button onClick={ () => setCount(count + 1) }>버튼</button>
    )
  }
  ```
- 실제로 Detail 페이지 들어갈 때 두 번 동작되는데
  - 디버깅을 위해 동작하는 것(?)
  - 빌드를 하거나
  - `<React.StrictMode>` 제거하면 한번만 뜸
- state 업데이트 시에도 잘 동작함

### useEffect()를 언제 사용하는 것인가?
- 위의 코드에서 1번도 잘 동작하는데..??
  - `useEffect()`는 html 랜더링 이후에 동작함!
  - 따라서, 랜더링에 지장이 생기는 부분은 useEffect()로 처리하는 것이 좋음!
  ```js
  let result = 0;

  // 1번: 아래 코드가 전부 처리된 이후에 랜더링 됨
  // for (let i = 0; i < 10000; i++){
  //   console.log(result)
  //   result += 1
  // }

  useEffect( () => {
    
    // 2번: 랜더링 된 이후에 아래 코드가 수행됨
    for (let i = 0; i < 10000; i++){
      console.log(result)
      result++
    }

    console.log("useEffect Hook")
  })
  ```
- 그래서 언제 사용하는 것이 좋을까?
  - 오래 걸리는 연산들
  - 서버와 통신하는 부분
  - 타이머
- 즉, 먼저 랜더링하고 이후 연산처리해서 사용자에게 빠르게 반응 할 수 있도록 하는 것이 중요한 작업에 사용!
- 이름이 `useEffect`인 이유?
  - side effect: 핵심 기능과 상관없는 부가기능
  - 여기에서 이름을 따옴!
  - html 랜더링 기능 이외의 기능을 처리!

### setTimeout()
```js
void setTimeout(특정 시간 이후 실행될 함수 콜백, ms)

setTimeout( () => {
  console.log("시간 지남!!")
}, 1000 )
// 1초 뒤에 "시간 지남!!"이 콘솔에 뜬다.
```

### useEffect Dependency
- 특정 변수(state)가 변할 때 훅이 동작되도록 하는 방식!
  ```js
  useEffect( () => {
    setIsAlertVisible(true)
    setTimeout( () => {
      setIsAlertVisible(false)
    },
    2000 )
  }, [count] ) // → 노랑버튼 누를 때(count + 1)마다 동작
  ```
- 디팬던시를 비워두면? → **컴포넌트가 업데이트 될 때 코드 실행이 되지 않음!!**
  ```js
  useEffect( () => {
    setIsAlertVisible(true)
    setTimeout( () => {
      setIsAlertVisible(false)
    },
    2000 )
  }, [] ) // → 최초 마운트 시에만 동작!!
  ```

### useEffect Cleanup Function
- state 변경 시, 업데이트 마무리하고 동작하는 함수
  - **`update`, `unmount`일 때만 실행됨!!**
- useEffect()에서 함수를 반환하는 것을 Cleanup Function이리 함
- Ex> 기존 타이머 제거, ajax 요청 중복 방지 등

  ```js
  useEffect( () => {
    
    setTimeout( () => {
      setIsAlertVisible(false)
    },
    2000 )

    return () => {
      console.log("Cleanup Function")
    }
  }, )
  ```

### useEffect() 정리
- 업데이트 시마다 동작
  ```js
  useEffect(()=>{ })
  ```
- 마운트 시 동작
  ```js
  useEffect(()=>{ }, [])
  ```
- 언마운트 시 동작  
  ```js
  useEffect(()=>{ return ()=>{ } }, [])
  ```

### useEffect 활용해보기
- input 창에 숫자만 입력할 수 있도록 만들어보기
  ```jsx
  let [textbox, setTextbox] = useState("")
  useEffect( () => {
    if( Number.isNaN(Number(textbox)) ){
      alert("숫자만 입력하세요!")
      setTextbox(textbox.substring(0, textbox.length - 1))
    }
  }, [textbox] )
  ...
  <input value={ textbox } onChange={ (event) => { 
    setTextbox(event.target.value) 
  }}/>
  ```

<br>

## 07. AJAX

### 서버? 요청?
- 서버: 데이터 요청 시, 보내주는 프로그램
  - 단, 규격에 맞추어 요청을 해주어야 함!
  - 방법: `GET`, `POST` 등
  - 어떤 데이터: params, query string ...

### AJAX 직접 사용해보기
- 예제 데이터
  - `GET` [https://codingapple1.github.io/shop/data2.json](https://codingapple1.github.io/shop/data2.json)
- GET, POST 등 요청을 하게되면 리프레시가 된다!
  - AJAX를 사용하면 백그라운드로 요청하므로 리프래시를 막을 수 있다!

#### 요청 방법
1. XMLHttpRequest
  - 예전 JS 문법
2. fetch()
  - 요즘 JS 문법
3. axios 패키지 활용

### axios
- AJAX 요청을 추상화시킨 패키지

### axios 설치하기
```sh
$ npm install axios
# 또는
$ yarn add axios
```
```js
import axios from 'axios'
```

### GET method
- `GET` 요청을 간단하게 해줌
  ```js
  axios.get(주소)
    .then( (response) 요청 완료 후 처리 콜백 함수)
    .catch( (reason) 실패 시 실행 콜백)
  ```
  ```jsx
  <button onClick={ () => { 
    axios.get('https://codingapple1.github.io/shop/data2.json').then(
      (res) => {
        // let tmp = []
        // for(let item of shoesData) tmp.push(item)  // Deepcopy
        // for(let item of res.data) tmp.push(item)   // Append
        let tmp = [...shoesData, ...res.data]         // Spread Operator
        setShoesData(tmp)
      }
    ).catch( (reason) => {
      alert(reason)
    } )
  } }>버튼</button>
  ```


### POST method
- `POST` 요청을 간단하게 해줌
  ```js
  axios.post(
    '/url',
    {body1: 1, body2: 2}
  ).then(
    ...
  )
  ```

### 여러 개의 요청을 한번에 진행할 때
- `Promise`를 사용해서 묶을 수 있음!
  ```js
  axios.get('/1')
  axios.get('/2')
  ...
  ```
  ```js
  Promise.all([
    axios.get('/1')
    axios.get('/2')
    ...
  ]).then(
    ...
  )
  ```

### request, response는 항상 문자다!
- 제곧내
- 그런데, Array, Object도 잘 받아지는데..?
  - `{"name": "kim", ...}` → 키값에 "" 처리! → JSON
  - JSON으로 전달하면 axios가 알아서 차리!

### fetch()
- 브라우저 기본 문법
- JSON 파싱을 직접 만들어주어야 함!
  ```js
  fetch('/url').then(
    res => res.json()
  ).then(
    data => { 데이터 처리 }
  )
  ```
