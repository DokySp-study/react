import { configureStore, createSlice } from "@reduxjs/toolkit";

// 1.
// useState와 비슷한 역할
// 하나의 state를 slice라고 함!
let user = createSlice({
  name: "user",
  initialState: "김길동"
})

let stocks = createSlice({
  // 여기 이름은 뭐지..?
  name: "stock",
  initialState: [
    {
      id: 0,
      name: "White and Black", 
      count: 2,
    },
    {
      id: 2,
      name: "Grey Yordan", 
      count: 1,
    },
  ]
})

export default configureStore(
  {
    reducer: {
      // 2. slice 등록
      //    아래와 같은 형태로 저장됨! (키-값)
      user: user.reducer,
      stocks: stocks.reducer,
    }
  }
)
