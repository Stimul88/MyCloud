import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const server = process.env.REACT_APP_API_URL;
// const token = localStorage.token


export const fetchPutFile = createAsyncThunk(
  'fetchPutFile',
  async (data,  { rejectWithValue }) => {

    const { id, dataInfo } = data

    // const newObj =


    try{
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        },
        withCredentials: true
      }
      const response = await axios.patch(`${server}change/${id}/`, dataInfo, config)
      return response.data
    }
    catch (error) {
      if (error.response.status === 401) {
        return rejectWithValue({ message: error.response.status })
      }
    }
  }
)


const reloadFile = createSlice({
  name: "reloadFile",
  initialState: {
    reloadStatus: false,
    reloadResponse: null,
    enterStatus: false,
    authLoading: false,
    role: 'user',
    // authError: "",
  }
  ,
  reducers: {
    getReloadStatus: (state, action) => {
      state.reloadStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPutFile.pending, (state) => {
      state.authLoading = true;
      state.reloadResponse = null;
      // state.authError = '';
    });
    builder.addCase(
      fetchPutFile.fulfilled, (state, action) => {
        state.reloadResponse = action.payload;
        state.authLoading = false;

      });
    builder.addCase(
      fetchPutFile.rejected,(state, action) => {
        state.authLoading = false;
        state.reloadResponse = null;
        state.authError = action.payload;
      });
  }
});


export const { getReloadStatus } = reloadFile.actions;
export default reloadFile.reducer;