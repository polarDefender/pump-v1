// src/state/store.ts

import { configureStore } from '@reduxjs/toolkit';
import tikcersReducer from './slices/tickersSlice';

const store = configureStore({
  reducer: {
    tickers: tikcersReducer,
  },
});

export default store;
