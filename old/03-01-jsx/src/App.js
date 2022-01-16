import { Fragment } from 'react';
import './App.css';

function App() {

  let testVar = "test variable"
  let testFlag = 2
  // cf. var        -> 함수 단위 scope
  //     let, const -> 블록 단위 scope

  return (
    // 1. JSX로 리턴되는 태그는 반드시 하나로 묶여있어야 함
    // 2. JSX 태그는 반드시 열림과 닫힘이 있어야 함.
    // 3. div 태그가 쓰기 애매하면 Fragment 태그를 사용해도 됨.
    // 4. String interpolation -> 중괄호 사용
    //  4-1. 중괄호 안에 변수명 이외에 JS 코드를 집어넣어도 됨.
    <Fragment>

      Hello world! : {testVar}
      
      <hr></hr>
      <Fragment>
        1+1 == 2 ? <div>111</div> : <div>222</div>
      </Fragment>

      <hr></hr>
      <Fragment>
        {
          1+1 == 2 ? <div>111</div> : <div>222</div>
        }
      </Fragment>
      
      {/* 4-2. 중괄호 안에는 즉시 실행가능한 표현만 가능하다. (IIFE)          */}
      {/*      참고: https://m.blog.naver.com/dudghsy/221483589372   */}
      <hr></hr>
      <Fragment>
        {
          (() => {
            if (testFlag == 2) return <div>1111</div>
            else return <div>2222</div>
          })()
        }
      </Fragment>

    </Fragment>
  );
}

export default App;
