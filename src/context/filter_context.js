import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  all_products: [],
  filter_products: [],
  grid_view: false,
  sort: 'price lowest',
  filter: {
    company: 'all',
    text:'',
    category: 'all',
    minPrice: 0,
    price: 0,
    maxPrice: 0,
    shipping: false,
    color:'all'
  }
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {


  const [state, dispatch] = useReducer(reducer, initialState)
  const { products } = useProductsContext()
  // set gridView function 
  function setGridView() {
    dispatch({type:SET_GRIDVIEW})
  }
  function setListView() {
    dispatch({type:SET_LISTVIEW})
  }
  useEffect(() => {
    dispatch({type:LOAD_PRODUCTS,payload:products})
  }, [products])

  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort]);
  
  // change state sort when the select input change
  function setSort(e) {
    const name = e.target.name
    const value = e.target.value
    // console.log(value);


   dispatch({type:UPDATE_SORT, payload:value})
    
  }

  // update filter the moment it changes 
  function updateFilter(e) {
    let name = e.target.name
    let value = e.target.value
    if (name === 'category') {
      value= e.target.textContent
    }
    dispatch({type:UPDATE_FILTERS,payload:{name,value}})
  }

  // reset all filter to default value
  function clearFilter() {
    
  }
  
  return (
    <FilterContext.Provider value={{...state, setGridView, setListView, setSort, updateFilter, clearFilter}}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
