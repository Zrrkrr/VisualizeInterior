import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [
    { id: 1, source: require("../assets/HomeImgs/Frame1.png") },
    { id: 2, source: require("../assets/HomeImgs/Frame2.png") },
    { id: 3, source: require("../assets/HomeImgs/Frame3.png") },
    { id: 4, source: require("../assets/HomeImgs/Frame4.png") },
    { id: 5, source: require("../assets/HomeImgs/Frame5.png") },
    { id: 6, source: require("../assets/HomeImgs/Frame6.png") },
    { id: 7, source: require("../assets/HomeImgs/1.jpg") },
    { id: 8, source: require("../assets/HomeImgs/2.jpg") },
    { id: 9, source: require("../assets/HomeImgs/3.jpg") },
    { id: 10, source: require("../assets/HomeImgs/4.jpg") },
    { id: 11, source: require("../assets/HomeImgs/5.jpg") },
    { id: 12, source: require("../assets/HomeImgs/6.jpg") },
    { id: 13, source: require("../assets/HomeImgs/7.jpg") },
    { id: 14, source: require("../assets/HomeImgs/8.jpg") },
    { id: 15, source: require("../assets/HomeImgs/9.jpg") },
    { id: 16, source: require("../assets/HomeImgs/10.jpg") },
    { id: 17, source: require("../assets/HomeImgs/11.jpg") },
    { id: 18, source: require("../assets/HomeImgs/12.jpg") },
  ],
};

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setImages: (state, action) => {
      state.images = action.payload;
    },
  },
});

export const { setImages } = imageSlice.actions;
export default imageSlice.reducer;