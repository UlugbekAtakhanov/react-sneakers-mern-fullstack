import React, {useEffect, useState} from 'react'
import { useGlobalContext } from '../../context'
import axios from 'axios'
import "./Drawer.scss"

const url = "http://localhost:5000/api/v1"

const Drawer = ({history}) => {
    const {dispatch, cart, cartTotal, setCartTotal, errorCartProducts, setIsCartOpen, setItemFromCartId} = useGlobalContext()

    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            return history.push("/login")
        }
    }, [history, dispatch])
    
    console.log(cart);

    useEffect(() => {
        if (!errorCartProducts && cart.choosedProducts.length > 0) {
            const sum = cart.choosedProducts.reduce((total, current) => {
                total += Number(current.totalPrice)
                return total
            }, 0)
            setCartTotal(sum)
        }
    }, [cart.choosedProducts, setCartTotal, errorCartProducts])

    const deleteItemFromCartHandler = async (product) => {
        console.log(product);
        const token = localStorage.getItem("authToken")
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const {data} = await axios.delete(url + `/cart/${product._id}`, config)
            // console.log(data);
                setCartTotal(prev => prev - product.totalPrice)
            //     setItemFromCartId(product._id)    // IT IS VERY IMPORTANT WHERE TO PUT FUNCTIONS !!!!!!!!!!!!!!!
            dispatch({type: "GET_CART", data})
        } catch (error) {
            console.log(error.response);
        }
    }
    

    return (
        <div className="overlay">
            <div className="cart">
                <div className="cart-header">
                    <h3>cart</h3>
                    <button onClick = {() => setIsCartOpen(false)}>x</button>
                </div>

                <div className="cart-block">
                    {errorCartProducts || cart.choosedProducts.length < 1 ? <p>There is no product in the cart..</p> 
                    :
                    cart.choosedProducts && cart.choosedProducts.map((item) => {
                        console.log(item);
                        const {company, img, name, price} = item.productId

                        return (
                            <div className="cart-item border border-red-500" key = {item._id}>
                                <img src={img} alt="" />
                                <div className=''>
                                    <p>{name}</p>
                                    <p>{company}</p>
                                    <p><b>${price}</b></p>
                                    {item.attributes.map(item => {
                                        // console.log(item);
                                        if (item.name === "color") {
                                            return <p className='mr-4 flex items-center gap-2' key = {item._id}>{item.name}: <span className="block w-4 h-4 rounded-full" style={{background:`${item.value}`}}></span></p>
                                        }
                                        return (
                                            <p className='mr-4' key = {item._id}>{item.name}: {item.value}</p>
                                        )
                                    })}
                                    <p>qnt: {item.qnt}</p>
                                    <p>total: {item.totalPrice}</p>
                                </div>
                                <button onClick = {() => deleteItemFromCartHandler(item)}>x</button>
                            </div>
                        )
                    })}
                </div>



                <div className="cart-footer">
                    <ul>
                        <li>
                            <span>Total :</span>
                            <div></div>
                            <span>${cartTotal}</span>
                        </li>
                        <li>
                            <span>Tax 0%:</span>
                            <div></div>
                            <span>${0}</span>
                        </li>
                    </ul>
                    <button>buy<svg className="svg-icon" viewBox="0 0 20 20">
                        <path fill="none" d="M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0
              l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109
              c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483
              c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788
              S1.293,9.212,1.729,9.212z"></path>
                    </svg></button>
                </div>

            </div>
        </div>
    )
}

export default Drawer
