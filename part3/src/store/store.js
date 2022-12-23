import { configureStore, createSlice } from "@reduxjs/toolkit";
import person from './personSlice'
import stocks from './stocksSlice'

// 1.
// useState와 비슷한 역할
// 하나의 state를 slice라고 함!
let user = createSlice({
  name: "user",
  initialState: "김길동",
  reducers: {
    setUser(state) {
      return "홍길동 " + state
    }
  }
})

// user.actions -> reducers 안에 내용이 나옴
export let { setUser } = user.actions

export default configureStore(
  {
    reducer: {
      // 2. slice 등록
      //    아래와 같은 형태로 저장됨! (키-값)
      user: user.reducer,
      stocks: stocks.reducer,
      person: person.reducer,
    }
  }
)
