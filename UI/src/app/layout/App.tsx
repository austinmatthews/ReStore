import { useState, useEffect } from 'react'
import { Product } from './models/products'

function App() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(
    () => {
      fetch('http://localhost:5000/api/products')
        .then((response) => response.json())
        .then((data) => setProducts(data))
    },
    // This second parameter below (The empty array) is an array on dependencies
    // An Empty array will make it only run once
    //If you don't add this, it will rerender infinitely
    []
  )

  function addProduct() {
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length++,
        name: 'product ' + prevState.length++,
        price: 100.0 * prevState.length++,
        brand: 'Some Brand',
        description: 'Some Description',
        pictureUrl: 'http://picsum.photos/200',
      },
    ])
  }

  return (
    <div>
      <h1>ReStore</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </div>
  )
}

export default App
