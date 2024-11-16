import { configureStore } from '@reduxjs/toolkit';
import {chartReducer} from './redux/chartSlice';
import { logReducer } from './redux/logSlice';

export const store = configureStore({
  reducer: {
    chart: chartReducer,
    log: logReducer,
  },
});
