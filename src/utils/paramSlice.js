import { createSlice } from "@reduxjs/toolkit";

import { defaultFilter } from "./filterSlice";
import { fetchStudents, fetchAtnds } from "./rosterSlice";

import { db } from "./db";
import { classes } from "./loader";

const DEFAULT_PARAM = { aClass: {}, page: {}, showExport: false };

export const paramSlice = createSlice({
  name: 'paramSlice',
  initialState: DEFAULT_PARAM,
  reducers: {
    loadClass: (state, action) => { state.aClass = action.payload },
    resetClass: (state) => (DEFAULT_PARAM),
    loadPage: (state, action) => { state.page = action.payload },
    toggleShowExport: (state) => { state.showExport = !state.showExport }
  }
})

// Load class then set default filter
export const loadClass = (cid) => {
  return (dispatch, getState) => {
    const aClass = classes[cid];
    dispatch(paramSlice.actions.loadClass(aClass));
    dispatch(defaultFilter(aClass.rooms));
    dispatch(fetchStudents(cid));
  }
}

// Fetch page in async
export const fetchPage = (pid, reloadAtnds=true) => {
  return async (dispatch, getState) => {
    const page = await db.pages.get(parseInt(pid));
    dispatch(paramSlice.actions.loadPage(page));
    if(reloadAtnds)
      dispatch(fetchAtnds(pid));
  }
}

export const { resetClass, toggleShowExport } = paramSlice.actions
export default paramSlice.reducer
