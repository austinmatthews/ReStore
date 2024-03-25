import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import Header from './Header'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useStoreContext } from '../context/StoreContext'
import { getCookie } from '../util/util'
import agent from '../api/agent'
import LoadingComponent from './LoadingComponent'

function App() {
  const { setBasket } = useStoreContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const buyerId = getCookie('buyerId')
    if (buyerId)
      agent.Basket.getBasket()
        .then((basket) => setBasket(basket))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false))
  }, [setBasket])

  const [darkMode, setDarkMode] = useState(false)
  const palette = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: palette,
      background: {
        default: palette === 'light' ? '#eaeaea' : '#121212',
      },
    },
  })

  function onSwitch() {
    setDarkMode(!darkMode)
  }

  if (loading) return <LoadingComponent message="Loading App" />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header onSwitch={onSwitch} darkMode={darkMode} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}

export default App
