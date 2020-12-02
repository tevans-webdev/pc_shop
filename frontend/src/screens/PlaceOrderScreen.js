import {
  Button,
  Grid,
  Container,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Typography
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const { shippingAddress, cartItems } = cart

  const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2)

  cart.itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number(0.06 * cart.itemsPrice).toFixed(2))
  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) +
      Number(cart.shippingPrice) +
      Number(cart.taxPrice).toFixed(2)
  )

  dispatch(
    createOrder({
      orderItems: cartItems,
      shippingAddress: shippingAddress,
      paymentMehtod: cart.paymentMehtod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice
    })
  )

  return (
    <Container maxWidth='xl'>
      <CheckoutSteps step1 step2 step3 />
      <Button
        variant='contained'
        color='secondary'
        onClick={() => history.push('/payment')}
        style={{ marginBottom: 15 }}
      >
        Go Back
      </Button>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant='h5'>Shipping</Typography>
                  <Typography component='p'>Address: </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant='h5'>Payment</Typography>
                  <Typography component='p'>Method: </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <Typography variant='h5'>Order Items</Typography>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Order 1</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Table>
            <TableBody>
              <TableRow>
                <Typography variant='h5'>Order Summary</Typography>
              </TableRow>
              <TableRow>
                <TableCell>Items</TableCell>
                <TableCell>$</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Shipping</TableCell>
                <TableCell>$</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell>$</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>$</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => console.log('shit')}
                  >
                    Place Order
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

export default PlaceOrderScreen
