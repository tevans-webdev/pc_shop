import { Chip, makeStyles } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import PaymentIcon from '@material-ui/icons/Payment'
import ReceiptIcon from '@material-ui/icons/Receipt'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: '3rem'
  },
  stepComplete: {
    padding: 20,
    borderBottom: '2px solid #64dd17'
  },
  stepIncomplete: {
    padding: 20,
    borderBottom: '2px solid #999'
  }
}))

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <div className={classes.root}>
      <div className={step1 ? classes.stepComplete : classes.stepIncomplete}>
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
      <div className={step2 ? classes.stepComplete : classes.stepIncomplete}>
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
      <div className={step3 ? classes.stepComplete : classes.stepIncomplete}>
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
      <div className={step4 ? classes.stepComplete : classes.stepIncomplete}>
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
