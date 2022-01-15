import { createSlice } from "@reduxjs/toolkit";

export const isCartOpenSlice = createSlice({
    name: "isCartOpen",
    initialState: {
        isCartOpen: false
    },
    reducers: {
        open: (state) => {
            state.isCartOpen = true
        },
        close: (state) => {
            state.isCartOpen = false
        }
    }
})

export const {open, close} = isCartOpenSlice.actions
export default isCartOpenSlice.reducer