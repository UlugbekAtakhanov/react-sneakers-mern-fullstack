import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Pages
import Products from './pages/Products';
import Favorites from './pages/Favorites/Favorites';
import Register from './pages/Register';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import SingleProduct from './pages/SingleProduct/SingleProduct';


function App({history}) {

  return (
    <div className="App">

      <Routes>
        <Route path = "/register" element = {<Register />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/" element = {<HomePage />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
        

    </div>
  );
}

export default App;
