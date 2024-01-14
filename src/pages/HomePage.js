import React from 'react'
import { FeaturedProducts, Hero, Services, Contact } from '../components'
import { useProductsContext } from '../context/products_context'
const HomePage = () => {
//   const {product_loading}=useProductsContext()
//   if (product_loading) {
//     return <main className='page'>
//     <div className="loading"></div>
//   </main>
// }
  return <main>
    <Hero />
    <FeaturedProducts />
    ,<Services />
    <Contact/>
  </main>
}

export default HomePage

