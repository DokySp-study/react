import { createSlice } from "@reduxjs/toolkit";

const person = createSlice({
  name: "person",
  initialState: { name: "김길동", age: 20 },
  reducers: {
    // 여기있는 모든 함수들을 엑션이라고 함!!
    setPerson(state) {
      // 이렇게 해도 되고
      // return { name: "홍길동", age: 20 }  
      
      // 이렇게 직접 수정해도 변경됨!!
      state.name = "홍길동"
      // state.age += 1
    },
    addAge(state, action) {
      state.age += action.payload // payload: 화물/소포
    }
  }
})

export let { setPerson, addAge } = person.actions

export default person