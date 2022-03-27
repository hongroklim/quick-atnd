import { createSlice } from "@reduxjs/toolkit";

export const DEFAULT_LOGFILTER = {
  date: '',
  pos: ['1', '2'],
  tblNm: ['pages', 'students', 'marks'],
  type: ['add', 'put', 'delete', 'deleteRange'],
  sid: ''
};

export const LOGFILTER_LISTS =
  Object.keys(DEFAULT_LOGFILTER).filter(k => Array.isArray(DEFAULT_LOGFILTER[k]));

export const SID_KEYS = ['sid', 'pid_sid'];

const _updateList = (state, key, item) => {
  state[key] = state[key].includes(item)
              ? state[key].filter(e => e !== item)
              : state[key].concat([item]);
}

export const logFilterSlice = createSlice({
  name: 'filter',
  initialState: DEFAULT_LOGFILTER,
  reducers: {
    updateList: (state, action) => _updateList(state, action.payload.key, action.payload.value),
    updateValue: (state, action) => { state[action.payload.key] = action.payload.value }
  }
})

export const { updateList, updateValue } = logFilterSlice.actions
export default logFilterSlice.reducer
