import { createSlice } from "@reduxjs/toolkit";

// Initial state with images and descriptions
const initialState = {
  images: [
    { id: 1, source: require("../assets/additional/bedroom.png"), description: "Luxurious bedroom with modern decor." },
    { id: 2, source: require("../assets/additional/bedroom2.png"), description: "Stylish office space with custom furniture." },
    { id: 3, source: require("../assets/additional/commercialinterior.png"), description: "Elegant living room with soft lighting." },
    { id: 4, source: require("../assets/additional/residentialdesign.png"), description: "Contemporary commercial interior." },
    { id: 5, source: require("../assets/additional/1.jpg"), description: "Elegant living room with tufted sofas and chandelier." },
    { id: 6, source: require("../assets/additional/2.jpg"), description: "Cozy bedroom with wooden floor and sitting area." },
    { id: 7, source: require("../assets/additional/3.jpg"), description: "Cozy living room with balcony." },
    { id: 8, source: require("../assets/additional/4.jpg"), description: "Minimal wall with sleek linear lighting." },
    { id: 9, source: require("../assets/additional/5.jpg"), description: "Contemporary commercial interior." },
    { id: 10, source: require("../assets/additional/6.jpg"), description: "Contemporary commercial interior." },
    { id: 11, source: require("../assets/additional/7.jpg"), description: "Contemporary commercial interior." },
    { id: 12, source: require("../assets/additional/8.jpg"), description: "Contemporary commercial interior." },
    { id: 13, source: require("../assets/additional/9.jpg"), description: "Contemporary commercial interior." },
    { id: 14, source: require("../assets/additional/10.jpg"), description: "Contemporary commercial interior." },
    { id: 15, source: require("../assets/additional/11.jpg"), description: "Contemporary commercial interior." },
    { id: 16, source: require("../assets/additional/12.jpg"), description: "Contemporary commercial interior." },
    { id: 17, source: require("../assets/additional/13.jpg"), description: "Contemporary commercial interior." },
    { id: 18, source: require("../assets/additional/14.jpg"), description: "Contemporary commercial interior." },
  ],
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    // Add reducers here if needed (e.g., to update images or descriptions)
  },
});

export default portfolioSlice.reducer;