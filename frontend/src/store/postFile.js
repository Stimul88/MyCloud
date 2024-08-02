import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const server = process.env.REACT_APP_API_URL;
// const token = localStorage.token


export const fetchPostFile = createAsyncThunk(
  'fetchPostFile',
  async (data,  { rejectWithValue }) => {

    const { id } = data
    //
    // const newData = {
    //   title: title,
    //   cover: cover
    // }

    try{
      const config = {
        headers: {
          // 'Content-Type': 'application/json',
          'content-type': 'multipart/form-data'
          // 'charset': 'utf-8',
        },
        withCredentials: true
      }
      // const response = await axios.post(`${server}files/`, newData, config)
      // const response = await axios.post(`${server}files/`, data, config)
      const response = await axios.post(`${server}users/${id}/files/`, data, config)
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

// export const fetchPostFile = createAsyncThunk(
//   'fetchPostFile',
//
//   async ( data) => {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         'charset': 'utf-8',
//       }
//     }
//     // axios.post(`${server}users/${id}/files/`, data)
//     axios.post(`${server}files/`, data)
//       .then(response => response.data);
//   }
// )


// export const fetchPostFile = createAsyncThunk(
//   'fetchPostFile',
//   async (id, data, {rejectWithValue}) => {
//     const response = await axios.post(`${server}users/${id}/files/`, data)
//     return response.data
//     // try{
//     //   const config = {
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //       'charset': 'utf-8',
//     //     },
//     //     withCredentials: true
//     //   }
//     //   const response = await axios.post(`${server}users/${id}/files/`, data, config)
//     //   // const response = await axios.post(`${server}files/`, data, config)
//     //   // axios.defaults.headers.common['Authorization'] = `Bearer ${user['access']}`;
//     //   return response.data
//     // }
//     // catch (error) {
//     //   if (error.response.status === 401) {
//     //     return rejectWithValue({ message: error.response.status })
//     //   }
//       // return rejectWithValue({message: 'Some Other message'})
//     // }
//   }
// )

// export const fetchPostFile = createAsyncThunk(
//   'fetchPostFile',
//   async (id, data) => {
//     // const config = {
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //     'charset': 'utf-8',
//     //   },
//     //   withCredentials: true
//     // }
//     // // const response = await axios.post(`${server}token/`, user, config)
//     // const response = await axios.post(`${server}users/${id}/files/`, data, config)
//     // // axios.defaults.headers.common['Authorization'] = `Bearer ${user['access']}`;
//     // return response.data
//     // try{
//     //   const config = {
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //       'charset': 'utf-8',
//     //     },
//     //     withCredentials: true
//     //   }
//     //   // const response = await axios.post(`${server}token/`, user, config)
//     //   const response = await axios.post(`${server}users/${id}/files/`, data, config)
//     //   // axios.defaults.headers.common['Authorization'] = `Bearer ${user['access']}`;
//     //   return response.data
//     // }
//     // catch (error) {
//     //   if (error.response.status === 401) {
//     //     return rejectWithValue({ message: error.response.status })
//     //   }
//       // return rejectWithValue({message: 'Some Other message'})
//     // }
//     // let formData = new FormData();
//     // formData.append('myFile', data);
//     // formData.append('otherParam', 'myValue')
//     const response = await axios.post(`${server}users/${id}/files/`, data,
//     // const response = await axios.post(`${server}files/`, data,
//     // const response = await axios.post(`${server}files/`, {sdfsdf:"sdfsdf"},
//       {
//         headers: {
//           'Content-Type': "application/json",
//           // 'Access-Control-Allow-Origin': '*',
//           'charset': 'utf-8',
//         },
//       withCredentials: true
//       })
//     return response.data
//   }
// )

const postFile = createSlice({
  name: "postFile",
  initialState: {
    response: '',
    enterStatus: false,
    authLoading: false,
    role: 'user',
    // authError: "",
  }
  ,
  reducers: {
    getAuthStatus: (state, action) => {
      state.response = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostFile.pending, (state) => {
      state.authLoading = true;
      state.response = '';
      // state.authError = '';
    });
    builder.addCase(
      fetchPostFile.fulfilled, (state, action) => {
        console.log(action.payload)

        state.response = action.payload;
        state.authLoading = false;

      });
    builder.addCase(
      fetchPostFile.rejected,(state, action) => {
        state.authLoading = false;
        state.response = '';
        state.authError = action.payload;
      });
  }
});


export const { getAuthStatus } = postFile.actions;
export default postFile.reducer;