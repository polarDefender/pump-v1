// src/state/store.ts

import { configureStore } from '@reduxjs/toolkit';
import tickersReducer from './slices/tickersSlice';
import btcPriceReducer from './slices/btcPriceSlice'

const store = configureStore({
  reducer: {
    tickers: tickersReducer,
    btcPriceInUSD: btcPriceReducer
  },
});

export default store;
