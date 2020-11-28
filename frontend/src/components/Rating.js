import { makeStyles } from '@material-ui/core/styles'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarHalfIcon from '@material-ui/icons/StarHalf'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  rating: {
    // span: {
    //   margin: '0.1rem'
    // }
  }
}))

const Rating = ({ value, text, color }) => {
  const classes = useStyles()

  return (
    <div className={classes.rating}>
      <span>
        {value >= 1 ? (
          <StarIcon style={{ color }} />
        ) : value >= 0.5 ? (
          <StarHalfIcon style={{ color }} />
        ) : (
          <StarBorderIcon style={{ color }} />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <StarIcon style={{ color }} />
        ) : value >= 1.5 ? (
          <StarHalfIcon style={{ color }} />
        ) : (
          <StarBorderIcon style={{ color }} />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <StarIcon style={{ color }} />
        ) : value >= 2.5 ? (
          <StarHalfIcon style={{ color }} />
        ) : (
          <StarBorderIcon style={{ color }} />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <StarIcon style={{ color }} />
        ) : value >= 3.5 ? (
          <StarHalfIcon style={{ color }} />
        ) : (
          <StarBorderIcon style={{ color }} />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <StarIcon style={{ color }} />
        ) : value >= 4.5 ? (
          <StarHalfIcon style={{ color }} />
        ) : (
          <StarBorderIcon style={{ color }} />
        )}
      </span>
      <span>{text && <Typography variant='subtitle2'>{text}</Typography>}</span>
    </div>
  )
}

Rating.defaultProps = {
  color: '#f8e825'
}

export default Rating
