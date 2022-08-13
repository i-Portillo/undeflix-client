import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, NativeSelect, Select, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getMediasByGenre, getQuery, getUserList } from '../api';
import CardList from './CardList';

const Browse = ({ category }) => {

  const params = useParams();

  let genre = '';
  if (category === 'genre') {
    genre = params.genre;
  }

  let query = '';
  if (category === 'search') {
    query = params.query;
  }

  const [mediaData, setMediaData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState('All');

  useEffect( () => {
    setIsLoading(true);
    
    const fetchGenre = async (genre) => {
      const res = await getMediasByGenre(genre);
      const data = res.data;
      setMediaData(data);
    }
    
    const fetchList = async () => {
      const res = await getUserList();
      const data = res.data;
      setMediaData(data);
    }

    const fecthQuery = async () => {
      const res = await getQuery(query);
      const data = res.data;
      setMediaData(data);
    }

    if (category === 'list') {
      fetchList();
    }

    if (category === 'search') {
      fecthQuery();
    }
    
    if (category === 'genre') {
      const storedData = JSON.parse(sessionStorage.getItem(genre)) ?? [];
      if (storedData.length > 0) {
        setMediaData(storedData);
      } else {
        fetchGenre(genre);
      }
    }
  }, [category, genre, query]);

  useEffect( () => {
    if (category === 'genre') sessionStorage.setItem(genre, JSON.stringify(mediaData));
  }, [mediaData])

  useEffect( () => {
    if (mediaData) setIsLoading(false);
  }, [mediaData])

  const handleChange = (e) => {
    setMode(e.target.value);
  }

  return (
    <Box pl='100px' pr='30px' pt='30px' pb='30px' >
      <Box display='flex' sx={{ mb: '5px' }}>
        <Typography variant='h5' color='primary' sx={{ fontWeight: 500 }}>
          { (category === 'genre' ? genre : ( category === 'search' ? 'Searching:' : 'My list') )}
        </Typography>
        {
          (category === 'search') ?
          <Typography variant='h5' color='primary' ml={'20px'} mr={'10px'} >
            {query}
          </Typography>
          :
          <></>
        }
        <FormControl variant='standard' color='accent' sx={{ minWidth: 100, ml: '16px' }} >
          <Select
            defaultValue={'All'}
            sx={{ color: 'primary.main', fontSize: '1.25rem', pb: '0px', "& .MuiSvgIcon-root": {color: "accent.main"} }}
            onChange={handleChange}
          >
            <MenuItem value={'All'}>All</MenuItem>
            <MenuItem value={'Movies'}>Movies</MenuItem>
            <MenuItem value={'Shows'}>Shows</MenuItem>
          </Select>
        </FormControl>
      </Box>
        { isLoading ?
          <Box width='100%' mt={15} display='flex' justifyContent={'center'}>
            <CircularProgress color="accent" />
          </Box>
        :
          // cards
          <CardList cards={mediaData} mode={mode} />
        }
    </Box>
  )
}

export default Browse;