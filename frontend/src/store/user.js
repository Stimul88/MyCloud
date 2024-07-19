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
      const response = await axios.get(`${server}user/${id}`, config)
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
    loginStatus: "",
    userInfo: {},
    saveLogin: "",
    usersLoad: false,
    usersError: {},
  }
  ,
  reducers: {
    // cleanInfo: (state) => {
    //   state.info = {};
    // },
    // saveLogin: (state, action) => {
    //   state.saveLogin = action.payload;
    // },
    // // getInfo: (state, action) => {
    // //   state.info = action.payload;
    // // },
    // getEnterStatus: (state, action) => {
    //   state.enterStatus = action.payload;
    // },
    // getRole: (state, action) => {
    //   state.role = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.usersLoad = true;
      state.usersError = '';
      state.usersArray = {};
    });
    builder.addCase(
      fetchUser.fulfilled, (state, action) => {
        console.log(action.payload)
        state.userInfo = action.payload;

      });
    builder.addCase(
      fetchUser.rejected,(state, action) => {
        console.log(action.payload)
        state.loginError = action.payload;
      });
  }
});


export const { saveLogin, cleanInfo, getEnterStatus} = user.actions;
export default user.reducer;