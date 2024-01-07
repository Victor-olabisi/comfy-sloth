import React from 'react'
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, AboutPage, CheckoutPage, CartPage,ErrorPage,ProductsPage,SingleProductPage } from './pages'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<SingleProductPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App
