import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    {/*
     - 안전하지 않은 생명주기를 사용하는 컴포넌트 발견
     - 레거시 문자열 ref 사용에 대한 경고
     - 권장되지 않는 findDOMNode 사용에 대한 경고
     - 예상치 못한 부작용 검사
     - 레거시 context API 검사
     * 개발 모드에서만 영향을 미침
     출처: https://zereight.tistory.com/587 [Zereight's Blog]
    */}

    {/* HashRouter -> url 뒤에 #가 붙음 -> 라우팅 안전(API 요청과 구분하기 위해)하게 함 / #은 서버로 요청가지 않음!! */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  // 루트로 라우팅
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
