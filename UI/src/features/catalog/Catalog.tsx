import { Product } from '../../app/layout/models/products';
import ProductList from './ProductList';
import { useEffect, useState } from 'react';

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(
    () => {
      fetch('http://localhost:5000/api/products')
        .then((response) => response.json())
        .then((data) => setProducts(data));
    },
    // This second parameter below (The empty array) is an array on dependencies
    // An Empty array will make it only run once
    //If you don't add this, it will rerender infinitely
    []
  );

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
