import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles
} from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import { grey, lightGreen } from '@material-ui/core/colors'
import 'fontsource-roboto'
import HeaderBar from './components/HeaderBar'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: lightGreen['A700']
    },
    secondary: {
      main: grey[800]
    },
    shit: {
      main: '#fff'
    }
  }
})

const useStyles = makeStyles(theme => ({
  main: {
    minHeight: '80vh',
    padding: '4rem',
    paddingBottom: '5rem',
    backgroundColor: '#777'
  }
}))

const App = () => {
  const classes = useStyles()

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div style={{ backgroundColor: '#f9f9f9', color: '#333' }}>
          <HeaderBar />
          <main className={classes.main}>
            <Container maxWidth='lg'>
              <Switch>
                <Route exact path='/'>
                  <HomeScreen />
                </Route>
                <Route path='/login'>
                  <LoginScreen />
                </Route>
                <Route path='/register'>
                  <RegisterScreen />
                </Route>
                <Route path='/products/:id'>
                  <ProductScreen />
                </Route>
                <Route path='/cart/:id?'>
                  <CartScreen />
                </Route>
                <Route path='/shipping'>
                  <ShippingScreen />
                </Route>
                <Route path='/payment'>
                  <PaymentScreen />
                </Route>
                <Route path='/placeorder'>
                  <PlaceOrderScreen />
                </Route>
              </Switch>
            </Container>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
