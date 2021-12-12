import React, {useEffect, useState} from 'react'
import Card from "../components/Card/Card";
import Drawer from '../components/Cart/Drawer';
import Header from '../components/Header/Header';
import {useGlobalContext} from '../context'
import axios from 'axios'

const url = "http://localhost:5000/api/v1/"

const Home = ({history}) => {

    const {search, isCartOpen, allProducts, dispatch, errorAllProducts} = useGlobalContext()
    const [searchTerm, setSearchTerm] = useState("")


    useEffect(() => {
        const fetchAllProducts = async () => {
            const token = localStorage.getItem("authToken")
            if (!token) {
                return history.push("/login")
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            if (token) {
                try {
                    const { data } = await axios.get(url + `/products?name=${search}`, config)
                    if (!data.length) {
                        return dispatch({type: "ERROR_ALL_PRODUCTS", msg: "There is no item left.."})
                    }
                    dispatch({type: "GET_ALL_PRODUCTS", data})
                    
                } catch (error) {
                    console.log(error);
                }
            }
        }
        
        fetchAllProducts()
    }, [dispatch, history, search])

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
                    const data = await axios.get(url + "/cart", config)
                    const cartProductFromDB = data.data
                    // console.log(cartProductFromDB);
                    dispatch({type: "GET_CART", data:cartProductFromDB})
                } catch (error) {
                    console.log(error);
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
                    // console.log(data);
                    dispatch({type: "GET_ALL_FAVORITES", data})
                } catch (error) {
                    console.log(error);
                }
            }
        }
        fetchFavoriteProducts()
    }, [dispatch])

    useEffect(() => {
        const time = setTimeout(() => {
            dispatch({type: "SEARCH", searchTerm})
        }, 1000);
        return () => {
            clearTimeout(time)
        }
    }, [searchTerm, dispatch])



    return (
        <>
            <Header history = {history} />
            {isCartOpen && <Drawer />}
            <div className="products-container">

                <div className="header-container">
                    <h3>all content</h3>
                    <div className="search">
                        <svg className="svg-icon" viewBox="0 0 20 20">
                            <path fill="none" d="M12.323,2.398c-0.741-0.312-1.523-0.472-2.319-0.472c-2.394,0-4.544,1.423-5.476,3.625C3.907,7.013,3.896,8.629,4.49,10.102c0.528,1.304,1.494,2.333,2.72,2.99L5.467,17.33c-0.113,0.273,0.018,0.59,0.292,0.703c0.068,0.027,0.137,0.041,0.206,0.041c0.211,0,0.412-0.127,0.498-0.334l1.74-4.23c0.583,0.186,1.18,0.309,1.795,0.309c2.394,0,4.544-1.424,5.478-3.629C16.755,7.173,15.342,3.68,12.323,2.398z M14.488,9.77c-0.769,1.807-2.529,2.975-4.49,2.975c-0.651,0-1.291-0.131-1.897-0.387c-0.002-0.004-0.002-0.004-0.002-0.004c-0.003,0-0.003,0-0.003,0s0,0,0,0c-1.195-0.508-2.121-1.452-2.607-2.656c-0.489-1.205-0.477-2.53,0.03-3.727c0.764-1.805,2.525-2.969,4.487-2.969c0.651,0,1.292,0.129,1.898,0.386C14.374,4.438,15.533,7.3,14.488,9.77z"></path>
                        </svg>
                        <input type="text" name="" id="" placeholder="search..." value = {searchTerm} onChange = {(e) => setSearchTerm(e.target.value)}  />
                    </div>
                </div>

                <div className="card-container">
                    {errorAllProducts || (allProducts  && allProducts.map(item => {
                        return <Card item = {item} key = {item._id} />
                    }))}
                </div>

            </div>
        </>
    )
}

export default Home
