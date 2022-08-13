import { Box, Button, CircularProgress, Container, Divider, getAccordionDetailsUtilityClass, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import OptionList from './OptionList';

import { getUser } from '../api/index';
import AccountDetails from './AccountDetails';

export default function Profile() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displayedData, setDisplayedData] = useState(null);

  let accountDetails = (<AccountDetails userData={data} />)

  const planInfo = (
    <Typography>Plan Info</Typography>
  )

  const userPreference = (
    <Typography>User Preferences</Typography>
  )

  const viewLog = (
    <Typography>View Log</Typography>
  )

  const displayAccount = () => {
    setDisplayedData(accountDetails);
  }

  const displayPlan = () => {
    setDisplayedData(planInfo);
  }

  const displayUserPreference = () => {
    setDisplayedData(userPreference);
  }

  const displayViewLog = () => {
    setDisplayedData(viewLog);
  }
  
  const options = [
    { text: 'Account details', onClick: displayAccount },
    { text: 'Plan info', onClick: displayPlan },
    { text: 'User Preferences', onClick: displayUserPreference },
    { text: 'View Log', onClick: displayViewLog },
  ];

  useEffect( () => {
    const getUserData = async () => {
      const res = await getUser();
      setData(res.data);
      console.log(res.data);
    }

    getUserData();
  }, []);

  useEffect( () => {
    if(data) {
      setDisplayedData(accountDetails);
      setLoading(false);
    }
  }, [data])

  return (
    <Container sx={{ height: '750px' }}>
      <Paper sx={{ maxWidth: 'md', p: 4, m: 'auto', mt: 4, backgroundColor: 'primary.main', height: '100%', maxHeight: '750px'}}>
        <Box sx={{ mb: 1}}>
          <Typography color='secondary.dark' variant='h4'>
            Profile
          </Typography>
        </Box>
        <Divider variant='middle' />
        <Box sx={{ display: 'flex', flexGrow: 1, p: 3 }}>
          <OptionList options={options} />
          <Divider orientation='vertical' variant='middle' flexItem />
          <Box sx={{ flexGrow: 1, p: 3}}>
            { loading ?
              <Box width='100%' mt={15} display='flex' justifyContent={'center'} alignItems={'center'} >
                <CircularProgress color="accent" />
              </Box>
              : displayedData }
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}
