import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from './features/peopleSlice';
import itemsReducer from "./features/itemsSlice"

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    films: itemsReducer
  },
});
