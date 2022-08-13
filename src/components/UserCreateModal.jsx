import { Box, Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import DataField from './DataField'

export default function UserCreateModal() {

  const clearForm = {
    email: '',
    password: '',
    confirm: '',
    subscription_status: 'Active',
    bank_details: '',
    name: '',
    family_name: '',
    state: '',
    city: '',
    address: '',
    zip_code: '',
  }

  const [formData, setFormData] = useState(clearForm);

  const handleOnChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  return (
    <Paper sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      height: '600px',
      width: '680px',
      overflow: 'auto',

      padding: 4,
      scrollbarWidth: 'thin',
    }}
    >
      <Typography variant='h4' >
        Create User
      </Typography>
      <form>
        <Box >
          <Grid container spacing={1}>
            <DataField name='email' label='Email' type='text' value={formData.email} isEditing={true} onChange={handleOnChange} />
            <DataField name='password' label='Password' type='password' value={formData.password} isEditing={true} onChange={handleOnChange} />
            <DataField name='confirm' label='Confirm password' type='password' value={formData.confirm} isEditing={true} onChange={handleOnChange} />
            <DataField name='subscription_status' type='select' selectValues={['Active', 'Idle', 'Blocked']} label='Subscription' value={formData.subscription_status} isEditing={true} onChange={handleOnChange} />
            <DataField name='bank_details' label='Bank Details' type='text' value={formData ? formData.bank_details : '' } isEditing={true} onChange={handleOnChange} />
            <DataField name='name' label='Name' type='text' value={formData.name} isEditing={true} onChange={handleOnChange} />
            <DataField name='family_name' label='Family name' type='text' value={formData ? formData.family_name : '' } isEditing={true} onChange={handleOnChange} />
            <DataField name='state' label='State' type='text' value={formData ? formData.state : '' } isEditing={true} onChange={handleOnChange} />
            <DataField name='city' label='City' type='text' value={formData ? formData.city : '' } isEditing={true} onChange={handleOnChange} />
            <DataField name='address' label='Address' type='text' value={formData ? formData.address : '' } isEditing={true} onChange={handleOnChange} />
            <DataField name='zip_code' label='Zip code' type='text' value={formData ? formData.zip_code : '' } isEditing={true} onChange={handleOnChange} />
          </Grid>
        </Box>
      </form>
    </Paper>
  )
}
