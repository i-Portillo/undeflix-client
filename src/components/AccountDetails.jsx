import { Button, Grid } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { putUserData } from '../api';

import DataField from './DataField'

export default function AccountDetails({ userData }) {

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);
  const [originalData, setOriginalData] = useState(userData);

  const handleOnChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const handleEdit = () => {
    setOriginalData(formData);
    setIsEditing(true);
  }

  const handleSubmit = async () => {
    await putUserData(null, formData);
    setIsEditing(false);
  }

  const handleCancelEdit = () => {
    setFormData(originalData);
    setIsEditing(false);
  }

  return (
    <Box>      
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
      <Grid container spacing={1}>
        {/* <DataField name='email' label='Email' type='text' value={userData ? userData.email : '' } isEditing={false} />
        <DataField name='name' label='Name' type='text' value={userData ? userData.name : '' } isEditing={isEditing} />
        <DataField name='family_name' label='Family name' type='text' value={userData ? userData.family_name : '' } isEditing={isEditing} />
        <DataField name='state' label='State' type='text' value={userData ? userData.state : '' } isEditing={isEditing} />
        <DataField name='city' label='City' type='text' value={userData ? userData.city : '' } isEditing={isEditing} /> */}

        <DataField name='email' label='Email' type='text' value={formData ? formData.email : '' } />
        <DataField name='bank_details' label='Bank Details' type='text' value={formData ? formData.bank_details : '' } isEditing={isEditing} onChange={handleOnChange} />
        <DataField name='name' label='Name' type='text' value={formData ? formData.name : '' } isEditing={isEditing} onChange={handleOnChange} />
        <DataField name='family_name' label='Family name' type='text' value={formData ? formData.family_name : '' } isEditing={isEditing} onChange={handleOnChange} />
        <DataField name='state' label='State' type='text' value={formData ? formData.state : '' } isEditing={isEditing} onChange={handleOnChange} />
        <DataField name='city' label='City' type='text' value={formData ? formData.city : '' } isEditing={isEditing} onChange={handleOnChange} />
        <DataField name='address' label='Address' type='text' value={formData ? formData.address : '' } isEditing={isEditing} onChange={handleOnChange} />
        <DataField name='zip_code' label='Zip code' type='text' value={formData ? formData.zip_code : '' } isEditing={isEditing} onChange={handleOnChange} />
      </Grid>
    </Box>
  )
}
