
import React, { useContext, useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

import { Context1 } from '../App.js'
import { addCart } from '../store/stocksSlice.js'
import { useDispatch } from 'react-redux'



function Detail(props) {

    let navigate = useNavigate()
    let { id } = useParams()

    const data = props.shoesData
    const target = data.find((x) => {
      return x.id === Number(id)
    });

    let [isAlertVisible, setIsAlertVisible] = useState(true)

    // 탭 상태 저장
    let [tabIdx, setTabIdx] = useState(0)

    // 페이드 효과
    let [pageFade, setPageFade] = useState('aniFO')
    let [alertFade, setAlertFade] = useState('aniFI')

    // 페이지 서서히 보이게 애니메이션
    useEffect(() => {
      setTimeout( () => setPageFade('aniFI'), 500 )
    }, [])

    // 페이지 애니메이션 관리
    useEffect( () => {
      setTimeout( () => {
        setAlertFade('aniFO')
        setTimeout( () => { setIsAlertVisible(false) }, 500 )
      },
      2000 )

      return () => {
        setAlertFade('')
      }
    }, [])

    // Local Storage 추가
    useEffect(() => {
      const lockey = 'watched'
      let watched = localStorage.getItem(lockey)
      watched = JSON.parse(watched)
      
      // 맨 앞부터 가장 최근에 본 항목으로 업데이트
      watched.unshift(target.id);
      
      // 중복제거
      watched = new Set(watched)
      watched = Array.from(watched)

      localStorage.setItem(lockey, JSON.stringify(watched))
    }, [])

    // store.js에 요청 보내주는 것!
    let dispatch = useDispatch()

    return (
      <div className={`${pageFade}`}>
        <div className="container">
          
          {
            isAlertVisible ?
              <div className={`alert alert-warning ${alertFade}`}>
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

            <div className="col-md-6 mt-4">
              <h4 className="pt-5">{target.title}</h4>
              <p>상품설명</p>
              <p>120000원</p>
              <button className="btn btn-primary" onClick={
                () => {
                  dispatch(
                    addCart({
                      id,
                      name: target.title,
                      count: 0,
                    })
                  )
                }
              }>주문하기</button>
              <br/>
              <button className="btn btn-danger" onClick={ ()=>{
                  navigate(-1)
              } }>뒤로가기</button> 
            </div>
          </div>



          {/* 탭 UI */}
          {/* defaultActiveKey: 처음 눌려있는 버튼의 eventKey */}
          <Nav variant='tabs' defaultActiveKey="link0">
            {/* 버튼 하나 */}
            <Nav.Item>
              {/* eventKey: 구분자 */}
              <Nav.Link eventKey="link0" onClick={ ()=>setTabIdx(0) }>버튼0</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link1" onClick={ ()=>setTabIdx(1) }>버튼1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link2" onClick={ ()=>setTabIdx(2) }>버튼2</Nav.Link>
            </Nav.Item>
          </Nav>

          {/* {
            (() => {
              switch(tabIdx){
                case 0: return (<div>내용0</div>);
                case 1: return (<div>내용1</div>);
                case 2: return (<div>내용2</div>);
                default: return (null)
              }
            })()
          } */}
          {/* 아래처럼 컴포넌트로 짤 수도 있음! */}
          {/* 컴포넌트 상태값이나 유지보수 생각하면 아래가 나은듯 */}

          <TabContent tabIdx={tabIdx}/>

        </div>
      </div>
    )
  }

  function TabContent({tabIdx}) {

    // // 바구니 해체
    // let contextData = useContext(Context1)
    // let { shoesData, stock } = useContext(Context1)
    // // 값 사용
    // console.log(contextData)
    // console.log(shoesData)
    // console.log(stock)

    // 탭 애니메이션
    let [fade, setFade] = useState('')

    useEffect(
      () => {
        // react18 Automatic batching
        setTimeout(() => {
          setFade('aniDispose')
        }, 100);
        return () => {
          setFade('')
        }
      },
      [tabIdx]
    )

    return (
      <div className={`aniStart ${fade}`}>
        { 
          [
            <div>내용0</div>,
            <div>내용1</div>,
            <div>내용2</div>,
          ][tabIdx]
        }
      </div>
    )
  }

  export default Detail
