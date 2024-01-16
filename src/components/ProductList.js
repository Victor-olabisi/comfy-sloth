import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const { filter_products: products,grid_view} = useFilterContext();
  if (products < 1) {
    return <h5 >no product matches your search</h5>
  }
  if (!grid_view) {
    return <ListView products={products} />
  }
  return <GridView products={products}></GridView>
}

export default ProductList
