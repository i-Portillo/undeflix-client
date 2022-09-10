import { Delete } from '@mui/icons-material';
import { Box, Button, Divider, Grid, IconButton, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-date-picker';
import { getGenres, postMedia } from '../api';
import DataField from './DataField'

export default function MediaCreateModal(props) {

  const clearForm = {
    media_id: '',
    title: '',
    release_date: Date.now(),
    type: 'Movie',
    poster: '',
    genres: [],
    overview: '',
    production: '',
    director: [],
    cast: [],
    updated: Date.now(),
    media_src: [[{ title: '', src: '' }]],
  }

  const [formData, setFormData] = useState(clearForm);
  const [genres, setGenres] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(0);

  const handleOnChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const handleCreate = async () => {
    // TODO: Validate formData
    await postMedia(formData);
    props.onClose();
  }

  const handleCancel = () => {
    props.onClose();
  }

  const handleSeasonClick = (index) => {
    setSelectedSeason(index);
  }

  const handleDeleteSeason = (index) => {
    if (index <= selectedSeason) setSelectedSeason( prev => prev - 1 )
    const mediaSrc = JSON.parse(JSON.stringify(formData.media_src));
    mediaSrc.splice(index, 1);
    setFormData({ ...formData, media_src: mediaSrc })
  }

  const handleAddSeason = () => {
    const mediaSrc = JSON.parse(JSON.stringify(formData.media_src));
    mediaSrc.push([ { title: '', src: '' } ]);
    setFormData({ ...formData, media_src: mediaSrc })
  }

  const handleDeleteEpisode = (index) => {
    const mediaSrc = JSON.parse(JSON.stringify(formData.media_src));
    mediaSrc[selectedSeason].splice(index, 1);
    setFormData({ ...formData, media_src: mediaSrc })
  }

  const handleListChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value.split(',') });
  }

  const handleAddEpisode = () => {
    const newEpisode = {
      title: '',
      src: '',
    }
    const mediaSrc = JSON.parse(JSON.stringify(formData.media_src));
    mediaSrc[selectedSeason].push(newEpisode);
    setFormData({ ...formData, media_src: mediaSrc })
  }

  const handleSrcChange = (event, season, episode) => {
    const newSrc = formData.media_src;
    newSrc[season][episode].src = event.target.value;
    if (formData.type === 'Movie') newSrc[season][episode].title = formData.title;
    setFormData({ ...formData, media_src: newSrc });
  }

  const handleEpisodeTitleChange = (event, season, episode) => {
    const newTitle = formData.media_src;
    newTitle[season][episode].title = event.target.value;
    setFormData({ ...formData, media_src: newTitle });
  }

  const handleGenreChange = (value) => {

    const selectedGenres = value.map( selectedGenre => {
      return genres.find( genre => (genre.name === selectedGenre) )
    } );
    setFormData({ ...formData, genres: selectedGenres });
  }

  const handleDateChange = (date, fieldName) => {
    setFormData({ ...formData, [fieldName]: new Date(date) })
  }

  useEffect( () => {
    const fetchGenres = async () => {
      const res = await getGenres();
      // setGenres(res.data.map( genre => genre.name ));
      const genres = res.data;
      setGenres(genres);
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
      <Typography variant='h4' >
        Create Media
      </Typography>
      <form>
        <Box >
            <Box sx={{ padding: '8px', display: 'flex', justifyContent: 'flex-end' }} >
              <Button color='secondary' onClick={handleCreate} variant='contained' sx={{ width: '80px', mr: 2 }} type='button' >Create</Button>
              <Button color='secondary' onClick={handleCancel} variant='contained' sx={{ width: '80px', }} type='button' >Cancel</Button>
            </Box>
            <Divider sx={{ width: '100%' }}/>
          <Grid container spacing={1}>
            <DataField name='media_id' type='text' label='Id' value={formData ? formData.media_id : '' } isEditing={true} onChange={handleOnChange} />
            <DataField name='title' type='text' label='Title' value={formData ? formData.title : '' } isEditing={true} onChange={handleOnChange} />
            {/* <DataField name='release_date' type='text' label='Released' value={formData ? formData.release_date : '' } isEditing={true} onChange={handleOnChange} /> */}
            <DataField name='release_date' type='custom' label='Released'>
              <DatePicker value={new Date(formData.release_date)} disabled={false} onChange={(date) => handleDateChange(date, 'release_date')} />
            </DataField>
            <DataField name='type' type='select' selectValues={['Movie', 'Show']} label='Type' value={formData ? formData.type : '' } isEditing={true} onChange={handleOnChange} />
            <DataField name='poster' type='text' label='Poster' value={formData ? formData.poster : ''}  isEditing={true} onChange={handleOnChange} />
            <DataField name='poster_img' type='custom' label=''>
              <Box component="img" src={formData.poster ?? ''} maxWidth='150px' sx={{ minHeight: '225px' }}/>
            </DataField>
            <DataField name='genres' type='multipleSelect' label='Genres' selectValues={genres.map( genre => genre.name )} value={formData ? formData.genres.map( genre => genre.name ) : [] } isEditing={true} onChange={handleGenreChange} />
            <DataField name='overview' type='textArea' label='Overview' value={formData ? formData.overview : '' } isEditing={true} onChange={handleOnChange} />
            <DataField name='production' type='text' label='Production' value={formData ? formData.production : '' } isEditing={true} onChange={handleOnChange} />
            <DataField name='director' type='text' label='Director(s)' value={formData ? formData.director.join(',') : ''} isEditing={true} onChange={handleListChange} />
            <DataField name='cast' type='text' label='Cast' value={formData ? formData.cast.join(',') : ''} isEditing={true} onChange={handleListChange} />
            {/* <DataField name='updated' type='text' label='Last updated' value={formData ? formData.updated : '' } isEditing={true} onChange={handleOnChange} /> */}
            <DataField name='updated' type='custom' label='Updated'>
              <DatePicker value={new Date(formData.updated)} disabled={false} onChange={(date) => handleDateChange(date, 'updated')} />
            </DataField>

            {
              (formData.type === 'Movie') ?
                <DataField name='media_src' type='text' label='Source' value={formData ? formData.media_src[0][0].src : ''} isEditing={true} onChange={(event) => handleSrcChange(event, 0, 0)} />
              :
                <DataField name='media_src' type='custom' label='Episodes'>
                  <Box display='flex' >
                    <Box sx={{ maxHeight: '600px', overflowY: 'auto', overflowX: 'hidden' , scrollbarWidth: 'thin', marginRight: '8px' }}>
                      {
                        formData.media_src.map( (season, index) => {
                          return (
                            <Box key={`season.${index + 1}`} display='flex' width='150px' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography onClick={() => handleSeasonClick(index)} sx={{ cursor: 'pointer', fontWeight: (index === selectedSeason) ? 600 : 400 }}>Season {index + 1}</Typography>
                              <IconButton size='large' color='secondary' disabled={ formData.media_src.length === 1 || false} onClick={() => handleDeleteSeason(index)}>
                                <Delete fontSize='small' sx={{  }} />
                              </IconButton>
                              {/* <Button color='secondary' variant='contained' size='small' ><Delete fontSize='small' sx={{ padding: '4px' }} /></Button> */}
                            </Box>
                          )
                        })
                      }
                      <Button color='secondary' variant='contained' disabled={false} onClick={handleAddSeason} >Add season</Button>
                    </Box>
                    <Box sx={{ maxHeight: '600px', overflowY: 'auto', overflowX: 'hidden' , scrollbarWidth: 'thin', paddingRight: '8px' }}>
                      {
                        formData.media_src[selectedSeason]?.map( (episode, index) => {
                          return (
                            <Box key={`episode${index + 1}`}>
                              <Box display='flex' width='300px' sx={{ justifyContent: 'space-between', alignItems: 'center' }} >
                                <Box>
                                  <Typography sx={{ fontWeight: 600 }} >{`Episode ${index + 1}`}</Typography>
                                  <TextField
                                    value={formData.media_src[selectedSeason][index].title}
                                    disabled= {false}
                                    label= { formData.media_src[selectedSeason][index].title ? ' ' : 'Title'}
                                    InputLabelProps={{ shrink: false }}
                                    sx={{
                                      width: '100%',
                                      "& .MuiInputBase-input": { // For text color
                                        color: 'secondary.dark',
                                      },
                                      "& .MuiInputBase-input.Mui-disabled": {
                                        WebkitTextFillColor: 'black'
                                      } 
                                    }}
                                    InputProps={{ disableUnderline: (false), autoComplete: 'new-password' }}
                                    variant='standard'
                                    onChange={(event) => handleEpisodeTitleChange(event, selectedSeason, index)}
                                  />
                                  <TextField
                                    // value={episode.src}
                                    value={formData.media_src[selectedSeason][index].src}
                                    disabled= {false}
                                    label= { formData.media_src[selectedSeason][index].src ? ' ' : 'Path to source'}
                                    InputLabelProps={{ shrink: false }}
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
                                    InputProps={{ disableUnderline: (false), autoComplete: 'new-password' }}
                                    variant='standard'
                                    onChange={(event) => handleSrcChange(event, selectedSeason, index)}
                                  />
                                </Box>
                                <IconButton size='large' color='secondary' disabled={formData.media_src[selectedSeason].length === 1 || false} onClick={() => handleDeleteEpisode(index)}>
                                  <Delete fontSize='small' sx={{  }} />
                                </IconButton>
                              </Box>
                              <Divider sx={{ width: '100%' }} />
                            </Box>
                          )
                        })
                      }
                      <Button color='secondary' variant='contained' disabled={false} onClick={handleAddEpisode} >Add episode</Button>
                    </Box>
                  </Box>
                </DataField>
            }

            <Divider sx={{ width: '100%' }}/>
          </Grid>
        </Box>
      </form>
    </Paper>
  )
}
