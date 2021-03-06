import {
  makeStyles,
  FormControl,
  OutlinedInput,
  InputLabel,
  Button,
  Typography,
  Snackbar
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, Link } from 'react-router-dom'
import { register } from '../actions/userActions'
import Loader from '../components/Loader'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 40,
    width: 600,
    backgroundColor: '#f4f4f4',
    boxShadow: '0 1rem 2rem rgba(0, 0, 0, 0.2)'
  }
}))

const RegisterScreen = () => {
  const classes = useStyles()

  const [open, setOpen] = useState(true)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const history = useHistory()
  const location = useLocation()
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const dispatch = useDispatch()
  const userRegister = useSelector(state => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const submitHandler = e => {
    e.preventDefault()
    if (password !== confirm) {
      console.log('passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  const handleClose = (e, r) => {
    if (r === 'clickaway') return
    setOpen(false)
  }

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [userInfo, history, redirect])

  return (
    <div className={classes.root}>
      <Typography variant='h3' style={{ marginBottom: 20 }}>
        Account Registration
      </Typography>
      {loading && <Loader loading={loading} />}
      {error && (
        <Snackbar
          open={open}
          onClose={handleClose}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity='error' onClose={handleClose}>
            {error}
          </Alert>
        </Snackbar>
      )}
      <form className={classes.form} onSubmit={submitHandler}>
        <FormControl variant='outlined' style={{ margin: 20 }}>
          <InputLabel htmlFor='name'>Name</InputLabel>
          <OutlinedInput
            id='name'
            label='Name'
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormControl>
        <FormControl variant='outlined' style={{ margin: 20 }}>
          <InputLabel htmlFor='email'>Email</InputLabel>
          <OutlinedInput
            id='email'
            label='Email'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl variant='outlined' style={{ margin: 20 }}>
          <InputLabel htmlFor='password'>Password</InputLabel>
          <OutlinedInput
            id='password'
            label='Password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl variant='outlined' style={{ margin: 20 }}>
          <InputLabel htmlFor='confirm'>Confirm Password</InputLabel>
          <OutlinedInput
            id='confirm'
            label='Confirm Password'
            type='password'
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
          />
        </FormControl>
        <Button type='submit' variant='contained' style={{ marginTop: 20 }}>
          Sign Up
        </Button>
        <Link
          to={redirect ? `/login?redirect=${redirect}` : '/login'}
          style={{
            color: '#333',
            textDecoration: 'none',
            marginTop: 20,
            display: 'inline-block'
          }}
        >
          <Typography variant='caption'>login</Typography>
        </Link>
      </form>
    </div>
  )
}

export default RegisterScreen
