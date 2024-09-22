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
      return response.data
    }
    catch (error) {
      if (error.response.status === 401) {
        return rejectWithValue({ message: error.response.status })
      }
    }
  }
)

const login = createSlice({
  name: "auth",
  initialState: {
    loginEnter: false,
    loginInfo: [],
    saveLogin: "",
    loginLoad: false,
    refresh: '',
    access: '',
    idUser: '',
    loginError: {},
  }
  ,
  reducers: {
    cleanInfo: (state) => {
      state.loginInfo = {};
    },
    saveLogin: (state, action) => {
      state.saveLogin = action.payload;
    },
    saveIdUser: (state, action) => {
      state.idUser = action.payload;
    },
    getEnterStatus: (state, action) => {
      state.enterStatus = action.payload;
    },
      cleanError: (state) => {
          state.loginError = {};
      },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.loginLoad = true;
      state.loginError = '';
      state.loginInfo = [];
    });
    builder.addCase(
      fetchLogin.fulfilled, (state, action) => {
        state.loginInfo = action.payload;
        state.refresh = action.payload.refresh;
        state.access = action.payload.access;

      });
    builder.addCase(
      fetchLogin.rejected,(state, action) => {
        state.loginInfo = [];
        state.loginLoad = false;
        state.loginError = action.payload;
      });
  }
});


export const { cleanError, saveLogin, cleanInfo, saveIdUser} = login.actions;
export default login.reducer;