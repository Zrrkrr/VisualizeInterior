import { createSlice } from "@reduxjs/toolkit";

const nameSlice = createSlice({
  name: "name", // Slice name
  initialState: {
    name: "", // Initialize the name property as part of an object
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload; // Directly mutate the state
    },
  },
});

export const { setName } = nameSlice.actions; // Export the action
export default nameSlice.reducer; // Export the reducer