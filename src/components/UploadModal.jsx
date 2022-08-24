import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import React from 'react'

export default function UploadModal({ type, onUpload, onClose, children }) {


  return (
    <Paper sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '450px',

      padding: 4,
    }}>
      <Typography variant={'h4'} >Uploading new {type}</Typography>
      <Grid container spacing={1} sx={{mt: 2 }}>
        { children }
      </Grid>
      <Box sx={{ mt: 2 }} >
        <Button color='secondary' variant='contained' sx={{ width: '80px', mr: 2 }} onClick={() => onUpload(type)} >Upload</Button>
        <Button color='secondary' variant='contained' sx={{ width: '80px', mr: 2 }} onClick={onClose}>Cancel</Button>
      </Box>
    </Paper>
  )
}
