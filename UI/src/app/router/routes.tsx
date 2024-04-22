import { Navigate, createBrowserRouter } from 'react-router-dom'
import App from '../layout/App'
import HomePage from '../../features/home/HomePage'
import Catalog from '../../features/catalog/Catalog'
import ProductDetails from '../../features/catalog/ProductDetails'
import ContactPage from '../../features/contact/ContactPage'
import ServerError from '../errors/ServerError'
import NotFound from '../errors/NotFound'
import BasketPage from '../../features/basket/BasketPage'
import CheckoutPage from '../../features/checkout/CheckoutPage'
import LoginPage from '../../features/account/LoginPage'
import AboutPage from '../../features/about/AboutPage'
import Register from '../../features/account/Register'
import RequireAuth from './RequireAuth'
import Orders from '../../features/orders/Orders'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: 'checkout', element: <CheckoutPage /> },
          { path: 'orders', element: <Orders /> },
        ],
      },
      { path: '', element: <HomePage /> },
      { path: 'catalog', element: <Catalog /> },
      { path: 'catalog/:id', element: <ProductDetails /> },
      { path: 'basket', element: <BasketPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <Register /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'server-error', element: <ServerError /> },
      { path: 'not-found', element: <NotFound /> },
      { path: '*', element: <Navigate replace to="/not-found" /> },
    ],
  },
])
