import { Box, Button, Divider, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUserBankDetails, putUserData, signOut } from '../api'

export default function Idle() {

  const navigate = useNavigate();

  const [bankDetails, setBankDetails] = useState('');

  const handleLogOut = () => {
    signOut();
    sessionStorage.clear();
    navigate('/');
  }

  const handleRenew = async () => {
    await putUserData(null, { bank_details: bankDetails, subscription_status: 'Active', last_payment: Date.now() });
    navigate('/catalog');
  }

  const handleChange = (event) => {
    setBankDetails(event.target.value);
  }

  useEffect( () => {
    const fetchBankDetails = async () => {
      const res = await getUserBankDetails();
      setBankDetails(res.data);
    }

    fetchBankDetails();
  }, [])

  return (
    <Paper sx={{ maxWidth: 'sm', p: 4, m: 'auto', mt: 11, backgroundColor: 'primary.main', height: '100%', maxHeight: '750px'}} >
      <Box mb={2} >
        <Typography color='secondary.dark' variant='h4' mb={4} >
          Welcome back!
        </Typography>
        <Typography color='secondary.dark' variant='body' >
          It looks like this account is idle. If you want to renew your subscription please confirm your bank details and press 'Renew'.
        </Typography>
      </Box>
      <Box display='flex' >
        <TextField value={bankDetails} sx={{ mr: 2 }} onChange={handleChange} />
        <Button color='secondary' variant='contained' onClick={handleRenew} >Renew</Button>
      </Box>
      <Divider sx={{ mb: 4, mt: 4 }} />
      <Box >
        <Button color='secondary' variant='contained' onClick={handleLogOut} >Go back to login</Button>
      </Box>
    </Paper>
  )
}
