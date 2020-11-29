import {
  makeStyles,
  FormControl,
  OutlinedInput,
  InputLabel,
  Button,
  Typography,
  Snackbar
} from '@material-ui/core'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, Link } from 'react-router-dom'
import { login } from '../actions/userActions'
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

const LoginScreen = () => {
  const classes = useStyles()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()
  const location = useLocation()
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const submitHandler = e => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [userInfo, history, redirect])

  return (
    <div className={classes.root}>
      <Typography variant='h3' style={{ marginBottom: 20 }}>
        Account Login
      </Typography>
      {loading && <Loader loading={loading} />}
      {error && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          message={error}
        />
      )}
      <form className={classes.form} onSubmit={submitHandler}>
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
        <FormControl variant='outlined'>
          <InputLabel htmlFor='password'>Password</InputLabel>
          <OutlinedInput
            id='password'
            label='Password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormControl>
        <Button
          type='submit'
          variant='contained'
          style={{ marginTop: 20, display: 'inline-block' }}
        >
          Login
        </Button>
        <Link
          to={redirect ? `/register?redirect=${redirect}` : '/register'}
          style={{
            color: '#333',
            textDecoration: 'none',
            marginTop: 20,
            display: 'inline-block'
          }}
        >
          <Typography variant='caption'>register</Typography>
        </Link>
      </form>
    </div>
  )
}

export default LoginScreen
