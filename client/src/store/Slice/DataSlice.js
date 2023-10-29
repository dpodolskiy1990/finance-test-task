import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
const socket = io("http://localhost:4000");

export const fetchData = createAsyncThunk("dataSlice/fetchData", async () => {
  try {
    const response = await new Promise((resolve) => {
      socket.emit("start");
      socket.on("ticker", (data) => {
        resolve(data);
      });
    });
    const updatedResponse = response.map((item) => ({
      ...item,
      changes: "up",
    }));
    return updatedResponse;
  } catch (error) {
    throw error;
  }
});

const initialState = { data: [], status: "idle", error: null };

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newData = action.payload;
        if (state.data.length > 0) {
          state.data = state.data.map((existingItem, index) => {
            const newItem = newData[index];
            const priceDiff = newItem.price - existingItem.price;
            if (priceDiff > 0) {
              newItem.changes = "up";
            } else if (priceDiff < 0) {
              newItem.changes = "down";
            } else {
              newItem.changes = "no change";
            }
            return newItem;
          });
        } else {
          state.data = newData;
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
