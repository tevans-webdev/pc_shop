import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useState } from 'react'

const Loader = () => {
  const [open, setOpen] = useState(true)

  return (
    <Backdrop open={open} onClick={() => setOpen(false)}>
      <CircularProgress />
    </Backdrop>
  )
}

export default Loader
