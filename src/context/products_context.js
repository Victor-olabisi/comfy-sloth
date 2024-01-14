import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSidebarOpen: false,
  product_loading: false,
  product_error: false,
  featuredProduct:[],
  products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: [],
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  const showSidebar = () => {
  dispatch({type:SIDEBAR_OPEN})
  }
  function closeSidebar() {
    dispatch({type:SIDEBAR_CLOSE})
  }

  // get all products from api
  async function fetchProduct(url) { 
    try {
      dispatch({type:GET_PRODUCTS_BEGIN})
      const response = await axios.get(url)
      const products = response.data
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
   } catch (error) {
      console.log(error);
      dispatch({type:GET_PRODUCTS_ERROR})
     return error
    }
    
  }

  // get single product from api passing the id as query params
  async function fetchSingleProduct(url) {

    try {
      dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
      const response =await axios.get(url)
      const product = response.data
      // console.log();
      dispatch({type:GET_SINGLE_PRODUCT_SUCCESS,payload:product})
    } catch (error) {
      dispatch({type:GET_SINGLE_PRODUCT_ERROR})
console.log(error);
      return error
    }
  }

  // fetch all product on initial render 
  useEffect(() => {
  fetchProduct(url)
  }, [])
  
  return (
    <ProductsContext.Provider value={{ ...state, showSidebar, closeSidebar,fetchSingleProduct}}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
