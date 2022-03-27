import { createSlice } from "@reduxjs/toolkit";

import { db } from "./db";

export const rosterSlice = createSlice({
  name: 'rosterSlice',
  initialState: { students: [], atnds: [] },
  reducers: {
    setStudents: (state, action) => { state.students = action.payload },
    setAtnds: (state, action) => { state.atnds = action.payload }
  }
})

export const fetchStudents = (cid) => {
  return async (dispatch, getState) => {
    const students = await db.students.where('cid').equals(cid).sortBy('row');
    dispatch(rosterSlice.actions.setStudents(students));
  }
}

export const fetchAtnds = (pid) => {
  return async (dispatch, getState) => {
    const atnds = await db.marks.where('pid_sid').startsWith(`${pid}_`).toArray();
    dispatch(rosterSlice.actions.setAtnds(atnds));
  }
}

export default rosterSlice.reducer
