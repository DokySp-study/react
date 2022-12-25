import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { addAge } from "../store/personSlice"
import { addCount } from "../store/stocksSlice"
import { memo, useMemo, useState } from "react"



const Child = memo(function() {
  console.log("재랜더링됨")
  return <div>자식</div>
})

function hardWorks() {
  let i = 0
  for(i=0; i < 1e9; i++) continue
  return i
}

function Cart() {

  // 처음 실행될 때에만 실행
  // useEffect와 유사
  let result = useMemo(() => {
    return hardWorks()
  },[])
  
  // store에 있는 state 가져옴
  // let data = useSelector(
  //   (state) => {
  //     return state
  //   }
  // )
  // console.log(data)

  let state = useSelector(state => state)

  // store.js에 요청 보내주는 것!
  let dispatch = useDispatch()

  let [count, setCount] = useState(0)

  return (
    <div>

      <Child count={count}></Child>
      <button onClick={() => { setCount(count+1) }}>+</button>

      <h6>{ state.user }의 장바구니</h6>
      <h6>{state.person.name} / {state.person.age}</h6>
      <button onClick={() => dispatch(addAge())}>버튼</button>
      <button onClick={() => dispatch(addAge(1))}>버튼1</button>
      <button onClick={() => dispatch(addAge(10))}>버튼10</button>

      <br/>
      <br/>

      <div>
        총 장바구니 항목: {state.stocks.length}
      </div>
      
      
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {
            state.stocks.map(
              (item, i) => (
                <tr key={i}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.count}</td>
                  <td>
                    <button
                      onClick={() => {
                        // dispatch(setUser())
                        // dispatch(setPerson())
                        // setUser() // 이거만쓰면 동작 안함
                        // dispatch -> 메시지를 보내라 / store.js에 setUser() 실행해달라고 요청한 것
                        // 컴포넌트 개수가 무지막지하게 늘어났을 경우,
                        // -> 여러 컴포넌트가 직접 store 수정하면 mutex lock이 안됨!!
                        // -> 요청 함수(dispatch)를 통해 요청하면?
                        //    - 변경은 무조건 변경 함수(setUser)에서만 일어나므로 이거만 조사하면 됨!
                        dispatch(addCount(item.id))
                      }}>
                      +
                    </button>
                  </td>
                </tr>
              )
            )
          }

        </tbody>
      </Table>

    </div>
  )
}


export default Cart