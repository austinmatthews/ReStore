import { useState, useEffect } from 'react'

function App() {
  const [products, setProducts] = useState([
    { name: 'product 1', price: 100.0 },
    { name: 'product 2', price: 200.0 },
  ])

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
        name: 'product ' + (prevState.length + 1),
        price: 100.0 * (prevState.length + 1),
      },
    ])
  }

  return (
    <div className="app">
      <h1>ReStore</h1>
      <ul>
        {products.map((item, index) => (
          <li key={index}>
            {item.name} - {item.price}
          </li>
        ))}
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </div>
  )
}

export default App
