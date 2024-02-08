
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFilmDetails = createAsyncThunk('films/fetchDetails', async (filmUrls, { rejectWithValue }) => {
  try {
    const responses = await Promise.all(
      filmUrls.map((url) => axios.get(url))
    );
    return responses.map((response) => response.data);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


const filmsSlice = createSlice({
  name: 'films',
  initialState: {
    filmsDetails: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmDetails.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchFilmDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.filmsDetails = action.payload; 
      })
      .addCase(fetchFilmDetails.rejected, (state, action) => {
        state.status = 'failed';
      state.error = action.payload; 
      });
  },
 
});

export default filmsSlice.reducer;
