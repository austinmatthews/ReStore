import agent from '../../app/api/agent'
import LoadingComponent from '../../app/layout/LoadingComponent'
import { Product } from '../../app/layout/models/products'
import ProductList from './ProductList'
import { useEffect, useState } from 'react'

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(
    () => {
      agent.Catalog.list()
        .then((products) => setProducts(products))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false))
    },
    // This second parameter below (The empty array) is an array on dependencies
    // An Empty array will make it only run once
    //If you don't add this, it will rerender infinitely
    [],
  )

  if (loading) return <LoadingComponent message="Loading Products..." />

  return (
    <>
      <ProductList products={products} />
    </>
  )
}
