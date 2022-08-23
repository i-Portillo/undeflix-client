import { ArrowBackOutlined } from '@mui/icons-material'
import { Box, CardMedia, CircularProgress, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMediaSrc, putViewLog } from '../api';

// import '../styles/Watch.scss';

export default function Watch() {

  const style = {
    watch: {
      width: '100vw',
      height: '100vh',
    },
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'fit',
    },
    back: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      color: 'primary.main'
    }
  }

  const navigate = useNavigate();
  const params = useParams();

  const id = params.id;

  const [src, setSrc] = useState();
  const [isLoading, setIsLoading] = useState(true);
  
  let progress = params.progress || 0;

  const video = useRef();


  const calculateProgress = (seconds) => {
    let progress = Math.floor((seconds / video.current.duration) * 100);
    if (progress >= 95) progress = 100;
    return progress;
  }

  useEffect( () => {
    const fetchSrc = async () => {
      const res = await getMediaSrc(id);
      setSrc(res.data);
    };

    const cleanUp = () => {
      putViewLog(id, progress);
    };

    fetchSrc();

    const interval = setInterval(() => {
      progress = calculateProgress(video.current.currentTime);
    }, 5000);

    window.addEventListener('beforeunload', cleanUp);

    return () => {
      clearInterval(interval);
      cleanUp();
      window.removeEventListener('beforeunload', cleanUp);
    };

  }, []);

  useEffect( () => {
    if (src) setIsLoading(false);
  }, [src])

  const handleBack = () => {
    navigate(-1);
  };

  const setStartTime = () => {
    console.log('setting start time')
    video.current.currentTime = params.progress / 100 * video.current.duration;
  };

  return (
    <Box sx={ style.watch }>
      <IconButton sx={ style.back } onClick={handleBack}>
        <ArrowBackOutlined />
        Back
      </IconButton>

      { isLoading ?
          <Box width='100%' mt={30} display='flex' justifyContent={'center'}>
            <CircularProgress color="accent" />
          </Box>
        :
          <CardMedia sx={ style.video } component={'video'} autoPlay controls muted onLoadedMetadata={setStartTime} src={src.src} type="video/mp4" ref={video} />

      }
    </Box>
  )
}
