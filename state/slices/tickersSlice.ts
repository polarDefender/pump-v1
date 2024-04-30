import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Tickers } from '@/types/index';

export interface PaySourceState {
  tikcers: Tickers | null;
}
export const storageKey = "tikcers";
const savedTickers = JSON.parse(localStorage.getItem(storageKey) || "{}");
const initialState: PaySourceState = {...savedTickers, tickers: {}};

const paySourcesSlice = createSlice({
  name: 'paySources',
  initialState,
  reducers: {
    addTikcer: (state: PaySourceState, action: PayloadAction<Tickers>) => {
      localStorage.setItem(storageKey, JSON.stringify(state));
      return state;
    },
    editTikcers: (state: PaySourceState, action: PayloadAction<Tickers>) => {
      localStorage.setItem(storageKey, JSON.stringify(state));
      return state;
    },
    deleteTickers: (state, action: PayloadAction<string>) => {
      localStorage.setItem(storageKey, JSON.stringify(state));
      return state;
    },
    setTickers: (state, action: PayloadAction<Tickers>) => {
      state.tikcers = action.payload;
      localStorage.setItem(storageKey, JSON.stringify(state));
      return state;
    }
  }
});

export const { addTikcer, editTikcers, deleteTickers, setTickers } = paySourcesSlice.actions;
export default paySourcesSlice.reducer;
