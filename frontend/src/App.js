import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles
} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import pink from '@material-ui/core/colors/pink'
import grey from '@material-ui/core/colors/grey'
import 'fontsource-roboto'
import HeaderBar from './components/HeaderBar'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProductScreen from './screens/ProductScreen'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: pink[500]
    },
    secondary: {
      main: grey[800]
    }
  }
})

const useStyles = makeStyles(theme => ({
  main: {
    minHeight: '100vh',
    padding: '4rem'
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
