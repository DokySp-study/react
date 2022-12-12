
// 파일 분리

import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

function Detail(props) {

    let history = useHistory() // hook
    // 내가 이동했던 모든 기록들이 담긴 오브젝트

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
          </div>
          <div className="col-md-6 mt-4">
            <h4 className="pt-5">{props.shoesData[0].title}</h4>
            <p>상품설명</p>
            <p>120000원</p>
            <button className="btn btn-primary">주문하기</button>
            <br/>
            <button className="btn btn-danger" onClick={ ()=>{
                history.goBack()
                // history.push('/')
            } }>뒤로가기</button> 
          </div>
        </div>
      </div>
    )
  
  }

  export default Detail
