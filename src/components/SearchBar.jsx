import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery, fetchPeople } from '../store/features/peopleSlice';
import {TextField,Grid} from '@mui/material';
import Button from '@mui/material/Button';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(setSearchQuery(input));
    dispatch(fetchPeople());
  };

  return (

   <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '20px' }} p={2}>
  <Grid item>
    <TextField
      variant="outlined"
      label="Search"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      style={{ marginRight: '10px', textAlign: 'center' }}
    />
  </Grid>
  <Grid item>
    <Button variant="contained" onClick={handleSearch}>Search</Button>
  </Grid>
</Grid>
  );
};

export default SearchBar;
