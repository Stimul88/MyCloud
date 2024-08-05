import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const server = process.env.REACT_APP_API_URL;

export const fetchPostFile = createAsyncThunk(
  'fetchPostFile',
  async (data,  { rejectWithValue }) => {

    const { id } = data

    try{
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        },
        withCredentials: true
      }
      const response = await axios.post(`${server}users/${id}/files/`, data, config)
      return response.data
    }
    catch (error) {
      if (error.response.status === 401) {
        return rejectWithValue({ message: error.response.status })
      }
    }
  }
)

const postFile = createSlice({
  name: "postFile",
  initialState: {
    response: '',
    enterStatus: false,
    authLoading: false,
    role: 'user',
  }
  ,
  reducers: {
    getAuthStatus: (state, action) => {
      state.response = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostFile.pending, (state) => {
      state.authLoading = true;
      state.response = '';
    });
    builder.addCase(
      fetchPostFile.fulfilled, (state, action) => {
        console.log(action.payload)

        state.response = action.payload;
        state.authLoading = false;

      });
    builder.addCase(
      fetchPostFile.rejected,(state, action) => {
        state.authLoading = false;
        state.response = '';
        state.authError = action.payload;
      });
  }
});


export const {  } = postFile.actions;
export default postFile.reducer;