import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    padding: 10
  },
  media: {
    height: 0,
    paddingTop: '52.6%',
    paddingBottom: 30
  },
  rating: {
    marginLeft: 'auto'
  }
}))

const Product = ({ product }) => {
  const classes = useStyles()

  return (
    <Card variant='elevation' className={classes.root}>
      <Link
        to={`/products/${product._id}`}
        style={{ color: '#333', textDecoration: 'none' }}
      >
        <CardHeader title={product.name} />
      </Link>
      <Link to={`/products/${product._id}`}>
        <CardMedia
          className={classes.media}
          image={product.image}
          title={product.name}
        />
      </Link>
      <CardContent>
        <Grid container>
          <Grid item>
            <Typography
              variant='h5'
              component='p'
              align='right'
              display='inline'
            >
              ${product.price}
            </Typography>
          </Grid>
          <Grid item className={classes.rating}>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Product
