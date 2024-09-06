import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const server = process.env.REACT_APP_API_URL;

export const fetchAuth = createAsyncThunk(
  'fetchAuth',
  async (data, { rejectWithValue }) => {
    const response = await axios.post(`${server}register/`, data)
    return response.data
  }
)

console.log(server)

const auth = createSlice({
  name: "auth",
  initialState: {
    authInfo: "",
    enterStatus: false,
    authLoading: false,
    role: 'user',
    authError: "",
  }
  ,
  reducers: {
    clearAuthInfo: (state, action) => {
      state.authInfo = action.payload;
    },
    clearAuthError: (state, action) => {
      state.authError = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.authInfo = '';
      state.authError = '';
    });
    builder.addCase(
      fetchAuth.fulfilled, (state, action) => {
        state.authInfo = action.payload;
        state.authError = '';
      });
    builder.addCase(
      fetchAuth.rejected,(state, action) => {
        state.authError = action.error.message || 'Server Error';
      });
  }
});


export const { clearAuthInfo, clearAuthError } = auth.actions;
export default auth.reducer;