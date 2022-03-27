import { createSlice } from "@reduxjs/toolkit";

import { marks } from "./loader"

const updateList = (state, key, item) => {
  state[key] = state[key].includes(item)
              ? state[key].filter(e => e !== item)
              : state[key].concat([item]);
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    rooms: [],
    marks: [],
    keyword: ''
  },
  reducers: {
    defaultFilter: (state, action) => {
      return {
        rooms: action.payload.map(e => e.rid),
        marks: Object.keys(marks),
        keyword: ''
      };
    },
    updateRoom: (state, action) => updateList(state, 'rooms', action.payload),
    updateMark: (state, action) => updateList(state, 'marks', action.payload),
    setKeyword: (state, action) => { state.keyword = action.payload; }
  }
})

export const { defaultFilter, updateRoom, updateMark, setKeyword } = filterSlice.actions
export default filterSlice.reducer
