import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BtcPriceInUSD } from '@/types/index';

export const storageKey = "btcPrice";
const savedBtcPrice: BtcPriceInUSD = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(storageKey) || "{}") : {};
const initialState: BtcPriceInUSD = savedBtcPrice

const btcPriceSlice = createSlice({
  name: 'btcPrice',
  initialState,
  reducers: {
    setBtcPrice: (state, action: PayloadAction<number>) => {
      state.usd = action.payload;
      localStorage.setItem(storageKey, JSON.stringify(state));
      return state;
    }
  }
});

export const { setBtcPrice } = btcPriceSlice.actions;
export default btcPriceSlice.reducer;
