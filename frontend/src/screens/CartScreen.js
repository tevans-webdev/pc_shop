import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory, useParams } from 'react-router-dom'
import { addItemToCart, removeFromCart } from '../actions/cartActions'
import {
  TextField,
  Typography,
  Grid,
  Container,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Button,
  MenuItem,
  makeStyles
} from '@material-ui/core'
import red from '@material-ui/core/colors/red'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const useStyles = makeStyles(theme => ({
  inline: {
    display: 'inline'
  },
  trash: {
    color: red[400]
  },
  image: {
    width: '100px'
  }
}))

const CartScreen = () => {
  const classes = useStyles()
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const location = useLocation()
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (id) {
      dispatch(addItemToCart(id, qty))
    }
  }, [dispatch, id, qty])

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => history.push('/')}
            style={{ marginBottom: 15 }}
          >
            Go Back
          </Button>
          <Typography
            variant='h4'
            style={{ margin: '20px 0', display: 'block', color: '#fff' }}
          >
            <ShoppingCartIcon /> Shopping Cart
          </Typography>
          <Table>
            <TableBody>
              {cartItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img
                      alt={item.name}
                      src={item.image}
                      className={classes.image}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant='h6'
                      component='span'
                      style={{ color: '#fff' }}
                    >
                      {item.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      select
                      id='qty'
                      label='Qty'
                      value={item.qty}
                      onChange={e =>
                        dispatch(
                          addItemToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map(x => (
                        <MenuItem key={x + 1} value={x + 1}>
                          {x + 1}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant='contained'
                      color='secondary'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <DeleteForeverIcon className={classes.trash} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant='h3' style={{ color: '#fff' }}>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                  </Typography>
                  <Typography
                    variant='body1'
                    component='h5'
                    style={{ color: '#fff' }}
                  >
                    ${' '}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Button
                    variant='contained'
                    onClick={checkoutHandler}
                    size='large'
                    color='primary'
                  >
                    Proceed To Checkout
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Container>
  )
}

export default CartScreen
