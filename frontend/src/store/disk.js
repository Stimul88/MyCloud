import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const server = process.env.REACT_APP_API_URL;


export const fetchDisk= createAsyncThunk(
  'fetchDisk',
  async (id) => {
    try{
      // const config = {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   withCredentials: true
      // }
      const response = await axios.get(`${server}users/${id}/files/`)
      // const response = await axios.get(`${server}users/${id}/`, config)
      return response.data
    }
    catch (error) {
      console.log('not auth')
    }
  }
)

const disk = createSlice({
  name: "disk",
  initialState: {
    loginStatus: "",
    info: {},
    saveLogin: "",
    loginLoad: false,
    refresh: '',
    access: '',
    loginError: {},
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
    builder.addCase(fetchDisk.pending, (state) => {
      state.loginLoad = true;
      state.loginError = '';
      state.info = {};
    });
    builder.addCase(
      fetchDisk.fulfilled, (state, action) => {
        state.info = action.payload;
        // state.refresh = action.payload.access;
        // state.access = action.payload.refresh;

      });
    builder.addCase(
      fetchDisk.rejected,(state, action) => {
        console.log(action.payload)
        // state.loginLoad = false;
        // state.loginError = action.payload;
      });
  }
});


export const { saveLogin, cleanInfo, getEnterStatus} = disk.actions;
export default disk.reducer;