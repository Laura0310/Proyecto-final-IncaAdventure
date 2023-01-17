import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const Notification = ({open, setOpen, message, duration, style, sev}) => {
  return (
    <Snackbar
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    open={open}
    autoHideDuration={duration || 3000}
    onClose={() => { setOpen(false) }}
    className={`${ style || "mt-5"}`}
>
    <Alert severity={ sev ||"success"} sx={{ width: '100%' }}>
        {message}
    </Alert>
</Snackbar>

  )
}
