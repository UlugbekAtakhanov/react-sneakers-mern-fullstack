import React, { useEffect } from 'react'
import {useGlobalContext} from '../../context'
import Card from '../../components/Card/Card'
import Header from '../../components/Header/Header'
import Drawer from '../../components/Cart/Drawer'


const Favorites = ({history}) => {
    const {isCartOpen, allFavorites} = useGlobalContext()

    useEffect(() => {
        const token = localStorage.getItem("authToken")
        if (!token) {
            return history.push("/login")
        }
    }, [history])

    return (
        <>
            <Header history = {history} />
            {isCartOpen && <Drawer />}
            <div className="products-container">

                <div className="header-container">
                    <h3>my favorites</h3>
                </div>

                <div className="card-container">
                    {allFavorites.length ? allFavorites.map(favoriteItem => {  
                        const item = favoriteItem.product
                        return <Card item = {item} key = {favoriteItem._id} />               
                    })
                    :
                    <h4 className = "text-gray-600 whitespace-nowrap">there are no item in my favorites..</h4>
                }
                </div>

            </div>
        </>
    )
}

export default Favorites
