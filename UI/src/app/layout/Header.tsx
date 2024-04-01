import { ShoppingCart } from '@mui/icons-material'
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material'
import { Link, NavLink } from 'react-router-dom'
import { useAppSelector } from '../store/configureStore'

const midLinks = [
  { title: 'catalog', path: '/catalog' },
  { title: 'about', path: '/about' },
  { title: 'contact', path: '/contact' },
]

const rightLinks = [
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' },
]

const navStyles = {
  color: 'inherit',
  typography: 'h6',
  textDecoration: 'none',
  '&:hover': { color: 'grey.500' },
  '&.active': { color: 'text.secondary' },
}

interface Props {
  darkMode: boolean
  onSwitch: () => void
}

export default function Header({ darkMode, onSwitch }: Props) {
  const { basket } = useAppSelector((state) => state.basket)

  const itemCount = basket?.items.reduce((sum, item) => {
    return sum + item.quantity
  }, 0)

  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar
          sx={{
            display: 'flex',
          }}
        >
          <Box display="flex" flexGrow="1" flexBasis="0" alignItems="center">
            <Typography variant="h6" component={NavLink} to="/" sx={navStyles}>
              ReStore
            </Typography>
            <Switch checked={darkMode} onChange={onSwitch} />
          </Box>

          <List
            sx={{
              display: 'flex',
              flexBasis: '0',
              justifyContent: 'center',
            }}
          >
            {midLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>

          <Box display="flex" flexGrow="1" flexBasis="0" justifyContent="end">
            <IconButton
              component={Link}
              to="/basket"
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <List sx={{ display: 'flex' }}>
              {rightLinks.map(({ title, path }) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}
