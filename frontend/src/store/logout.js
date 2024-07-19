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
      const response = await axios.post(`${server}logout/`, {
        refresh_token: localStorage.getItem('refresh_token')
      }, config)
      axios.defaults.headers.common['Authorization'] = null;
      // window.location.href = '/login'
    }catch(e){
      console.log('logout not work',e)
    }

    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   withCredentials: true
    // }

    // const response = await axios.post(`${server}logout/`, user, config)
    // return response.data
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
    cleanInfo: (state) => {
      state.info = {};
    },
    saveLogin: (state, action) => {
      state.saveLogin = action.payload;
    },
    // getInfo: (state, action) => {
    //   state.info = action.payload;
    // },
    getEnterStatus: (state, action) => {
      state.enterStatus = action.payload;
    },
    // getRole: (state, action) => {
    //   state.role = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogout.pending, (state) => {
      state.loginLoad = true;
      state.loginError = '';
      state.info = {};
    });
    builder.addCase(
      fetchLogout.fulfilled, (state, action) => {
        console.log(action.payload)
        state.info = action.payload;
      });
    builder.addCase(
      fetchLogout.rejected,(state, action) => {
        state.loginLoad = false;
        state.loginError = action.payload;
      });
  }
});


export const { saveLogin, cleanInfo, getEnterStatus} = logout.actions;
export default logout.reducer;