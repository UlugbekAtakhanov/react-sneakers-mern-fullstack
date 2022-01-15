import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "allProducts",
    initialState: {
        allProducts: [],
        isLoading: false,
        allProductsError: false
    },
    reducers: {
        getAllProductsStart: (state) => {
            state.isLoading = true
        },
        getAllProductsSuccess: (state, action) => {
            state.isLoading = false
            state.allProducts = action.payload
        },
        getAllProductsError: (state, action) => {
            state.isLoading = false
            state.allProductsError = action.payload
        }
    }
})

export const {getAllProductsStart, getAllProductsSuccess, getAllProductsError} = productSlice.actions
export default productSlice.reducer