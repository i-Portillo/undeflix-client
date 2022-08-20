import { Box, CircularProgress, List, ListItem, Typography } from '@mui/material';
import React from 'react'
import DataField from './DataField';

export default function UserViewLogs({ userData }) {

  return (
    <Box>
      <DataField id='view_logs' label='View logs' type='custom' >
        <Box height={'550px'} sx={{ overflow: 'auto', scrollbarWidth: 'thin', p: 1}} >
          {
            (userData.viewLogs !== null) ?
              (userData.viewLogs.length === 0) ?
                <Typography>Nothing viewed yet.</Typography>
              :
                <List p={0} >
                  {
                    userData.viewLogs.map (viewLog => {
                      const date = new Date(viewLog.date);
                      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
                      return (
                        <ListItem key={`viewLog.${viewLog._id}`} sx={{ justifyContent: 'space-between', }} >
                          <Typography variant='body2' noWrap sx={{ width: '330px'}} >{viewLog.media_src.title}</Typography>
                          <Typography variant='body2' >{viewLog.progress}%</Typography>
                          <Typography variant='body2' >{formattedDate}</Typography>
                        </ListItem>
                      )
                    })
                  }
                </List>
            :
              <Box width='100%' p={5} display='flex' justifyContent={'center'} alignItems={'center'} >
                <CircularProgress color="accent" />
              </Box>                      
          }
        </Box>
      </DataField>
    </Box>
  )
}
