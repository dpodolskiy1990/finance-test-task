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
    const updatedResponse = response.map((item) => {
      if (item.ticker === "AAPL") {
        return {
          ...item,
          changes: "",
          variants: [
            "Apple",
            "aapl",
            "apl",
            "aple",
            "appple",
            "aplpe",
            "aaple",
            "appel",
            "aple",
            "apel",
            "applle",
            "apllee",
            "appl",
            "applle",
          ],
        };
      }
      if (item.ticker === "GOOGL") {
        return {
          ...item,
          changes: "",
          variants: [
            "Google",
            "googl",
            "gogle",
            "googgle",
            "googl",
            "googe",
            "goolge",
            "goglee",
          ],
        };
      }
      if (item.ticker === "MSFT") {
        return {
          ...item,
          changes: "",
          variants: [
            "Microsoft",
            "msft",
            "microsoft",
            "micrsoft",
            "micosoft",
            "microsof",
            "microsoftt",
            "mircosoft",
          ],
        };
      }
      if (item.ticker === "AMZN") {
        return {
          ...item,
          changes: "",
          variants: [
            "Amazon",
            "amzn",
            "amzon",
            "amazn",
            "amazonn",
            "amaon",
            "amazo",
            "amazzon",
          ],
        };
      }
      if (item.ticker === "FB") {
        return {
          ...item,
          changes: "",
          variants: [
            "Facebook",
            "fb",
            "facbook",
            "fecebook",
            "facebok",
            "faceboook",
            "fcaebook",
            "faceboo",
          ],
        };
      }
      if (item.ticker === "TSLA") {
        return {
          ...item,
          changes: "",
          variants: [
            "Tesla",
            "tsla",
            "tesela",
            "telsa",
            "tesl",
            "tesls",
            "tezla",
            "telsaa",
          ],
        };
      } else {
        return item;
      }
    });
    return updatedResponse;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  data: [],
  status: "",
  error: null,
  timer: 1,
  search: "",
  blockList: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    changeTime: (state, action) => {
      state.timer = action.payload;
    },
    searchItem: (state, action) => {
      state.search = action.payload;
    },
    remove: (state, action) => {
      state.blockList.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newData = action.payload;
        if (newData.length === 0) {
          state.status = "wrong data";
        }

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

export const { changeTime, searchItem, remove, setData } = dataSlice.actions;
export default dataSlice.reducer;
