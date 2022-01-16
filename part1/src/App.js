
import './App.css';
import {useState} from 'react'


// linter 끄기 
/* eslint-disable */

// 부모 컴포넌트
function App() {

  // ES6 문법 -> Destructuring
  let [title, setTitle] = useState(["강남 우동맛집", "하남 맛집", "북한강 맛집", "남한강 맛집"])
  const [likes, setLikes] = useState([0,0,0,0])

  // set~~ 로 변경해야 재랜더링이 일어남!
  // flutter setState와 비슷한 역할
  //  -> Flutter의 경우, 변수값 바꾸고 setState하면 자동으로 Data binding이 일어나는 것 같음.
  


  function changeTitle(){
    // state 데이터를 직접 변경하는 것은 권장사항이 아님
    let newArr = [...title] // Deep copy를 해서 변경해서 사용하는 것을 권장
    // newArr[0] = "하남 우동맛집"

    for(let i = 0; i < title.length; i++){
      newArr[i] = title[title.length-1-i]
    }
    setTitle(newArr)
  }

  let [isVisible, setIsVisible] = useState(false)

  let [clickIdx, setClickIdx] = useState(-1)

  const [inputValue, setInputValue] = useState("")



  // ## Array map 메소드

  // let testArr = [1,2,3]

  // testArr = testArr.map( (a) => {
  //   return a * 2
  // } )

  // console.log(testArr)

  // // => a를 꺼내서 return 된 값으로 바꿔줌!

  function listPrint() {

    let tmpArr = []
    for(var i = 0; i < 3; i++) tmpArr.push(<div key={i}>hello</div>)
    return tmpArr

  }

  function addLikes(idx){
    let tmpLikeArr = [...likes]
    tmpLikeArr[idx] += 1
    setLikes(tmpLikeArr)
  }

  

  
  


  
  return (
    <div className="App">
      <div className="topbar">
        홈페이지
      </div>

      <button onClick={ changeTitle }>정렬</button>

      
      {/* <div className="list">
        {
          // 무조건 함수만 onClick 안에 집어넣어주면 된다. 
        }
        <h3>{ title[0] } <span onClick={ () => { setLikes([likes[0]+1]); } }>👍</span> {likes[0]} </h3>
        <p>21년 2월 17일
          <hr/>
        </p>
      </div> */}



      {
        // for 반복문 -> 즉시실행함수 X / 못집어넣음
        // map 함수를 사용
        // 반복되는 각 항목에 대해 key attr.를 넣어주어야 warning이 안뜸
        title.map( (item, idx) => {
          return (
            <div className="list" key={idx}>
              {/* 무조건 함수만 onClick 안에 집어넣어주면 된다. */}
              <h3>
                <span onClick={ ()=>{ setClickIdx(idx); setIsVisible(true); } }>{ item }</span>
                &nbsp;
                <span onClick={ () => { addLikes(idx); } }>👍</span> {likes[idx]} </h3>
              <p>21년 2월 17일
              </p>
              <hr/>
            </div>
          )
        })

      }



      <br/>
      { listPrint() }
      <br/>



      {/* input data 다루어보기 */}
      {/* <input onChange={ (event)=>{ setInputValue(event.target.value); } } />
      <br/>
      {inputValue} */}

      <div className='publish'>
        <input onChange={ (e)=>{ setInputValue(e.target.value) } } />
        <button onClick={ ()=>{ 
          // ES6, Spread Operator
          let tmpTitle = [inputValue, ...title]
          let tmpLikes = [0, ...likes]

          // tmpTitle.unshift(값) -> 앞에다가 값 추가

          // ajax로 비동기처리해서 서버와 통신하는 코드가 여기에 들어가면 
          // practical하게 쓸 수 있음

          setTitle(tmpTitle)
          setLikes(tmpLikes)

         } } >저장</button>
      </div>
      

      <button onClick={ ()=>{ setIsVisible(!isVisible) } }>모달창</button>

      

      
      { isVisible ? <Modal title={title[clickIdx]} /> : null /* 관습 -> 텅 빈 html 의미 */ }
      
      {/* 
        아래와 같이 바로 쓰면, 즉시실행함수가 아니기 때문에 에러남.
        {
          if(isVisible) {
            <Modal />
          }
        }
      */}



      {/* <Modal></Modal> */}
      {/* 
        컴포넌트
        html 그냥 다 적는게 아니라 컴포넌트를 만들어서 추가
        1. 컴포넌트 이름을 대문자로 설정하기
        2. return 안에 태그는 똑같이 하나만 넣을 수 있음!
        
        장점
         - 관리가 편해짐 (컴포넌트 중접도 가능)

        컴포넌트 만드는 기준
        1. 반복되는 부분을 컴포넌트로 만들면 좋음.
        2. 자주 변경되는(재랜더링되는) 부분을 컴포넌트로 만들면 성능적으로 좋음.
        3. 페이지를 컴포넌트로 구성하는 것이 좋음

        단점
         - Component간 state를 가져다쓰기 복잡해짐 (하위 컴포넌트로 내릴 때, props를 사용)
        
      */}



      <Profile/>



    </div>
  );
}

// 자식 컴포넌트
// html tag attr.이 모두 props 안에 오브젝트 형태로 받아옴!
function Modal(props){

  console.log(props)

  return (
    // <></> => Fragment 문법
    <> 
      <div className='modal'>
          <h2>{props.title}</h2>
          <p>날짜</p>
          <p>상세내용</p>
      </div>
    </>
    
  )
}

export default App;





// 구버전 React
//
import React from 'react';

class Profile extends React.Component {
  
  constructor(){
    super()
    // state 만들기
    this.state = {
      title : ["서울", "경기"],
      like : [10, 23]
    }
  }

  changeLikes(){
    this.setState({like:[20, 43]})
  }

  changeLikes2 = () => {
    this.setState({like:[20, 43]})
  }

  render(){
    return (
      <div>
        새로운 컴포넌트
        {/* state를 쓸 때 this.state 를 앞에 붙여야한다. */}
        <h3>여기는 {this.state.title[0]}입니다.</h3>
        <h3> 👍 {this.state.like[0]}</h3>

        <button onClick={ ()=>{ this.setState({title:["서울시", "경기도"]}) } }>지역 변경</button>
        <button onClick={ this.changeLikes.bind(this) } >좋아요 변경</button>
        <button onClick={ this.changeLikes2 } >좋아요 변경2</button>
        {/* this 바인딩 */}
        {/* 하기 싫으면 arrow function -> 상위 this를 그대로 사용함 */}
      </div>
    )
  }

  // state를 set해도 key별로 데이터를 관리하기 때문에 다른 키에는 영향을 주지 않음 (내름 장잠)
  // 다만, 그 이외에는 구 버전은 사용하기에 복잡함
  // 대부분 함수 형태로 짜는 것을 권장

}