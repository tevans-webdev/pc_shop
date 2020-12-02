import { useState, useEffect } from 'react'
import {
  Container,
  makeStyles,
  FormControl,
  FormControlLabel,
  FormLabel,
  Button,
  Typography,
  RadioGroup,
  Radio
} from '@material-ui/core'
import CheckoutSteps from '../components/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { savePaymentMethod } from '../actions/cartActions'

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem'
  },
  input: {
    margin: '1rem'
  }
}))

const PaymentScreen = () => {
  const classes = useStyles()
  const [paymentMethod, setPaymentMethod] = useState('paypal')

  const history = useHistory()

  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const submitHandler = e => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  useEffect(() => {
    if (!shippingAddress) {
      history.push('/shipping')
    }
  }, [history, shippingAddress])

  return (
    <Container maxWidth='xl'>
      <CheckoutSteps step1 step2 step3 />
      <Typography variant='h4' style={{ textAlign: 'center' }}>
        Payment
      </Typography>
      <form className={classes.form} onSubmit={submitHandler}>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Select Payment Method</FormLabel>
          <RadioGroup
            value={paymentMethod}
            onChange={e => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel
              value='paypal'
              control={<Radio />}
              label='Paypal or credit card'
            />
            <FormControlLabel
              value='stripe'
              control={<Radio />}
              label='Stripe'
            />
          </RadioGroup>
        </FormControl>
        <Button
          type='submit'
          variant='contained'
          style={{ marginTop: '3rem', width: 400 }}
          size='large'
          color='primary'
        >
          Continue
        </Button>
      </form>
    </Container>
  )
}

export default PaymentScreen
