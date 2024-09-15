import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {getTags} from '../api/questionAnswer';

export const fetchTypes = createAsyncThunk(
  'type/fetchTypes',
  async () => {
    const response = await getTags()
    return response.data
  },
)


export const typeSlice = createSlice({
  name: "type",
  initialState: {
    total:0,
    list:[],
    tagMap:{}
  },
  reducers: {
    // upDateTypes: (state, { payload }) => {
    //   state.total = payload.count;
    //   state.list = payload.rows;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTypes.fulfilled, (state, action) => {
      state.total = action.payload.count;
      state.list = action.payload.rows;
      state.tagMap = {}
      state.list.forEach(item => {
        state.tagMap[item.name] = item.id;
      })
    })
  }
});


export default typeSlice.reducer;
