import agent from '../../app/api/agent'
import { Product } from '../../app/layout/models/products'
import ProductList from './ProductList'
import { useEffect, useState } from 'react'

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(
    () => {
      agent.Catalog.list().then((products) => setProducts(products))
    },
    // This second parameter below (The empty array) is an array on dependencies
    // An Empty array will make it only run once
    //If you don't add this, it will rerender infinitely
    []
  )

  return (
    <>
      <ProductList products={products} />
    </>
  )
}
