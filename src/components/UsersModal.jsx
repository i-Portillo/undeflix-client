import { Box, Button, CircularProgress, Divider, Grid, List, ListItem, Modal, Paper, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { deleteUser, getUserReviews, getUserViewLogs, putUserData } from '../api'
import DataField from './DataField'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

export default function UsersModal(props) {

  const data = props.data;
  const role = props.role;

  const [isEditing, setIsEditing] = useState(false);
  const [reviewsData, setReviewsData] = useState(null);
  const [viewLogsData, setViewLogsData] = useState(null);
  const [originalData, setOriginalData] = useState(data);
  const [formData, setFormData] = useState(data);

  const handleDelete = async () => {
    await deleteUser(data._id);
    props.onClose();
  }

  const handleEdit = () => {
    setOriginalData(formData);
    setIsEditing(true);
  }

  const handleOnChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const handleCancelEdit = () => {
    setFormData(originalData);
    setIsEditing(false);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsEditing(false);
    await putUserData(data._id, formData);
  }

  useEffect( () => {
    const getReviews = async () => {
      const res = await getUserReviews(data._id);
      setReviewsData(res.data);
    }

    const getViewLogs = async () => {
      const res = await getUserViewLogs(data._id);
      console.log(res.data);
      setViewLogsData(res.data);
    }

    getReviews();
    getViewLogs();
  }, [])

  return (
    <Paper sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      height: '600px',
      width: '680px',
      overflow: 'auto',

      padding: 4,
      scrollbarWidth: 'thin',
    }}
    >
      <Typography variant={'h4'} >User details</Typography>
      <form >
        <Box sx={{ padding: '8px', display: 'flex', justifyContent: 'flex-end' }} >
          {
            (isEditing) ? 
              <>
                <Button color='secondary' variant='contained' sx={{ width: '80px', mr: 2 }} onClick={handleSubmit} >Save</Button>
                <Button color='secondary' variant='contained' sx={{ width: '80px', }} onClick={handleCancelEdit} >Cancel</Button>
              </>
            :
              <>
                <Button color='secondary' onClick={handleEdit} variant='contained' sx={{ width: '80px', mr: 2 }} type='button' disabled={role === 'employee' && formData.role !== 'user'} >Edit</Button>
                <Button color='secondary' onClick={handleDelete} variant='contained' sx={{ width: '80px', }} type='button' disabled={role === 'employee' && formData.role !== 'user'} >Delete</Button>
              </>
          }
        </Box>
        <Divider sx={{ width: '100%' }}/>
        <Box>
          <Grid container spacing={1}>
            <DataField name='email' label='Email' type='text' value={formData ? formData.email : '' } />
            {
              (role === 'admin') ?
                <DataField name='role' label='Role' type='select' selectValues={['admin', 'employee', 'user']} value={formData ? formData.role : '' } isEditing={isEditing} onChange={handleOnChange} />
              :
                <></>
            }
            <DataField name='subscription_status' type='select' selectValues={['Active', 'Idle', 'Blocked']} label='Subscription' value={formData ? formData.subscription_status : '' } isEditing={isEditing} onChange={handleOnChange} />
            <DataField name='bank_details' label='Bank Details' type='text' value={formData ? formData.bank_details : '' } isEditing={isEditing} onChange={handleOnChange} />
            <DataField name='name' label='Name' type='text' value={formData ? formData.name : '' } isEditing={isEditing} onChange={handleOnChange} />
            <DataField name='family_name' label='Family name' type='text' value={formData ? formData.family_name : '' } isEditing={isEditing} onChange={handleOnChange} />
            <DataField name='state' label='State' type='text' value={formData ? formData.state : '' } isEditing={isEditing} onChange={handleOnChange} />
            <DataField name='city' label='City' type='text' value={formData ? formData.city : '' } isEditing={isEditing} onChange={handleOnChange} />
            <DataField name='address' label='Address' type='text' value={formData ? formData.address : '' } isEditing={isEditing} onChange={handleOnChange} />
            <DataField name='zip_code' label='Zip code' type='text' value={formData ? formData.zip_code : '' } isEditing={isEditing} onChange={handleOnChange} />

            <Divider sx={{ width: '100%' }}/>

            <DataField name='genre_affinity' label='Genre affinity' type='custom' >
              <BarChart width={450} height={350} data={
                formData?.genre_affinity.sort((a,b) => a.genre.localeCompare(b.genre))
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
            </DataField>

            <Divider sx={{ width: '100%' }}/>

            <DataField name='media_reviews' label='Reviews' type='custom' >
              <Box height={'200px'} sx={{ overflow: 'auto', scrollbarWidth: 'thin', p: 1}} >
                    {
                      (reviewsData !== null) ?
                        (reviewsData.length === 0) ?
                          <Typography>Nothing reviewed yet.</Typography>
                        :
                          <List >
                            {
                              reviewsData.map (review => {
                                return (
                                  <ListItem key={`listItem.${review._id}`} sx={{ justifyContent: 'space-between', }} >
                                    <Typography >{review.media.title}</Typography>
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

            <Divider sx={{ width: '100%' }}/>

            <DataField id='view_logs' label='View logs' type='custom' >
              <Box height={'200px'} sx={{ overflow: 'auto', scrollbarWidth: 'thin', p: 1}} >
                {
                  (viewLogsData !== null) ?
                    (viewLogsData.length === 0) ?
                      <Typography>Nothing viewed yet.</Typography>
                    :
                      <List p={0} >
                        {
                          viewLogsData.map (viewLog => {
                            const date = new Date(viewLog.date);
                            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
                            return (
                              <ListItem key={`viewLog.${viewLog._id}`} sx={{ justifyContent: 'space-between', }} >
                                <Typography noWrap sx={{ width: '200px'}} >{viewLog.media_src.title}</Typography>
                                <Typography >{viewLog.progress}%</Typography>
                                <Typography >{formattedDate}</Typography>
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

          </Grid>
        </Box>
      </form>
    </Paper>
  )
}
