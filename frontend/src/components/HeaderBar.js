import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  makeStyles
} from '@material-ui/core'
import ComputerIcon from '@material-ui/icons/Computer'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import AccountIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
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
    padding: 10,
    margin: '0 20px'
  }
}))

const HeaderBar = () => {
  const classes = useStyles()
  const [anchor, setAnchor] = useState(null)
  const history = useHistory()

  const handleClick = e => setAnchor(e.currentTarget)

  const handleClose = () => setAnchor(null)

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  return (
    <div className={classes.root}>
      <AppBar position='static' color='secondary'>
        <Toolbar variant='regular'>
          <ComputerIcon style={{ margin: '0 20px' }} />

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
                color='primary'
                variant='contained'
                style={{ marginRight: 20 }}
              >
                <Typography variant='caption' style={{ color: '#fff' }}>
                  {userInfo.name.split(' ')[0]}
                </Typography>
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
                    history.push('/')
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
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default HeaderBar
