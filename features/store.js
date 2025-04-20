import { configureStore } from "@reduxjs/toolkit";
import nameReducer from "./nameSlice";
import imageReducer from "./imageSlice";
import portfolioReducer from "./portfolioSlice";

const store = configureStore({
    reducer: {
        name: nameReducer,
        images: imageReducer,
        portfolio: portfolioReducer,
    },
});

export default store;