import { Button, Divider, Grid, TextField } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { putUserData, putUserPassword } from '../api';

import DataField from './DataField'

export default function AccountDetails({ userData, onDataChange }) {

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);
  const [originalData, setOriginalData] = useState(userData);
  const [password, setPassword] = useState({ password: '', confirm: '' });

  const handleOnChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const handleEdit = () => {
    setOriginalData(formData);
    setIsEditing(true);
  }

  const handleSubmit = async () => {
    await putUserData(null, formData);
    onDataChange();
    setIsEditing(false);
  }

  const handleCancelEdit = () => {
    setFormData(originalData);
    setIsEditing(false);
  }

  const handlePasswordChange = (event) => {
    setPassword({...password, [event.target.name]: event.target.value});
  }

  const handlePasswordSubmit = () => {
    putUserPassword(password.password);
  }

  return (
    <Box>      
      <Grid container spacing={1}>

        <DataField name='email' label='Email' type='text' value={formData ? formData.email : '' } />
        <DataField name='bank_details' label='Bank Details' type='text' value={formData ? formData.bank_details : '' } isEditing={isEditing} onChange={handleOnChange} />
        <DataField name='name' label='Name' type='text' value={formData ? formData.name : '' } isEditing={isEditing} onChange={handleOnChange} />
        <DataField name='family_name' label='Family name' type='text' value={formData ? formData.family_name : '' } isEditing={isEditing} onChange={handleOnChange} />
        <DataField name='state' label='State' type='text' value={formData ? formData.state : '' } isEditing={isEditing} onChange={handleOnChange} />
        <DataField name='city' label='City' type='text' value={formData ? formData.city : '' } isEditing={isEditing} onChange={handleOnChange} />
        <DataField name='address' label='Address' type='text' value={formData ? formData.address : '' } isEditing={isEditing} onChange={handleOnChange} />
        <DataField name='zip_code' label='Zip code' type='text' value={formData ? formData.zip_code : '' } isEditing={isEditing} onChange={handleOnChange} />

      </Grid>
      <Box sx={{ padding: '8px', display: 'flex', justifyContent: 'flex-end' }} >
      {
        (isEditing) ? 
          <>
            <Button color='secondary' variant='contained' sx={{ width: '80px', mr: 2 }} onClick={handleSubmit} >Save</Button>
            <Button color='secondary' variant='contained' sx={{ width: '80px', }} onClick={handleCancelEdit} >Cancel</Button>
          </>
        :
          <>
            <Button color='secondary' onClick={handleEdit} variant='contained' sx={{ width: '80px' }} type='button' >Edit</Button>
          </>
      }
      </Box>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Grid container spacing={1}>
        <DataField name='password' label='Password' type='password' isEditing={true} onChange={handlePasswordChange} />
        <DataField name='confirm' label='Confirm' type='password' isEditing={true} onChange={handlePasswordChange} />
      </Grid>
      <Box sx={{ padding: '8px', display: 'flex', justifyContent: 'flex-end' }} >
        <Button color='secondary' variant='contained' sx={{ width: '80px' }} onClick={handlePasswordSubmit} >Change</Button>
      </Box>
    </Box>
  )
}
