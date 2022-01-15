import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import productReducer from "./AllProducts/allProductSlice"
import isCartOpenReducer from "./isCartOpen/isCartOpen"

export default configureStore({
    reducer: {
        user: userReducer,
        allProducts: productReducer,
        isCartOpen: isCartOpenReducer
    }
})