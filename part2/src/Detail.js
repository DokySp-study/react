
// 파일 분리

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'


let CustomButton = styled.button`
  background: ${ props => props.bg };
  color: ${ props => props.bg === 'blue' ? 'white' : 'black' };
  padding: 10px;
`
let NewCustomButton = styled(CustomButton)``

let BlackBox = styled.div`
  background: grey;
  padding: 20px;
`


class Detail2 extends React.Component {
  // 아래와 같은 함수로 Lifecycle 중간에 개입이 가능했음
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
}


function Detail(props) {

    let navigate = useNavigate() // hook
    // 내가 이동했던 모든 기록들이 담긴 오브젝트

    let { id } = useParams() // hook
    // url에 path variables(param)을 받음!

    const data = props.shoesData
    

    // 요런 식으로 해도 되고
    // let target = {}
    // data.map((item, _) => {
    //   if(item.id === Number(id)){
    //     target = item
    //   }
    // })

    // 요런 식으로 하는게 깔끔함!
    const target = data.find((x) => {
      return x.id === Number(id)
    });


    let [isAlertVisible, setIsAlertVisible] = useState(true)
    let [count, setCount] = useState(1)
    console.log("change state")

    // 이게 다 돈 이후에 랜더링이 됨
    let result = 0;
    // for (let i = 0; i < 10000; i++){
    //   console.log(result)
    //   result += 1
    // }

    useEffect( () => {
      
      // for (let i = 0; i < 10000; i++){
      //   console.log(result)
      //   result++
      // }

      // setIsAlertVisible(true)
      let timer = setTimeout( () => {
        setIsAlertVisible(false)
      },
      2000 )

      return () => {
        clearTimeout(timer)
        console.log("Cleanup Function")
      }

      console.log("useEffect Hook")

    // }, [count] ) → 노랑버튼 누를 때마다 동작
    // }, ) → 무한히 동작
    }, ) // → 화면 로드 된 이후로 동작 안함!



    let [textbox, setTextbox] = useState("")
    useEffect( () => {
      
      if( Number.isNaN(Number(textbox)) ){
        alert("숫자만 입력하세요!")
        setTextbox(textbox.substring(0, textbox.length - 1))
      }

    }, [textbox] )


    return (
      <div className="container">
        
        count: {count}<br/>
        result: {result}
        <BlackBox>
          <CustomButton bg="orange" onClick={ () => setCount(count + 1) }>노랑버튼</CustomButton>
          <NewCustomButton bg="blue">파랑버튼</NewCustomButton>
        </BlackBox>
        
        {
          isAlertVisible ?
            <div className='alert alert-warning'>
              2초 이내 구매 시 할인!!
            </div>
            : null
        }

        <div className="row">
          <div className="col-md-6">
            <img 
              src={`https://codingapple1.github.io/shop/shoes${target.id + 1}.jpg`}
              width="100%"
              alt='' />
          </div>

          <input value={ textbox } onChange={ (event) => { 
            setTextbox(event.target.value) 
          }}/>

          <div className="col-md-6 mt-4">
            <h4 className="pt-5">{target.title}</h4>
            <p>상품설명</p>
            <p>120000원</p>
            <button className="btn btn-primary">주문하기</button>
            <br/>
            <button className="btn btn-danger" onClick={ ()=>{
                navigate(-1)
                // navigate('/')
            } }>뒤로가기</button> 
          </div>
        </div>
      </div>
    )
  
  }

  export default Detail
