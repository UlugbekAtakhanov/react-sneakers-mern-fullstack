import {getAllProductsStart, getAllProductsSuccess, getAllProductsError} from "./allProductSlice"
import axios from "axios"

const url = "http://localhost:5000/api/v1/"

export const getAllProducts = async (config, dispatch, search) => {
    dispatch(getAllProductsStart())
    try {
        const { data } = await axios.get(url + `/products?name=${search}`, config)
        console.log(data);
        if (!data.length) {
            dispatch(getAllProductsError())
        }
        dispatch(getAllProductsSuccess(data))
        
    } catch (error) {
        dispatch(getAllProductsError()) 
    }
}