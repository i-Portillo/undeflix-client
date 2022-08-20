import { Box, CircularProgress, Container, Divider, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import OptionList from '../components/OptionList';

import { getUser } from '../api/index';
import AccountDetails from '../components/AccountDetails';
import UserReviews from '../components/UserReviews';
import UserViewLogs from '../components/UserViewLogs';

export default function Profile() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState('accountDetails');

  const handleDataChange = () => {
    const getUserData = async () => {
      const res = await getUser();
      setData(res.data);
    }

    getUserData();
  }

  const content = () => {
    switch(selectedMenu) {
      case 'accountDetails':
        return <AccountDetails userData={data} onDataChange={handleDataChange} />;
      // case 'planInfo':
      //   return <Typography>Plan Info</Typography>
      case 'reviews':
        return <UserReviews userData={{ genres: data.genre_affinity, reviews: data.media_reviews }} />;
      case 'viewLog':
        return <UserViewLogs userData={{ viewLogs: data.view_logs }}  />
      default:
        return (
          <Box width='100%' mt={15} display='flex' justifyContent={'center'} alignItems={'center'} >
            <CircularProgress color="accent" />
          </Box>
        )
    }
  }
  
  const options = [
    { text: 'Account details', onClick: () => setSelectedMenu('accountDetails') },
    // { text: 'Plan info', onClick: () => setSelectedMenu('planInfo') },  // TODO: Expand with facturation module
    { text: 'Reviews', onClick: () => setSelectedMenu('reviews') },
    { text: 'View Log', onClick: () => setSelectedMenu('viewLog') },
  ];

  useEffect( () => {
    const getUserData = async () => {
      const res = await getUser();
      setData(res.data);
    }

    getUserData();
  }, []);

  useEffect( () => {
    if(data) {
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
              :
              content()
            }
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}
