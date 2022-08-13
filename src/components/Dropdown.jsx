import { Box, Button, Grid, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect } from 'react';

export default function Dropdown({ label, values, action }) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <Box >
      <Button color='secondary' size='large' onClick={handleClick} >{label} <ArrowDropDownIcon /></Button>
      <Menu 
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
      >
        <Grid container direction='row' width={'420px'} >
          {
            values.map( (value) => {
              return (
                <Grid key={value} item xs={4} >
                  <MenuItem color='secondary' onClick={() => { handleClose(); action(value); }} >{value}</MenuItem>
                </Grid>
              )
            })
          }
        </Grid>
      </Menu>
    </Box>
  )
}
