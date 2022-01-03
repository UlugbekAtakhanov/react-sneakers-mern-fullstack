import React, { useContext, useReducer, useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
import reducer from './reducer';
import axios from 'axios';

const AppContext = React.createContext();

const url = "http://localhost:5000/api/v1"

const AppProvider = ( {children, history} ) => {

    // const navigate = useNavigate()

    const initialState = {
        isLoading: true,
        mainUser: {},
        // allProducts: [...Array(10)],
        allProducts: [],
        search: "",
        errorAllProducts: "",

        errorCartProducts: "",

        singleProduct: {},
        


        cart: [], // it contains all info about user's cart..
        cartTotal: 0,

        allFavorites: []
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    const [isCartOpen, setIsCartOpen] = useState(false)
    const [itemFromCartId, setItemFromCartId] = useState("")
    const [cartTotal, setCartTotal] = useState(0)


    useEffect(() => {
        const fetchAllProducts = async () => {
            const token = localStorage.getItem("authToken")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            if (token) {
                try {
                    const { data } = await axios.get(url + `/products?name=${state.search}`, config)
                    if (!data.length) {
                        return dispatch({type: "ERROR_ALL_PRODUCTS", msg: "There is no item left.."})
                    }
                    dispatch({type: "GET_ALL_PRODUCTS", data})
                    
                } catch (error) {
                    console.log(error.response);
                }
            }
        }
        fetchAllProducts()

    }, [dispatch, history, state.search])

    // console.log(state.cart);

    useEffect(() => {
        const fetchCartProducts = async () => {
            const token = localStorage.getItem("authToken")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            if (token) {
                try {
                    const {data} = await axios.get(url + "/cart", config)
                    dispatch({type: "GET_CART", data})
                } catch (error) {
                    // console.log(error.response.data.msg);
                    dispatch({type: "ERROR_CART_PRODUCTS", msg: error.response.data.msg})
                }
            }
        }
        fetchCartProducts()
    }, [dispatch])


    useEffect(() => {
        const fetchFavoriteProducts = async () => {
            const token = localStorage.getItem("authToken")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            if (token) {
                try {
                    const {data} = await axios.get(url + "/favorites", config)
                    dispatch({type: "GET_ALL_FAVORITES", data})
                } catch (error) {
                    console.log(error);
                }
            }
        }
        fetchFavoriteProducts()
    }, [dispatch])


    return (
        <AppContext.Provider value={{
            // navigate,
            ...state ,
            dispatch,
            isCartOpen, setIsCartOpen,
            itemFromCartId, setItemFromCartId,
            cartTotal, setCartTotal




        }}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppProvider, useGlobalContext}
