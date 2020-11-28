import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    backgroundColor: '#333',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 30px'
  },
  copyright: {
    fontSize: 12,
    textAlign: 'center'
  }
})

const Footer = () => {
  const classes = useStyles()

  return (
    <footer className={classes.root}>
      <Typography variant='h5' className={classes.copyright}>
        Copyright &copy; 2020
      </Typography>
    </footer>
  )
}

export default Footer
