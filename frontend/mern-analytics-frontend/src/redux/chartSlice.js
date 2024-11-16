import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChartData = createAsyncThunk(
  "chart/fetchChartData",
  async () => {
    const response = await axios.get("http://localhost:5000/api/charts" );
    return response.data;
  }
);

export const fetchChartDataByDate = createAsyncThunk(
  "chart/fetchChartDataByDate",
  async dates => {
    const response = await axios.post(
      "http://localhost:5000/api/charts/date",
      dates
    );
    console.log("response: ", response.data);
    return response.data;
  }
);

const chartSlice = createSlice({
  name: "chart",
  initialState: { data: [], status: "idle" },
  reducers: {
    // update state with new data
    updateChartData(state, action) {
      state.data = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchChartData.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        // console.log("starting chart data: ", state.data.length);
      })
      .addCase(fetchChartData.rejected, state => {
        state.status = "failed";
      })
      .addCase(fetchChartDataByDate.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchChartDataByDate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = [...action.payload];
        // length of data
        // console.log("Filtered chart data: ", state.data.length);
      })
      .addCase(fetchChartDataByDate.rejected, state => {
        state.status = "failed";
      });
  }
});

export const chartReducer = chartSlice.reducer;
export const { updateChartData } = chartSlice.actions;
