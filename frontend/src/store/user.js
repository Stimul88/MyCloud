import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const server = process.env.REACT_APP_API_URL;


export const fetchUser= createAsyncThunk(
  'fetchUser',
  async (id) => {
    try{
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }
      const response = await axios.get(`${server}users/${id}`, config)
      return response.data
    }
    catch (error) {
      console.log('not auth')
    }
  }
)

const user = createSlice({
  name: "user",
  initialState: {
    userStatus: "",
    userInfo: {},
    saveLogin: "",
    usersLoad: false,
    usersError: '',
  }
  ,
  reducers: {
    cleanUserInfo: (state) => {
      state.userInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.usersLoad = true;
      state.usersError = '';
      state.userInfo = {};
    });
    builder.addCase(
      fetchUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;

      });
    builder.addCase(
      fetchUser.rejected,(state, action) => {
        state.loginError = action.payload;
        state.userInfo = {};
      });
  }
});


export const { cleanUserInfo } = user.actions;
export default user.reducer;