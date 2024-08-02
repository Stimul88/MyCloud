import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const server = process.env.REACT_APP_API_URL;


export const fetchDownload= createAsyncThunk(
  'fetchDownload',
  async (url) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    }
    const response = await axios(`${url}`, config)
    return response.data
  }
)

const download = createSlice({
  name: "download",
  initialState: {
    file: "",
    downloadLoad: false,
    downloadError: '',
  }
  ,
  reducers: {
    // saveFileInfo: (state, action) => {
    //   state.fileInfo =  action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDownload.pending, (state) => {
      state.downloadLoad = true;
      state.downloadError = '';
      state.file = '';
    });
    builder.addCase(
      fetchDownload.fulfilled, (state, action) => {
        console.log(action.payload)
        state.file = action.payload;
      });
    builder.addCase(
      fetchDownload.rejected,(state, action) => {
        state.downloadError = action.payload;
        state.downloadLoad = false;
      });
  }
});


export const { saveFileInfo } = download.actions;
export default download.reducer;