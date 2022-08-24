import { Box, Button, Divider, Grid } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { putUserData } from '../api';
import DataField from './DataField';

export default function UserPlanInfo({ userData }) {

  const [bankDetails, setBankDetails] = useState(userData.bankDetails);

  const navigate = useNavigate();

  const formattedDate = (date) => {
    const d = new Date(date);

    return (
      `${d.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}/` +
      `${(d.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}/` +
      `${d.getFullYear().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`
    )
  }
  
  const handleCancelSubscription = async () => {
    await putUserData(null, { subscription_status: 'Idle' });
    navigate('/');
  }

  const handleBankChange = async () => {
    await putUserData(null, { bank_details: bankDetails });
  }

  const handleOnChange = (event) => {
    setBankDetails(event.target.value);
  }

  return (
    <Box>      
      <Grid container spacing={1}>

        <DataField name='subscription_status' label='Subscription status' type='text' value={userData.subscriptionStatus} isEditing={false} />
        <DataField name='last_payment' label='Last payment' type='text' value={formattedDate(userData.lastPayment)} isEditing={false} />
        <DataField name='bank_details' label='Bank Details' type='text' value={bankDetails} isEditing={true} onChange={handleOnChange} />
        <Button color='secondary' variant='contained' type='button' onClick={handleBankChange} sx={{ mt: 2 }} >Change bank details</Button>

        <Divider sx={{ width: '100%', mt: 2, mb: 2 }} />

        <Box>
          <Button color='secondary' variant='contained' type='button' onClick={handleCancelSubscription} >Cancel subscription</Button>
        </Box>

      </Grid>
    </Box>
  )
}
