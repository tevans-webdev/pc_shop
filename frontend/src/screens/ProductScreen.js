import { useEffect, useState, Fragment } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar'
import Divider from '@material-ui/core/Divider'
import Container from '@material-ui/core/Container'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import TextareaAutoSize from '@material-ui/core/TextareaAutosize'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '10px',
    width: '100%'
  }
}))

const ProductScreen = () => {
  const classes = useStyles()
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const handleSubmit = e => {
    e.preventDefault()
    console.log('create review')
  }

  const addToCartHandler = () => history.push(`/cart/${id}?qty=${qty}`)

  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [id, dispatch])

  return (
    <Container maxWidth='xl'>
      {loading ? (
        <Loader />
      ) : error ? (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          message={error}
        />
      ) : (
        <Fragment>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '500px' }}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Typography variant='h4' style={{ marginBottom: 20 }}>
                {product.name}
              </Typography>
              <Divider />
              <br />
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
              <br />
              <Divider />
              <Typography variant='subtitle1' style={{ marginTop: 20 }}>
                {product.description}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={3}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant='h6'>
                        <strong>Price:</strong> ${product.price}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant='h6'>
                        <strong>Status: </strong>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  {product.countInStock > 0 && (
                    <TableRow>
                      <TableCell>
                        <TextField
                          id='qty'
                          select
                          label='Qty'
                          value={qty}
                          onChange={e => setQty(e.target.value)}
                          helperText='Please select the quantity'
                        >
                          {[...Array(product.countInStock).keys()].map(x => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </TextField>
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell>
                      <Button
                        variant='contained'
                        color='secondary'
                        onClick={addToCartHandler}
                        disabled={product.countInStock === 0}
                      >
                        Add To Cart
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item lg={12}>
              <Typography variant='h4' style={{ margin: '10px 0' }}>
                Reviews
              </Typography>
              <form className={classes.form} onSubmit={handleSubmit}>
                <Typography variant='h5' style={{ margin: '10px 0' }}>
                  Write a review
                </Typography>
                <TextField
                  type='number'
                  label='Rating'
                  style={{ margin: '15px 0', width: '30%' }}
                  value={rating}
                  onChange={e => setRating(e.target.value)}
                />
                <TextareaAutoSize
                  rowsMin={3}
                  placeholder='Write review'
                  style={{ margin: '15px 0', width: '40%', padding: 20 }}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                />
                <Button type='submit' variant='contained' color='secondary'>
                  Post
                </Button>
              </form>
            </Grid>
          </Grid>
        </Fragment>
      )}
    </Container>
  )
}

export default ProductScreen
