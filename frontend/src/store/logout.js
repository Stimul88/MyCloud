import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const server = process.env.REACT_APP_API_URL;


export const fetchLogout = createAsyncThunk(
  'fetchLogout',
  async () => {
    try{
      const config = {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      };
      await axios.post(`${server}logout/`, {
        refresh_token: localStorage.getItem('refresh_token')
      }, config)
      axios.defaults.headers.common['Authorization'] = null;
    }catch(e){
      console.log('logout not work',e)
    }
  }
)

const logout = createSlice({
  name: "auth",
  initialState: {
    loginStatus: "",
    info: {},
    saveLogin: "",
    loginLoad: false,
    role: 'user',
    loginError: "",
  }
  ,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogout.pending, (state) => {
      state.loginLoad = true;
      state.loginError = '';
      state.info = {};
    });
    builder.addCase(
      fetchLogout.fulfilled, (state, action) => {
        state.info = action.payload;
      });
    builder.addCase(
      fetchLogout.rejected,(state, action) => {
        state.loginLoad = false;
        state.loginError = action.payload;
      });
  }
});


export default logout.reducer;