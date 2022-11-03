import { Alert, Snackbar } from '@mui/material'
import React from 'react'

export default function Notification({ severity, content, open, onClose }) {
  
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'right'}} >
      <Alert severity={severity} color='secondary' onClose={onClose} sx={{ width: '100%'}} >{content}</Alert>
    </Snackbar>
  )
}
