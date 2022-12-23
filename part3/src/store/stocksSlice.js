import { createSlice } from "@reduxjs/toolkit";

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
  ],
  reducers: {
    addCount(state, action) {
      const cartId = action.payload
      // for(let i=0; i<state.length; i++){
      //   if(state[i].id === cartId){
      //     state[i].count++
      //     break
      //   }
      // }
      
      let idx = state.findIndex(
        (item) => {
          return item.id === cartId
        }
      )
      state[idx].count++
    },

    addCart(state, action) {
      state.push(action.payload)
    }
  }
})

export let { addCount, addCart } = stocks.actions
export default stocks