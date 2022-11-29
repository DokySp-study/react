# React Part 1

## 01. 리엑트 시작하기

### 프로젝트 생성

- 프로젝트 Boilerplate 생성 명령어
```bash
$ npx create-react-app <앱 이름>
```

- 시작
```bash
$ yarn start
# 혹은
$ npm start
```
- 보통 `http://localhost:3000` 으로 호스팅됨

### 프로젝트 구조

- `index.js`에서 `App.js` 내용을 `i ndex.html`로 뿌려줌 
- `public`: static 파일들, 빌드 시 원형으로 남음
- `App.js`, `App.css`: 메인 코드

<br>

## 02. JSX

- 기존의 JS 문법과 살짝 다른 것이 있음.
- `index.js`에 `document.getElementById('root')`를 통해 index.html에 랜더링해줌
- `index.html`에 `<div id="root"></div>` 태그 존재

### JSX 알아보기
```jsx
import React from 'react';
import './App.css'; // css 파일로 스타일링 가능

function App() {
  return (
    // class 대신 className을 써야 함
    // JSX class 문법과 중복
    <div className="App">
      <b>안녕하세요~</b>
    </div>
  );
}

export default App
```
```css
/* 이런 식으로 CSS를 클래스로 접근하여 스타일링 가능! */
.App {
  background: white;
  ...
}
```



### Data Binding이 매우 쉬움! ⭐️⭐️⭐️
- 받아온 데이터를 UI와 연결시키는 과정이 용이함!
- `getElementById().innerHtml()` 이런 식으로 직접 바인딩할 필요가 없음!
- 아래와 같이 변수를 직접 할당 가능함
```jsx
function App() {

  let title = "제목!!";
  function printTitle() {
    return "제목입니당";
  }
  let imgSrc = "./~~~~/~~~~.png"

  return (
    <div className="App">
      <div className="Header">
        
        {/* 중괄호로 변수 혹은 함수 랜더링이 가능!! */}
        <h2>{ title }</h2>
        <h2>{ printTitle() }</h2>
        
        {/* 속성(className, height, href 등등) 에도 작성 가능!! */}
        <img src={ imgSrc } >

      </div>
    </div>
  );
}
```

### JSX에 style 속성 집어넣을 때
```jsx

let customStyle = {color: 'blue', fontSize: '30px'}

return (
  <div className="App">

    {/* 이런 식으로 obj 형태로 만들어서 넣어야 함! */}
    <div className="Header1" style={ {color: 'blue', fontSize: '30px'} }>
      asdf
    </div>

    {/* 이것도 가능!! */}
    <div className="Header2" style={ customStyle }>
      asdf
    </div>

  </div>
)
```

<br>

## 03. state

### state란? ⭐️⭐️⭐️
- 변수처럼 데이터를 저장하는 방법
- 어떠한 것이든 변수처럼 state안에 저장할 수 있다!
  - "남자 코트 맛집", 숫자, 함수 ...
- 단, 일반 변수와 다른 강점은 **state를 가지고 있고,** 이것이 변경될 때 **React에서 내부적으로 리랜더링 해주는 기준**이 된다!!
  - 리랜더링이 아닌 ***새로고침***이 될 경우, 홈페에지가 깜빡거리면서 **완전히 다시 그리는 과정이 발생**함!
  - ex> 글 수정, 내용 정렬 등
- `useState`는 아래와 같이 2가지 항목이 리턴된다.
  - state 값
  - state 값을 **변경할 수 있는 함수**

```jsx
// 내장함수 임포트
import React, { useState } from 'react';

function App() {

  // 새로운 state를 생성하기!
  let [title, changeTitle] = useState("남자 코트 맛집");
  // [ state data, state modify func. ]
  // ES6 문법; Destructuring

  return (
    <div className="App">

      <div className="list">
        <h3> { title } </h3>
        <p>2월 17일 발행</p>
        <hr/>
      </div>

    </div>
  );
}
```

### Destructuring
- ES6 문법
- 배열로 반환되는 함수 리턴 값을 배열로 받을 수 있도록 함
- **여러 개의 값을 리턴 가능!!**

<br>

## 04. event

### Event Listener
- 사용자와의 이벤트(클릭, 창 크기 조절 등) 발생 시 동작되는 옵저버
- `onClick = { 함수 주소값 }`
  - ES6 문법; Arrow Function 사용해도 됨

```jsx
let [title, changeTitle] = useState(["111", "111", "111"])
let [likes, changeLikes] = useState(0)

return (
  <div className="App">

    <div className="list">
      {/* 이런 식으로 onClick 안에 넣으면 됨 */}
      {/* 단, 무조건 함수의 주소값 형태 만을 넣어야 한다!! (실행 구문 X) */}
      <h3> { title[0] } <span onClick={ () => { changeLikes(likes + 1) } } >👍</span> { likes } </h3>
      <p>2월 17일 발행</p>
      <hr/>
    </div>

  </div>
);
```

### state 변경 ⭐️⭐️
- onClick = { likes = likes + 1 }
  - 이렇게 쓰면 아무 일도 일어나지 않는다! → **리랜더링이 되지 않기 때문!!**
- 따라서 `changeLikes(변경할 값)`를 사용해야 한다!

```jsx
<div className="list">
  <h3> { title[0] } <span onClick={ () => { changeLikes(likes + 1) } } >👍</span> { likes } </h3>
  <p>2월 17일 발행</p>
  <hr/>
</div>
```

