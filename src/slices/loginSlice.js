import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// create async thunk
export const userLogin = createAsyncThunk(
  "user/login",
  async (userCredObj, { rejectWithValue }) => {
    console.log("user login slice", userCredObj);
    try {
      // making login request
      let res = await axios.post(
        "http://localhost:8080/user-api/login",
        userCredObj
      );
      console.log("response is: ", res);
      if (res.data.message === "Welcome back") {
        sessionStorage.setItem("token", res.data.token);
        localStorage.setItem("userObj", JSON.stringify(res.data.payload));
        localStorage.setItem("status", "success");
        return res.data;
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

let user = localStorage.getItem("userObj");
if (!user) {
  user = {};
} else {
  user = JSON.parse(user);
}

let status = localStorage.getItem("status");
if (!status) {
  status = "idle";
}

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    userObj: user,
    status: status,
    errorMessage: "",
    role: "",
  },
  reducers: {
    clearState: (state) => {
      state.userObj = {};
      state.status = "idle";
      state.errorMessage = "";
      state.role = "";
      localStorage.removeItem("userObj");
      localStorage.removeItem("status");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      console.log("Fromm action", action);
      state.userObj = action.payload.payload;
      console.log("action paylaod", action.payload);
      state.errorMessage = "";
      state.role = action.payload.payload.role;
      console.log("role", state.role);
      state.status = "success";
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      console.log("from rejected", action);
      state.errorMessage = action.payload.message;
      console.log(action.payload.message);
      state.status = "failed";
    });
  },
});

// action creator objects
export const { clearState } = loginSlice.actions;

// reducers
export default loginSlice.reducer;
