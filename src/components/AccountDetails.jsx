import { Button, Divider, Grid } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { putUserData, putUserPassword } from '../api';

import DataField from './DataField'
import Notification from './Notification';

export default function AccountDetails({ userData, onDataChange }) {

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);
  const [originalData, setOriginalData] = useState(userData);
  const [password, setPassword] = useState({ password: '', confirm: '' });
  const [openSb, setOpenSb] = useState(false);
  const [sbMsg, setSbMsg] = useState('');
  const [sbSeverity, setSbSeverity] = useState('success');

  const handleOnChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const handleEdit = () => {
    setOriginalData(formData);
    setIsEditing(true);
  }

  const handleSubmit = async () => {
    const res = await putUserData(null, formData);
    if (res.status === 200) {

      setOpenSb(true);
      onDataChange();
      setIsEditing(false);
    } else {
      // TODO
    }
  }

  const handleCancelEdit = () => {
    setFormData(originalData);
    setIsEditing(false);
  }

  const handlePasswordChange = (event) => {
    setPassword({...password, [event.target.name]: event.target.value});
  }

  const handlePasswordSubmit = async () => {
    if (password.password.length > 0 && password.password === password.confirm) {
      const res = await putUserPassword(password.password);
      if (res.status === 200) {
        setSbMsg('The changes have been saved.')
        setSbSeverity('error');
        setOpenSb(true);
      } else {
        // TODO
      }
    } else {
      setSbMsg("The passwords don't match")
      setSbSeverity('error');
      setOpenSb(true);
    }
  }

  const handleCloseSb = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSb(false);
  }

  return (
    <>
    <Box>      
      <Grid container spacing={1}>

        <DataField name='email' label='Email' type='text' value={formData ? formData.email : '' } />
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
        <Button color='secondary' variant='contained' sx={{ width: '80px' }} onClick={handlePasswordSubmit} disabled={ password.password.length === 0 } >Change</Button>
      </Box>
    </Box>
    <Notification open={openSb} onClose={handleCloseSb} severity={sbSeverity} content={sbMsg} />
    </>
  )
}
