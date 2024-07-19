import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const server = process.env.REACT_APP_API_URL;
const token = localStorage.token




export const fetchPostFile = createAsyncThunk(
  'fetchPostFile',
  async (id, data) => {
    // let formData = new FormData();
    // formData.append('myFile', data);
    // formData.append('otherParam', 'myValue')
    const response = await axios.post(`${server}users/${id}/files/`, data,
      {
        headers: {
          // 'Content-Type': data.type,
          'Content-Type': "application/json",
          charset: 'utf-8',
          Accept: 'application/json',
          Authorization: `Token 448b7fb9bd3044ef4772f97421f544ce86627287`
        },
      })

    console.log(response)
    return response.data
  }
)

const postFile = createSlice({
  name: "postFile",
  initialState: {
    status: "",
    enterStatus: false,
    authLoading: false,
    role: 'user',
    authError: "",
  }
  ,
  reducers: {
    getAuthStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostFile.pending, (state) => {
      state.authLoading = true;
    });
    builder.addCase(
      fetchPostFile.fulfilled, (state, action) => {
        state.status = action.payload;
        state.authLoading = false;
      });
    builder.addCase(
      fetchPostFile.rejected,(state, action) => {
        state.authLoading = false;
        state.authError = action.payload;
      });
  }
});


export const { getAuthStatus } = postFile.actions;
export default postFile.reducer;