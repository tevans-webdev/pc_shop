import { useState } from 'react'
import { Container, TextField, Button, makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

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

const ShippingScreen = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const submitHandler = e => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }

  return (
    <Container maxWidth='xl'>
      <CheckoutSteps step1 step2 />
      <form className={classes.form} onSubmit={submitHandler}>
        <TextField
          label='Address'
          className={classes.input}
          id='address'
          type='text'
          fullWidth
          variant='filled'
          placeholder='Enter Address'
          value={address}
          onChange={e => setAddress(e.target.value)}
          required
        />
        <TextField
          label='City'
          className={classes.input}
          id='city'
          type='text'
          fullWidth
          variant='filled'
          placeholder='Enter City'
          value={city}
          onChange={e => setCity(e.target.value)}
          required
        />
        <TextField
          label='Postal Code'
          className={classes.input}
          id='postalCode'
          type='text'
          fullWidth
          variant='filled'
          placeholder='Enter Postal Code'
          value={postalCode}
          onChange={e => setPostalCode(e.target.value)}
          required
        />
        <TextField
          label='Country'
          className={classes.input}
          id='country'
          type='text'
          fullWidth
          variant='filled'
          placeholder='Enter Country'
          value={country}
          onChange={e => setCountry(e.target.value)}
          required
        />
        <Button
          variant='contained'
          color='primary'
          style={{ marginTop: '2rem', width: 400 }}
          size='large'
          type='submit'
        >
          Continue
        </Button>
      </form>
    </Container>
  )
}

export default ShippingScreen
