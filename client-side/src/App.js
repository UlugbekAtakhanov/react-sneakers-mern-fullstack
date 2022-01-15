import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {useSelector} from "react-redux"

// Pages
import Products from './pages/Products';
import Favorites from './pages/Favorites/Favorites';
import Register from './pages/Register';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import SingleProduct from './pages/SingleProduct/SingleProduct';
import Drawer from './components/Cart/Drawer';


function App() {

  const {isCartOpen} = useSelector(state => state.isCartOpen)

  return (
    <div className="App">
      {isCartOpen && <Drawer />}
      <Routes>
        <Route path = "/register" element = {<Register />} />
        <Route path = "/login" element = {<Login />} />
        {/* <Route path = "/" element = {<HomePage />} /> */}
        <Route exact path="/products" element={<Products />} />
        {/* <Route path="/products/:id" element={<SingleProduct />} /> */}
        {/* <Route path="/favorites" element={<Favorites />} /> */}
      </Routes>
        

    </div>
  );
}

export default App;
