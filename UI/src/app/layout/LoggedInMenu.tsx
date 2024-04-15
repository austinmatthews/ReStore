import { Button, Fade, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/configureStore'
import { signOut } from '../../features/account/accountSlice'

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
        <MenuItem onClick={handleClose}>My orders</MenuItem>
        <MenuItem onClick={() => dispatch(signOut())}>Logout</MenuItem>
      </Menu>
    </>
  )
}
