import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import ContentLoader from "react-content-loader"
import "./Card.scss"
import {useGlobalContext} from '../../context'
import axios from 'axios'

const url = "http://localhost:5000/api/v1/cart"
const urlFavorite = "http://localhost:5000/api/v1/favorites"

const Card = ({item}) => {

    const {isLoading, dispatch, cart, setCartTotal, itemFromCartId, setItemFromCartId, allFavorites} = useGlobalContext()

    const [isInCart, setIsInCart] = useState(false)
    const [isInFavorite, setIsInFavorite] = useState(false)


    useEffect(() => {
        setIsInCart(false)
        cart.find(cartItem => {
            if (cartItem.product._id === itemFromCartId) {
                return setIsInCart(false)
            }
            if (cartItem.product._id === item._id) {
                return setIsInCart(true)
            }
            return null

        })
    }, [cart, item._id, itemFromCartId])

    useEffect(() => {
        setIsInFavorite(false)
        allFavorites.find(favItem => {
            if (favItem.product._id === item._id) {
                return setIsInFavorite(true)
            }
            return null
        })
    }, [allFavorites, item._id])


    // const addToCart = async (product) => {
        // const token = localStorage.getItem("authToken")
        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // }
        // console.log(product);
        // try {
        //     const data = await axios.post(url, {product}, config)
        //     setItemFromCartId("")
        //     setCartTotal(prev => prev + product.price)
        //     dispatch({type: "ADD_TO_CART", data: data.data})
        // } catch (error) {
        //     console.log(error.response);
        // }
    // }

    const deleteItemFromCartHandler = async (product) => {
        const productFromCart = cart.filter(cartItem => {
            if (cartItem.product._id === product._id) {
                return cartItem
            }
            return null
        })
        const newProduct = productFromCart[0]
        const token = localStorage.getItem("authToken")
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const {data} = await axios.delete(url + `/${newProduct._id}`, config)
            setCartTotal(prev => prev - product.price)
            dispatch({type: "DELETE_FROM_CART", data})
            setIsInCart(false)
        } catch (error) {
            console.log(error.response);
        }
    }

    // FAVORITE
    const addToFavoriteHandler = async (product) => {
        const token = localStorage.getItem("authToken")
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const data = await axios.post(urlFavorite, {product}, config)
            dispatch({type: "ADD_TO_FAVORITE", data:data.data})
        } catch (error) {
            console.log(error.response);
        }
    }



    const deleteFromFavoriteHandler = async (product) => {
        const specFav = allFavorites.filter(favorite => {
            if (favorite.product._id === product._id) {
                return favorite
            }
            return null
        })
        const token = localStorage.getItem("authToken")
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const specId = specFav[0]
        try {
            const {data} = await axios.delete(urlFavorite + `/${specId._id}`, config)
            console.log(data);
            dispatch({type: "DELETE_FROM_FAVORITE", data})
            setIsInFavorite(false)
        } catch (error) {
            console.log(error.response);
        }
    }

    if (isLoading) {
        return(
            <ContentLoader
                speed={0}
                width={"100%"}
                height={"100%"}
                viewBox="0 0 200 200"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="0" y="0" rx="10" ry="10" width="198" height="112" />
                <rect x="0" y="125" rx="5" ry="5" width="198" height="12" />
                <rect x="0" y="144" rx="5" ry="5" width="153" height="12" />
                <rect x="0" y="165" rx="5" ry="5" width="153" height="12" />
                <rect x="166" y="148" rx="5" ry="5" width="32" height="30" />
            </ContentLoader>
        )
    }
    return (
        <div className="card">
            <img src={item.img} alt="" />
            <p>{item.name}</p>
            <p>{item.company}</p>
            <div className="info">
                <div>
                    <span>Price: </span>
                    <b>${item.price}</b>
                </div>
                {isInFavorite ? (
                    <button onClick = {() => deleteFromFavoriteHandler(item)} className = "favorite-btn">
                        <svg className="svg-icon" viewBox="0 0 20 20">
                            <path fill="none" d="M13.22,2.984c-1.125,0-2.504,0.377-3.53,1.182C8.756,3.441,7.502,2.984,6.28,2.984c-2.6,0-4.714,2.116-4.714,4.716c0,0.32,0.032,0.644,0.098,0.96c0.799,4.202,6.781,7.792,7.46,8.188c0.193,0.111,0.41,0.168,0.627,0.168c0.187,0,0.376-0.041,0.55-0.127c0.011-0.006,1.349-0.689,2.91-1.865c0.021-0.016,0.043-0.031,0.061-0.043c0.021-0.016,0.045-0.033,0.064-0.053c3.012-2.309,4.6-4.805,4.6-7.229C17.935,5.1,15.819,2.984,13.22,2.984z M12.544,13.966c-0.004,0.004-0.018,0.014-0.021,0.018s-0.018,0.012-0.023,0.016c-1.423,1.076-2.674,1.734-2.749,1.771c0,0-6.146-3.576-6.866-7.363C2.837,8.178,2.811,7.942,2.811,7.7c0-1.917,1.554-3.47,3.469-3.47c1.302,0,2.836,0.736,3.431,1.794c0.577-1.121,2.161-1.794,3.509-1.794c1.914,0,3.469,1.553,3.469,3.47C16.688,10.249,14.474,12.495,12.544,13.966z"></path>
                        </svg>
                    </button>
                )
                :
                (
                    <button onClick = {() => addToFavoriteHandler(item)} className = "">
                        <svg className="svg-icon" viewBox="0 0 20 20">
                            <path fill="none" d="M13.22,2.984c-1.125,0-2.504,0.377-3.53,1.182C8.756,3.441,7.502,2.984,6.28,2.984c-2.6,0-4.714,2.116-4.714,4.716c0,0.32,0.032,0.644,0.098,0.96c0.799,4.202,6.781,7.792,7.46,8.188c0.193,0.111,0.41,0.168,0.627,0.168c0.187,0,0.376-0.041,0.55-0.127c0.011-0.006,1.349-0.689,2.91-1.865c0.021-0.016,0.043-0.031,0.061-0.043c0.021-0.016,0.045-0.033,0.064-0.053c3.012-2.309,4.6-4.805,4.6-7.229C17.935,5.1,15.819,2.984,13.22,2.984z M12.544,13.966c-0.004,0.004-0.018,0.014-0.021,0.018s-0.018,0.012-0.023,0.016c-1.423,1.076-2.674,1.734-2.749,1.771c0,0-6.146-3.576-6.866-7.363C2.837,8.178,2.811,7.942,2.811,7.7c0-1.917,1.554-3.47,3.469-3.47c1.302,0,2.836,0.736,3.431,1.794c0.577-1.121,2.161-1.794,3.509-1.794c1.914,0,3.469,1.553,3.469,3.47C16.688,10.249,14.474,12.495,12.544,13.966z"></path>
                        </svg>
                    </button>
                )
            }
                    {isInCart ? 
                        <button onClick = {() => deleteItemFromCartHandler(item)} className = "added-to-cart">
                                <svg className="svg-icon" viewBox="0 0 20 20">
                                    <path d="M10.219,1.688c-4.471,0-8.094,3.623-8.094,8.094s3.623,8.094,8.094,8.094s8.094-3.623,8.094-8.094S14.689,1.688,10.219,1.688 M10.219,17.022c-3.994,0-7.242-3.247-7.242-7.241c0-3.994,3.248-7.242,7.242-7.242c3.994,0,7.241,3.248,7.241,7.242C17.46,13.775,14.213,17.022,10.219,17.022 M15.099,7.03c-0.167-0.167-0.438-0.167-0.604,0.002L9.062,12.48l-2.269-2.277c-0.166-0.167-0.437-0.167-0.603,0c-0.166,0.166-0.168,0.437-0.002,0.603l2.573,2.578c0.079,0.08,0.188,0.125,0.3,0.125s0.222-0.045,0.303-0.125l5.736-5.751C15.268,7.466,15.265,7.196,15.099,7.03"></path>
                                </svg> 
                        </button>
                    :
                        // <button onClick = {() => addToCart(item)}>
                        <Link to = {`/products/${item._id}`}>
                            <svg className="svg-icon" viewBox="0 0 20 20">
                                <path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
                            </svg>
                        </Link>
                        // </button>
                    }
            </div>
        </div>
    )
}

export default Card





