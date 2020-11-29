import { Chip, Typography, makeStyles } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import PaymentIcon from '@material-ui/icons/Payment'
import ReceiptIcon from '@material-ui/icons/Receipt'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: '3rem'
  }
}))

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <div className={classes.root}>
      <div>
        {step1 ? (
          <Chip
            label='Sign In'
            color='primary'
            clickable
            onClick={() => history.push('/login')}
            icon={<LockIcon />}
            size='medium'
          />
        ) : (
          <Chip label='Sign In' size='medium' icon={<LockIcon />} />
        )}
      </div>
      <div>
        {step2 ? (
          <Chip
            label='Shipping'
            color='primary'
            clickable
            onClick={() => history.push('/shipping')}
            icon={<LocalShippingIcon />}
            size='medium'
          />
        ) : (
          <Chip label='Shipping' icon={<LocalShippingIcon />} size='medium' />
        )}
      </div>
      <div>
        {step3 ? (
          <Chip
            label='Payment'
            color='primary'
            clickable
            onClick={() => history.push('/payment')}
            icon={<PaymentIcon />}
            size='medium'
          />
        ) : (
          <Chip label='Payment' icon={<PaymentIcon />} size='medium' />
        )}
      </div>
      <div>
        {step4 ? (
          <Chip
            label='Place Order'
            color='primary'
            clickable
            onClick={() => history.push('/placeorder')}
            icon={<ReceiptIcon />}
            size='medium'
          />
        ) : (
          <Chip label='Place Order' icon={<ReceiptIcon />} size='medium' />
        )}
      </div>
    </div>
  )
}

export default CheckoutSteps
