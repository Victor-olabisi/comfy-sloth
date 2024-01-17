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

const getItemFromLocalStorage = (name) => {
  let item = localStorage.getItem(name) 
  if (item) return item
  else {
    item = 'all'
  }
  
}

const initialState = {
  all_products: [],
  filter_products: [],
  grid_view: false,
  sort: 'price lowest',
  filter: {
    company: 'all',
    text:'',
    category: getItemFromLocalStorage('category'),
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
    dispatch({ type: LOAD_PRODUCTS, payload: products })
    console.log(products);
  }, [products])
  
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS,payload:products});
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filter]);
  
  
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
    if (name === 'color') {
      value = e.target.dataset.color
    }
    if (name === 'price') {
      value=Number(value)
    }
    if (name == 'shipping') {
      value=e.target.checked
    }
    dispatch({type:UPDATE_FILTERS,payload:{name,value}})
  }

  // reset all filter to default value
  function clearFilter() {
    dispatch({type:CLEAR_FILTERS})
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
