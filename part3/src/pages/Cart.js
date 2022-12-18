import { Table } from "react-bootstrap"
import { useSelector } from "react-redux"


function Cart() {
  
  // store에 있는 state 가져옴
  // let data = useSelector(
  //   (state) => {
  //     return state
  //   }
  // )
  // console.log(data)

  let { stocks } = useSelector(
    state => state
  )


  return (
    <div>
      
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
            stocks.map(
              (item, i) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.count}</td>
                  <td>-</td>
                  {/* <td><button>변경</button></td> */}
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