import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';

const App = props => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route exact path="/shipping" element={<ShippingScreen />}></Route>
            <Route exact path="/login" element={<LoginScreen />}></Route>
            <Route exact path="/register" element={<RegisterScreen />}></Route>
            <Route exact path="/products/:id" element={<ProductScreen />}></Route>
            <Route exact path="/cart/:id?" element={<CartScreen />}></Route>
            <Route exact path="/" element={<HomeScreen />}></Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App