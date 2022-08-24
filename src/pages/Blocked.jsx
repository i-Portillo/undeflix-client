import { Box, Button, Divider, Paper, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { signOut } from '../api'

export default function Blocked() {

  const navigate = useNavigate();

  const handleLogOut = () => {
    signOut();
    sessionStorage.clear();
    navigate('/');
  }

  return (
    <Paper sx={{ maxWidth: 'sm', p: 4, m: 'auto', mt: 10, backgroundColor: 'primary.main', height: '100%', maxHeight: '750px'}} >
      <Box mb={2} >
        <Typography color='secondary.dark' variant='h4' mb={4} >
          Welcome,
        </Typography>
        <Typography color='secondary.dark' variant='body' >
          This account has been suspended. If you want more info please contact admin@unedflix.com.
        </Typography>
      </Box>
      <Divider sx={{ mb: 4, mt: 4 }} />
      <Box >
        <Button color='secondary' variant='contained' onClick={handleLogOut} >Go back to login</Button>
      </Box>
    </Paper>
  )
}
