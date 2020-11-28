import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Product from '../components/Product'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { useEffect } from 'react'
import Snackbar from '@material-ui/core/Snackbar'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}))

const HomeScreen = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <Fragment>
      <Typography variant='h3' style={{ marginBottom: 20 }}>
        Latest Products
      </Typography>
      {loading ? (
        <Typography variant='h4'>Loading...</Typography>
      ) : error ? (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          message={error}
        />
      ) : (
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify='center' spacing={2}>
              {products.map(product => (
                <Grid item key={product._id}>
                  <Product product={product} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Fragment>
  )
}

export default HomeScreen
