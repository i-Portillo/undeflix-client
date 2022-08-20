import { Box } from '@mui/material';
import { React, useState, useEffect } from 'react';
import { getUserGenreAffinity } from '../api';

import Slider from './Slider';

export default function Billboard({ mode }) {

  const style = {
    billboard: {
      overflow: 'hidden'
    }
  }

  const [sliders, setSliders] = useState([]);
  const [genreData, setGenreData] = useState([]);

  useEffect( () => {
    const fetchGenre = async () => {
      const res = await getUserGenreAffinity();
      const data = res.data;
      setGenreData(data.map( (genre) => {
          return genre.genre;
        }).slice(0,6));
    }

    fetchGenre();
    
  }, [])

  useEffect( () => {

    const sliderList = [];

    sliderList.push( <Slider key='myList' data='myList' mode={mode}/> );

    sliderList.push( <Slider key='keepWatching' data='keepWatching' mode={mode} /> );
    
    sliderList.push(genreData.map( (genre) => {
      return <Slider key={genre} data={genre} mode={mode} />
    }))

    setSliders(sliderList);
  }, [genreData, mode])

  return (
      <Box pb={5} sx={style.billboard}>
        { sliders }
      </Box>
    );

}