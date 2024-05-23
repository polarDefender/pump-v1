import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Tickers } from '@/types/index';

export interface PaySourceState {
  tickers: Tickers | null;
}
export const storageKey = "tickers";
const savedTickers = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(storageKey) || "{}") : {tickers: {
    data: [],
    block_height: ''
  }};
const initialState: PaySourceState = savedTickers

const tickersSlice = createSlice({
  name: 'tickers',
  initialState,
  reducers: {
    addTikcer: (state: PaySourceState, action: PayloadAction<Tickers>) => {
      localStorage.setItem(storageKey, JSON.stringify(state));
      return state;
    },
    editTickers: (state: PaySourceState, action: PayloadAction<Tickers>) => {
      localStorage.setItem(storageKey, JSON.stringify(state));
      return state;
    },
    deleteTickers: (state, action: PayloadAction<string>) => {
      localStorage.setItem(storageKey, JSON.stringify(state));
      return state;
    },
    setTickers: (state, action: PayloadAction<Tickers>) => {
      state.tickers = action.payload;
      localStorage.setItem(storageKey, JSON.stringify(state));
      return state;
    }
  }
});

export const { addTikcer, editTickers, deleteTickers, setTickers } = tickersSlice.actions;
export default tickersSlice.reducer;
