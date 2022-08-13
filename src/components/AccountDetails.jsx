import { Button, Grid } from '@mui/material'
import React, { useState } from 'react'

import DataField from './DataField'

export default function AccountDetails({ userData }) {

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing( (prev) => !prev );

  return (
    <div>
      <Button color='secondary' onClick={handleEdit}>Edit</Button>
      <Grid container spacing={1}>
        <DataField id='email' label='Email' type='text' value={userData ? userData.email : '' } isEditing={false} />
        <DataField id='name' label='Name' type='text' value={userData ? userData.name : '' } isEditing={isEditing} />
        <DataField id='family_name' label='Family name' type='text' value={userData ? userData.family_name : '' } isEditing={isEditing} />
        <DataField id='state' label='State' type='text' value={userData ? userData.state : '' } isEditing={isEditing} />
        <DataField id='city' label='City' type='text' value={userData ? userData.city : '' } isEditing={isEditing} />
      </Grid>
    </div>
  )
}
