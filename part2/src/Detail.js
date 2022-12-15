
// 파일 분리

import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

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

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img 
              src={`https://codingapple1.github.io/shop/shoes${target.id + 1}.jpg`}
              width="100%"
              alt='' />
          </div>
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
