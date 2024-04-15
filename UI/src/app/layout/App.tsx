import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import Header from './Header'
import { useCallback, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoadingComponent from './LoadingComponent'
import { useAppDispatch, useAppSelector } from '../store/configureStore'
import { fetchBasketAsync } from '../../features/basket/basketSlice'
import { setTheme } from '../../features/theme/themeSlice'
import { fetchCurrentUser } from '../../features/account/accountSlice'

function App() {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  const initApp = useCallback(async () => {
    try {
      dispatch(setTheme(localStorage.getItem('darkMode') === 'true' ? true : false))
      await dispatch(fetchCurrentUser())
      await dispatch(fetchBasketAsync())
    } catch (error: any) {
      console.log(error)
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false))
  }, [initApp])

  const { darkMode } = useAppSelector((state) => state.theme)
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
    dispatch(setTheme(!darkMode))
    const setDarkMode = !darkMode
    localStorage.setItem('darkMode', setDarkMode.toString())
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
