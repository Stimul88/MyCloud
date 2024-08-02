import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const server = process.env.REACT_APP_API_URL;


export const fetchUsers= createAsyncThunk(
  'fetchUsers',
  async () => {
    try{
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }
      const response = await axios.get(`${server}users/`, config)
      return response.data
    }
    catch (error) {
      console.log('not auth')
    }
  }
)

const users = createSlice({
  name: "users",
  initialState: {
    loginStatus: "",
    usersArray: {},
    saveLogin: "",
    usersLoad: false,
    usersError: {},
    deleteUser: '',
  }
  ,
  reducers: {
    // cleanInfo: (state) => {
    //   state.info = {};
    // },
    deleteUserStatus: (state, action) => {
      state.deleteUser = action.payload;
    },
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
    builder.addCase(fetchUsers.pending, (state) => {
      state.usersLoad = true;
      state.usersError = '';
      state.deleteUser = '';
      state.usersArray = {};
    });
    builder.addCase(
      fetchUsers.fulfilled, (state, action) => {
        state.usersArray = action.payload;

      });
    builder.addCase(
      fetchUsers.rejected,(state, action) => {
        console.log(action.payload)
        state.loginError = action.payload;
        state.deleteUser = '';
      });
  }
});


export const { deleteUserStatus, cleanInfo, getEnterStatus} = users.actions;
export default users.reducer;