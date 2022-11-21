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

### Data Binding이 매우 쉬움!
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

