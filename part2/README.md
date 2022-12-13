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
  - `/public`: 패키징 시 영향 X → 절대경로로 가져와야 함 (귀찮...)

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

### 라우팅해보기
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
  ```jsx
  <Router exact path="/">
    <div>메인 페이지</div>
  </Router>

  <Router path="/detail">
    <div>상세 페이지</div>
  </Router>
  ```

### 라우팅 시 알아둘 점
- 페이지마다 다른 HTML 파일이 아님
- 리엑트가 경로마다 랜더링을 해주는 것! → 속도가 빠른 이유!

___

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
  <Router path="detail">
    <Detail/>
  </Router>
  ```

### Link로 페이지 이동
- `Link` 컴포넌트를 사용해서 작성
  ```jsx
  import { Router, Link } from 'react-router-dom';
  ...
  <div>
    <Link to="/detail">
      Detail
    </Link>
  </div>
  ```

### useHistory()
- `Link` 컴포넌트를 사용해서 작성
  ```jsx
  import { Router, Link, useHistory } from 'react-router-dom';
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

### Switch
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
