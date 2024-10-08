import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { login, signup, user } from "../../constant/routes";
import {
  hideToast,
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../utils/toastHelper";
import setAuthToken from "../../utils/setAuthToken";

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

// Async thunk to handle sign up
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (userData, { rejectWithValue }) => {
    console.log("🚀 ~ userData:", userData)
    try {
      showLoadingToast("Signing up...");
      
      // Send request as JSON
      const { data } = await axios.post(signup, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Store user data
      await AsyncStorage.setItem("user", JSON.stringify(data));

      hideToast(); // Remove loading toast
      showSuccessToast("Signed up successfully!"); // Show success toast

      return data;
    } catch (error) {
      console.log("🚀 ~ error:", error.response.data)
      hideToast(); // Remove loading toast
      showErrorToast("Failed to sign up"); // Show error toast

      return rejectWithValue(
        error.response?.data?.message || "Failed to sign up"
      );
    }
  }
);

// Async thunk to handle login
// Async thunk to handle login and fetch user details using the token
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      showLoadingToast("Logging in...");

      // Step 1: Login request to get the access token
      const params = new URLSearchParams();
      params.append("email", userData.email);
      params.append("password", userData.password);

      const { data } = await axios.post(login, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      console.log("🚀 ~ data:", data)

      const accessToken = data.access_token;

      // Step 2: Use the access token to fetch user details from /user/me
      const { data: userDetails } = await axios.get(`${user}/me`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("🚀 ~ userDetails:", userDetails)


      // Combine access token and user details into one object
      const userWithToken = {
        ...userDetails,
        accessToken,
      };

      // Store the combined object in one key ("user") in AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(userWithToken));

      hideToast(); // Remove loading toast
      showSuccessToast("Logged in successfully!");

      // Return the combined object (accessToken and user details)
      return userWithToken;
    } catch (error) {
      console.log("🚀 ~ error:", error.response.data)
      hideToast(); // Remove loading toast
      showErrorToast("Failed to login");

      return rejectWithValue(
        error.response?.data?.message || "Failed to login"
      );
    }
  }
);


// Async thunk to handle logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      // Remove user data from AsyncStorage
      await AsyncStorage.removeItem("user");
    } catch (error) {
      return rejectWithValue("Failed to logout");
    }
  }
);

// Async thunk to check authentication state from local storage
export const checkAuthState = createAsyncThunk(
  "auth/checkAuthState",
  async (_, { rejectWithValue }) => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        return parsedUser; // Set this data in Redux state via fulfilled case
      } else {
        return null; // No user found, return null to reset the state
      }
    } catch (error) {
      return rejectWithValue("Failed to check auth state");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Signup reducers
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        setAuthToken(action.payload.access_token);
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    // Login reducers
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        setAuthToken(action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    // Logout reducers
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Check auth state reducers
    builder
      .addCase(checkAuthState.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthState.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
          setAuthToken(action.payload.accessToken);
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
        state.loading = false;
      })
      .addCase(checkAuthState.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setLoading } = authSlice.actions;

export default authSlice.reducer;