### Arrow Function
- ES6 문법
- `() => {}`
- `()`안에 파라미터, `{}`안에 실행할 코드 삽입
- `this`의 scope가 기존 함수와 다름..?
  - 화살표 함수에는 this가 없다!! → 따라서 상위 this로 바인딩된다!
  - TODO: 좀 더 조사해보기 [https://velog.io/@padoling/JavaScript-화살표-함수와-this-바인딩](https://velog.io/@padoling/JavaScript-화살표-함수와-this-바인딩)
  - 익명함수, 화살표함수, 클로저, IIFE 등...

### IIFE
- 중괄호 안에는 즉시 실행가능한 표현만 가능하다 (**IIFE** - Immediately Invoked Function Expressions)
- 중괄호 안에 일반적인 함수처럼 사용하는 것은 불가능!!
  - ```jsx
    {/*❌*/} ⭐️
    <div className="header">HEAD</div>
    { () => {console.log("실행실행")} }
    ```
  - ```jsx
    {/*⭕️*/}
    <div className="header">HEAD</div>
    { (() => {console.log("실행실행")})() }
    ```
- 참고: [https://m.blog.naver.com/dudghsy/221483589372](https://m.blog.naver.com/dudghsy/221483589372)
  - TODO: 좀 더 조사해보기

### Lint
- 코딩 습관을 보정해주는 보조도구
- Mandatory하지는 않다. 다만, 코드 유지보수 및 협업 측면에서 사용하면 좋다!

<br>

## 05. setState

### Array 혹은 Object의 state 정보 업데이트
- 배열의 정보를 업데이트할 때, **기존 데이터와 동일한 타입으로 변경해주어야 의도대로 코딩이 가능하다!**
- **원본 state를 변경하면 안됨!!**
  - 리랜더링이 되지 않을 수도 있음!! (래퍼런스가 꼬이는 문제인듯?)
  - Deep copy를 해서 변경해서 사용하는 것을 권장

```jsx
let [title, setTitle] = useState(["111", "111", "111"])
let [likes, setLikes] = useState([0, 0, 0])

function addLikesByIdx(idx){
  // ⚠️
  // likes[idx] += 1

  // Deepcopy ⭐️⭐️⭐️
  // 1) 이런 식으로도 가능
  // var newArr = []
  // for (var i of likes){
  //   newArr.push(i)
  // }

  // 2) Spread Operator
  var newArr = [...likes]
  newArr[idx] += 1

  setLikes(newArr)
}

return (
  <div className="App">

    <div className="list">
      <h3> { title[0] } <span onClick={ () => { addLikesByIdx(0) } } >👍</span> { likes } </h3>
      <p>2월 17일 발행</p>
      <hr/>
    </div>

  </div>
);
```

### Spread Operator
- ES6 문법
- `[...<해체할 배열>]`
- 배열 안에 값들이 해체되는 것과 같은 효과가 발생!

<br>

---

<br>

## 06. Component

### 컴포넌트란?
- JSX 뭉치로 생각하면 됨
- `App()`도 컴포넌트의 일종
- 컴포넌트의 반환값에는 반드시 하나의 태그만 있어야 함!!
  - `Fragment` 태그(`<>``</>`)를 사용해서 처리해도 됨.

```jsx
function App() {
  return (
    <div className="App">

      <div className="list">
        <h3> { title[0] } <span onClick={ () => { addLikesByIdx(0) } } >👍</span> { likes } </h3>
        <p>2월 17일 발행</p>
        <hr/>
      </div>
      
      {/* 이런 식으로 컴포넌트를 활용! */}
      <Modal/>

    </div>
  );
}

{/* App()과 동일하게 컴포넌트 만들면 됨 */}
function Modal() {
  <>
    <div>만든 사람: OOO</div>
    <div>최근 업데이트: OOOO</div>
  </>
}
```

### 어떤 경우에 컴포넌트를 만드는 것이 좋을까?
- 반복적으로 사용되는 (→재사용 시 이점이 큰) UI (ex> 버튼, 로그인 창 등)
- 자주 변경되는 UI → 리랜더링 시 랜더링 범위를 줄여 효율이 좋아짐
- 페이지 단위로 분리할 때
- Dart와 비슷한 느낌으로 봐도 됨!

### 컴포넌트 파편화 시 단점
- `state`를 부모에서 자식으로 내릴 때, props를 사용하는데 이때문에 번거로워질 수 있음.
- 추후 `Redux` 같은 것으로 해결 가능하긴 함

<br>

## 07. 특정 조건에 따른 UI 리랜더링

### 특정 조건에서만 컴포넌트 / 특정 태그 띄우기
- 04장에서 언급했듯이, JSX에서는 IIFE만 활용이 가능!!
- 따라서 `if-else`문을 활용할 수 없다!
- 대신 `삼항연산자`(`<조건식> ? <True> : <False>`)를 사용하면 가능!

```jsx
let [isOnClick, setIsOnClick] = useState(false)

function addLikesByIdx(idx){
  var newArr = [...likes]
  newArr[idx] += 1
  setLikes(newArr)
  setIsOnClick(true)
}

return (
  <div className="App">

    <div className="list">
      <h3> { title[0] } <span onClick={ () => { addLikesByIdx(0) } } >👍</span> { likes } </h3>
      <p>2월 17일 발행</p>
      <hr/>
    </div>
    
    {/* 태그로 JS 표현식 느낌 */}
    {/* 이런 식으로 작성 가능! */}
    (isOnClick === true)
    ? <Modal/>
    : null
    {/* null을 쓰면 아무것도 표시하지 않는다는 것을 의미! */}

  </div>
);
```

<br>

## 08. UI에서의 반복문


