import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  people: [],
  status: 'idle',
  error: null,
  searchQuery: '',
  total: 0,
  nextPage: null,
  previousPage: null,

};

export const fetchPeople = createAsyncThunk('people/fetchPeople', async (page = 1, { getState }) => {
  const searchQuery = getState().people.searchQuery;
  const searchParam = searchQuery ? `&search=${searchQuery}` : '';
  const response = await axios.get(`https://swapi.dev/api/people/?page=${page}${searchParam}`);
 
  console.log(response)
  const { count, results, next, previous     } = response.data;
  console.log( results)
  console.log(response)
  return { results, total: results.length};
 
});


const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPeople.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.people = action.payload.results;
        state.total = action.payload.total;
        state.nextPage = action.payload.nextPage;
        state.previousPage = action.payload.previousPage;
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSearchQuery } = peopleSlice.actions;

export default peopleSlice.reducer;
