import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const server = process.env.REACT_APP_API_URL;


export const fetchLogin = createAsyncThunk(
  'fetchLogin',
  async (user, { rejectWithValue }) => {
    try{
    const config = {
      headers: {
        'Content-Type': 'application/json',

      },
      withCredentials: true
    }
      const response = await axios.post(`${server}token/`, user, config)
      console.log(response)
      // axios.defaults.headers.common['Authorization'] = `Bearer ${user['access']}`;
      return response.data
    }
    catch (error) {
      if (error.response.status === 401) {
        return rejectWithValue({ message: error.response.status })
      }
      // return rejectWithValue({message: 'Some Other message'})
    }
  }
)

const login = createSlice({
  name: "auth",
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
    builder.addCase(fetchLogin.pending, (state) => {
      state.loginLoad = true;
      state.loginError = '';
      state.info = {};
    });
    builder.addCase(
      fetchLogin.fulfilled, (state, action) => {
        // console.log(action)
        state.info = action.payload;
        state.refresh = action.payload.refresh;
        state.access = action.payload.access;

      });
    builder.addCase(
      fetchLogin.rejected,(state, action) => {
        console.log(action.payload)
        state.loginLoad = false;
        state.loginError = action.payload;
      });
  }
});


export const { saveLogin, cleanInfo, getEnterStatus} = login.actions;
export default login.reducer;