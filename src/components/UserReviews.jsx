import { Box, CircularProgress, List, ListItem, Typography } from '@mui/material'
import React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import DataField from './DataField'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

export default function UserReviews({ userData }) {

  return (
    
    <Box >
      <DataField name='genre_affinity' label='Genre affinity' type='custom' >
        <Box sx={{ display: 'flex', justifyContent: 'center' }} >
          <BarChart width={450} height={200} data={
            userData.genres.sort((a,b) => a.genre.localeCompare(b.genre))
            .map( genre => {
              return ({
                'genre': genre.genre,
                'affinity': genre.value,
              })
            })
          } >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='genre' angle={-45} dx={-2} dy={-3} interval={0} textAnchor={'end'} type='category' height={90} />
            <YAxis domain={[0, 100]}/>
            <Bar dataKey='affinity' fill='#A5FD0D' />
          </BarChart>
        </Box>
      </DataField>

      <DataField name='media_reviews' label='Reviews' type='custom' >
        <Box height={'250px'} width={'500px'} sx={{ overflow: 'auto', scrollbarWidth: 'thin', p: 1}} >
              {
                (userData.reviews !== null) ?
                  (userData.reviews.length === 0) ?
                    <Typography>Nothing reviewed yet.</Typography>
                  :
                    <List >
                      {
                        userData.reviews.map (review => {
                          return (
                            <ListItem key={`listItem.${review._id}`} sx={{ justifyContent: 'space-between', }} >
                              <Typography noWrap >{review.media.title}</Typography>
                              {
                                (review.feedback === true) ?
                                  <ThumbUpIcon sx={{ color: 'accent.dark'}} />
                                :
                                  <ThumbDownIcon color='error' />
                              }
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
