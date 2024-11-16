import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { updateChartData } from "./chartSlice";

export const submitLog = createAsyncThunk(
  "log/submitLog",
  async (formData, { dispatch }) => {
    const response = await axios.post(
      "http://localhost:5000/api/logs",
      formData
    );
    const data = response.data;
    dispatch(updateChartData(data.chartData));
    return data;
  }
);

export const fetchLogs = createAsyncThunk("log/fetchLogs", async () => {
  const response = await axios.get("http://localhost:5000/api/logs/logs"); // Endpoint to fetch logs
  return response.data;
});

const logSlice = createSlice({
  name: "log",
  initialState: { logs: [], chartData: [], status: "idle" },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(submitLog.pending, state => {
        state.status = "loading";
      })
      .addCase(submitLog.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.logs = [action.payload.log, ...state.logs];
      })
      .addCase(submitLog.rejected, state => {
        state.status = "failed";
      })
      .addCase(fetchLogs.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.logs = action.payload;
      })
      .addCase(fetchLogs.rejected, state => {
        state.status = "failed";
      });
  }
});

export const logReducer = logSlice.reducer;
