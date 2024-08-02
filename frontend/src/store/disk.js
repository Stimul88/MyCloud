import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const server = process.env.REACT_APP_API_URL;


export const fetchDisk= createAsyncThunk(
  'fetchDisk',
  async (id) => {
    const response = await axios.get(`${server}users/${id}/files/`)
    // const response = await axios.get(`${server}/files/`)
    // const response = await axios.get(`${server}users/${id}/`, config)
    return response.data
    // try{
    //   // const config = {
    //   //   headers: {
    //   //     'Content-Type': 'application/json',
    //   //   },
    //   //   withCredentials: true
    //   // }
    //   const response = await axios.get(`${server}users/${id}`)
    //   // const response = await axios.get(`${server}users/${id}/`, config)
    //   return response.data
    // }
    // catch (error) {
    //   console.log('not auth')
    // }
  }
)

const disk = createSlice({
  name: "disk",
  initialState: {
    loginStatus: "",
    info: [],
    saveLogin: "",
    deleteStatus: "",
    loginLoad: false,
    refresh: '',
    access: '',
    loginError: {},
    fileInfo: false,
    openFile: '',
    hiddenClass: 'hidden',
    data: '',
  }
  ,
  reducers: {
    saveFileInfo: (state, action) => {
      state.fileInfo =  action.payload;
    },
    deleteStatus: (state, action) => {
      state.deleteStatus = action.payload;
    },
    openEl: (state, action) => {
      state.openFile = action.payload;
    },
    hiddenTag: (state, action) => {
      state.hiddenClass = action.payload;
    },
    saveData: (state, action) => {
      state.data = action.payload;
    },
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
      state.deleteStatus = '';
      state.info = [];
    });
    builder.addCase(
      fetchDisk.fulfilled, (state, action) => {
        state.info = action.payload;
        // state.deleteStatus = '';

      });
    builder.addCase(
      fetchDisk.rejected,(state, action) => {
        state.info = [];
        state.deleteStatus = '';
        // state.loginLoad = false;
        // state.loginError = action.payload;
      });
  }
});


export const { saveFileInfo, deleteStatus, openEl, hiddenTag, saveData } = disk.actions;
export default disk.reducer;