import { Button, Fade, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/configureStore'
import { signOut } from '../../features/account/accountSlice'
import { clearBasket } from '../../features/basket/basketSlice'
import { Link } from 'react-router-dom'

export default function LoggedInMenu() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.account)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button onClick={handleClick} color="inherit" sx={{ typography: 'h6' }}>
        {user?.email}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem component={Link} to="/orders">
          My orders
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(signOut())
            dispatch(clearBasket())
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}
