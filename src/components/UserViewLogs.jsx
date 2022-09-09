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
                    userData.viewLogs.sort( (a,b) => {
                      if (a.date <= b.date) return 1;
                      return -1
                    })
                    .map (viewLog => {
                      const date = new Date(viewLog.date);
                      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${date.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`;
                      return (
                        <ListItem key={`viewLog.${viewLog._id}`} sx={{ justifyContent: 'space-between', }} >
                          <Box sx={{ width: '330px'}} >
                            <Typography variant='body'>{`${viewLog.media_src.media.title}`}</Typography>
                            {
                              (viewLog.media_src.media.type === 'Show') ?
                                <Typography variant='body2' noWrap >{`${viewLog.media_src.title}`}</Typography>
                              :
                                <></>
                            }
                          </Box>
                          <Typography variant='body' >{viewLog.progress}%</Typography>
                          <Typography variant='body' >{formattedDate}</Typography>
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
