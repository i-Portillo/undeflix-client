import { Box, Paper, Typography } from '@mui/material'
import React from 'react'

export default function NotFound() {
  return (
    <Paper sx={{ maxWidth: 'sm', p: 4, m: 'auto', mt: 11, backgroundColor: 'primary.main', height: '100%', maxHeight: '750px'}} >
      <Box mb={2} >
        <Typography color='secondary.dark' variant='h1' mb={4} >
          404 ERROR
        </Typography>
        <Typography color='secondary.dark' variant='h4' >
          Webpages? Where we're going, we don't need webpages.
        </Typography>
      </Box>
    </Paper>
  )
}
