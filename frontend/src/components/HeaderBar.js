import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ComputerIcon from '@material-ui/icons/Computer'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import AccountIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  menuButton: {
    marginRight: 2
  },
  title: {
    flexGrow: 1
  },
  btn: {
    color: '#fff'
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    padding: 10
  }
}))

const HeaderBar = () => {
  const classes = useStyles()
  const [anchor, setAnchor] = useState(null)

  const handleClick = e => setAnchor(e.currentTarget)

  const handleClose = () => setAnchor(null)

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  return (
    <div className={classes.root}>
      <AppBar position='static' color='secondary'>
        <ToolBar variant='regular'>
          <ComputerIcon style={{ marginRight: 10 }} />
          <Typography variant='h6' className={classes.title}>
            PCShop
          </Typography>
          <Link to='/cart' className={classes.link}>
            <Typography variant='h6'>Cart</Typography>
          </Link>
          {userInfo ? (
            <div>
              <Button
                aria-controls='user-menu'
                aria-haspopup='true'
                onClick={handleClick}
                color='inherit'
              >
                {userInfo.name}
              </Button>
              <Menu
                id='user-menu'
                anchorEl={anchor}
                keepMounted
                open={Boolean(anchor)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <AccountIcon />
                  </ListItemIcon>
                  <Typography variant='inherit'>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <ShoppingCartIcon />
                  </ListItemIcon>
                  <Typography variant='inherit'>Cart</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setAnchor(null)
                    dispatch(logout())
                  }}
                >
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <Typography variant='inherit'>Logout</Typography>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Link to='/login' className={classes.link}>
              <Typography variant='h6'>Login</Typography>
            </Link>
          )}
        </ToolBar>
      </AppBar>
    </div>
  )
}

export default HeaderBar
