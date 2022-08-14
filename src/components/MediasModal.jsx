import { Box, Button, CircularProgress, Divider, Grid, IconButton, List, ListItem, Modal, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { deleteUser, getGenres, getUserReviews, getUserViewLogs, putUserData } from '../api'
import DataField from './DataField'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Delete } from '@mui/icons-material'

export default function UsersModal(props) {

  const data = props.data;

  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState(JSON.parse(JSON.stringify(data)));
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(data)));
  const [genres, setGenres] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(0);

  const handleDelete = async () => {
    await deleteUser(data._id);
    console.log('deleted user');
    // TODO: Remove from table
    props.onClose();
  }

  const handleEdit = () => {
    setOriginalData(JSON.parse(JSON.stringify(formData)));
    setIsEditing(true);
  }

  const handleOnChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const handleCancelEdit = () => {
    setFormData(JSON.parse(JSON.stringify(originalData)));
    setIsEditing(false);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsEditing(false);
    // await putUserData(data._id, formData);
    // if (formData['name'] !== originalData['name']) {
    //   data['name'] = formData['name'];
    // }
    // if (formData['family_name'] !== originalData['family_name']) {
    //   data['family_name'] = formData['family_name'];
    // }
    // if (formData['subscription_status'] !== originalData['subscription_status']) {
    //   data['subscription_status'] = formData['subscription_status'];
    // }
    // if (formData['role'] !== originalData['role']) {
    //   data['role'] = formData['role'];
    // }
    console.log('Done!');
  }

  const handleSeasonClick = (index) => {
    console.log('Season selected', index)
    setSelectedSeason(index);
  }

  const handleDeleteSeason = (index) => {

  }

  const handleAddSeason = () => {

  }

  const handleDeleteEpisode = (index) => {

  }

  const handleAddEpisode = () => {

  }

  const handleSrcChange = (event, season, episode) => {
    const newSrc = formData.media_src;
    newSrc[season][episode].src = event.target.value;
    setFormData({ ...formData, media_src: newSrc });
  }

  const handleEpisodeTitleChange = (event, season, episode) => {
    const newTitle = formData.media_src;
    newTitle[season][episode].title = event.target.value;
    setFormData({ ...formData, media_src: newTitle });
    console.log('form', formData.media_src[season][episode].title);
    console.log('original', originalData.media_src[season][episode].title);
    console.log('data', data.media_src[season][episode].title);
  }

  const stringifyDate = (unformattedDate) => {
    const date = new Date(unformattedDate);
    return `${date.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}/` + 
    `${(date.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}/` +
    `${date.getFullYear()} ` +
    `${date.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:` +
    `${date.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`;
  }

  useEffect( () => {
    const fetchGenres = async () => {
      const res = await getGenres();
      setGenres(res.data.map( genre => genre.name ));
    }

    fetchGenres();
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
      <Typography variant={'h4'} >Media details</Typography>
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
                <Button color='secondary' onClick={handleEdit} variant='contained' sx={{ width: '80px', mr: 2 }} type='button' >Edit</Button>
                <Button color='secondary' onClick={handleDelete} variant='contained' sx={{ width: '80px', }} type='button' >Delete</Button>
              </>
          }
        </Box>
        <Divider sx={{ width: '100%' }}/>
        <Box>
          <Grid container spacing={1}>

            <DataField name='title' type='text' label='Title' value={formData ? formData.title : '' } isEditing={isEditing} onChange={handleOnChange} />
            <DataField name='release_date' type='text' label='Released' value={formData ? stringifyDate(formData.release_date) : '' } isEditing={isEditing} onChange={handleOnChange} />
            <DataField name='type' type='select' selectValues={['Movie', 'Show']} label='Type' value={formData ? formData.type : '' } isEditing={isEditing} onChange={handleOnChange} />
            <DataField name='poster' type='text' label='Poster' value={formData ? formData.poster : ''}  isEditing={isEditing} onChange={handleOnChange} />
            <DataField name='poster_img' type='custom' label=''>
              <Box component="img" src={formData.poster ?? ''} maxWidth='150px' sx={{ minHeight: '225px' }}/>
            </DataField>
            <DataField name='genres' label='Genres' selectValues={genres} type='multipleSelect' value={formData ? formData.genres.map( genre => genre.name ) : [] } isEditing={isEditing} onChange={handleOnChange} />
            <DataField name='overview' type='textArea' label='Overview' value={formData ? formData.overview : '' } isEditing={isEditing} onChange={handleOnChange} />
            <DataField name='production' type='text' label='Production' value={formData ? formData.production : '' } isEditing={isEditing} onChange={handleOnChange} />
            <DataField name='director' type='text' label='Director(s)' value={formData ? formData.director.join(', ') : ''} isEditing={isEditing} onChange={handleOnChange} />
            <DataField name='cast' type='text' label='Cast' value={formData ? formData.cast.join(', ') : ''} isEditing={isEditing} onChange={handleOnChange} />
            {
              (formData.type === 'Movie') ?
                <DataField name='media_src' type='text' label='Source' value={formData ? formData.media_src[0][0].src : ''} />
              :
                <DataField name='media_src' type='custom' label='Episodes'>
                  <Box display='flex' >
                    <Box>
                      {
                        formData.media_src.map( (season, index) => {
                          return (
                            <Box display='flex' width='150px' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography key={`season.${index + 1}`} onClick={() => handleSeasonClick(index)} >Season {index + 1}</Typography>
                              <IconButton size='large' color='secondary' onClick={() => handleDeleteSeason(index)}>
                                <Delete fontSize='small' sx={{  }} />
                              </IconButton>
                              {/* <Button color='secondary' variant='contained' size='small' ><Delete fontSize='small' sx={{ padding: '4px' }} /></Button> */}
                            </Box>
                          )
                        })
                      }
                      <Button color='secondary' variant='contained' onClick={handleAddSeason} >Add season</Button>
                    </Box>
                    <Box>
                      {
                        formData.media_src[selectedSeason].map( (episode, index) => {
                          return (
                            <>
                              <Box key={`episode${index + 1}`} display='flex' width='320px' sx={{ justifyContent: 'space-between', alignItems: 'center' }} >
                                <Box>
                                  <TextField
                                    value={episode.title}
                                    disabled= {!isEditing}
                                    sx={{
                                      width: '100%',
                                      "& .MuiInputBase-input": { // For text color
                                        color: 'secondary.dark',
                                      },
                                      "& .MuiInputBase-input.Mui-disabled": {
                                        WebkitTextFillColor: 'black'
                                      } 
                                    }}
                                    InputProps={{ disableUnderline: (!isEditing), autoComplete: 'new-password' }}
                                    variant='standard'
                                    onChange={(event) => handleEpisodeTitleChange(event, selectedSeason, index)}
                                  />
                                  <TextField
                                    value={episode.src}
                                    disabled= {!isEditing}
                                    sx={{
                                      width: '100%',
                                      "& .MuiInputBase-input": { // For text color
                                        color: 'secondary.dark',
                                      },
                                      "& .MuiInputBase-input.Mui-disabled": {
                                        WebkitTextFillColor: 'black'
                                      },
                                      mb: '2px',
                                    }}
                                    InputProps={{ disableUnderline: (!isEditing), autoComplete: 'new-password' }}
                                    variant='standard'
                                    onChange={(event) => handleSrcChange(event, selectedSeason, index)}
                                  />
                                </Box>
                                <IconButton size='large' color='secondary' onClick={() => handleDeleteEpisode(index)}>
                                  <Delete fontSize='small' sx={{  }} />
                                </IconButton>
                                {/* <Button color='secondary' variant='contained' size='small' ><Delete fontSize='small' sx={{ padding: '4px' }} /></Button> */}
                              </Box>
                              <Divider sx={{ width: '100%' }} />
                            </>
                          )
                        })
                      }
                      <Button color='secondary' variant='contained' onClick={handleAddEpisode} >Add episode</Button>
                    </Box>
                  </Box>
                </DataField>
            }
            <DataField name='updated' type='text' label='Last updated' value={formData ? stringifyDate(formData.updated) : '' } isEditing={false} onChange={handleOnChange} />

            <Divider sx={{ width: '100%' }}/>

          </Grid>
        </Box>
      </form>
    </Paper>
  )
}
