import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// import '../styles/Slider.scss';

import Card from './Card';

import { getMediasByGenre, getUserList, getUserKeepWatching } from '../api/index.js';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';

export default function Slider(props) {
  
  const sliderRef = useRef();
  
  const margin = 100;
  const gap = 20;

  const getVisibleCards = () => {
    return Math.floor((window.innerWidth - (margin + gap)) / ( 200 + gap ));
  }

  const [cards, setCards] = useState([]);
  const [mediaData, setMediaData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [transitioning, setTransitioning] = useState(false);
  const [visibleCards, setVisibleCards] = useState(getVisibleCards());

  const lastCardIsVisible = () => cards.length <= visibleCards;

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const leftControl = useRef();
  const rightControl = useRef();

  const lastPos = -1 * (((200 + gap) * cards.length ) - ((200 + gap) * visibleCards))

  const style = {
    slider : {
      height: '370px',
      width: '100%',
      position: 'relative',
      pt: '30px',
    },
    sliderHeader : {
      ml: `${margin}px`,
      mb: '5px',
    },
    sliderExplore : {
      textDecoration: 'none',
      '&:hover': {
        color: 'primary.main',
      },
      transition: (theme) => theme.transitions.create('color', {
        duration: 250,
      })
    },
    sliderContent : {
      ml: `${margin}px`,
    },
    cards : {
      display: 'flex',
      height: 'inherit',
      width: 'max-content',
      gap: `${gap}px`,
      transition: (theme) => theme.transitions.create('transform', {
        duration: 750,
        easing: theme.transitions.easing.easeInOut,
      }),
    },
    sliderControl : {
      position: 'absolute',
      zIndex: 500,
      backgroundColor: 'secondary.main',
      top: '45%',
      width: 70,
      height: 70,
      fontSize: '90px',
      '&:hover': {
        backgroundColor: 'secondary.main'
      },
      transition: (theme) => theme.transitions.create('opacity', {
        duration: 125,
        easing: theme.transitions.easing.easeInOut,
      }),
    },
    hidden : {
      opacity: 0,
      pointerEvents: 'none',
      zIndex: -1
    }
  }

  useEffect( () => {

    window.addEventListener('resize', handleResize);

    const storedData = JSON.parse(sessionStorage.getItem(props.data)) ?? [];

    const fetchData = async (category) => {
      let res = null;
      if (category === 'myList') {
        res = await getUserList();
      } else if (category === 'keepWatching') {
        res = await getUserKeepWatching();
      } else {
        res = await getMediasByGenre(category);
      }
      const data = res.data;
      console.log(res.data);
      setMediaData(data);
    }

    if (storedData.length > 0) {
      setMediaData(storedData);
    } else {
      fetchData(props.data);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  useEffect( () => {
    const mediaCards = (mediaData ?? []).filter( card => (props.mode === 'All' || props.mode === (card.type + 's')))
    .slice(0,25).map( data => {   // TODO: Change 25 cards limit to something else
      return <Card key={data._id} mediaData={data} />
    })
    setCards(mediaCards);
    if (props.data !== 'myList' && props.data !== 'keepWatching') sessionStorage.setItem(props.data, JSON.stringify(mediaData));

    if (sliderRef && sliderRef.current) resetSlide();

  }, [mediaData, props.mode])

  useEffect( () => {
    if (mediaData !== null) setIsLoading(false);
    setAtEnd(lastCardIsVisible());
  }, [cards])

  // Change display of left slider control when the slider is at the start.
  useEffect(() => {
    atStart ?
      leftControl?.current.classList.add('hidden')
      :
      leftControl?.current.classList.remove('hidden')
  }, [atStart]);

  // Change display of right slider control when the slider is at the end.
  useEffect(() => {
    atEnd ?
      rightControl?.current?.classList.add('hidden')
    :
      rightControl?.current?.classList.remove('hidden')
  }, [atEnd]);

  const handleResize = () => {
    const cur = getVisibleCards();
    if (cur < visibleCards) {
      setAtEnd(false);
      setVisibleCards(cur);
    }
  }

  const handleSlide = (direction) => {
    if (transitioning) {
      return;
    }
    setTransitioning(true);
    const offset = sliderRef.current.getBoundingClientRect().x;
    const defaultSlide = (visibleCards * (200 + gap));
    let slideAmount = offset - margin;
    if (direction === 'left') {
      slideAmount += defaultSlide;
      if (slideAmount >= 0) {
        slideAmount = 0;
      }
    } else {
      slideAmount -= defaultSlide;
      if (slideAmount <= lastPos) {
        slideAmount = lastPos;
      }
    }
    setAtStart(slideAmount === 0);
    setAtEnd(slideAmount <= lastPos);
    sliderRef.current.style.transform = `translate(${slideAmount}px)`;
  }

  const resetSlide = () => {
    sliderRef.current.style.transform = `translate(0px)`;
    setAtStart(true);
    setAtEnd(lastCardIsVisible());
  }

  const unblockTransition = () => {
    setTransitioning(false);
  }

  useEffect(() => {
    if (sliderRef && sliderRef.current) {
      const cur = sliderRef.current;
      cur.addEventListener('transitionend', unblockTransition);

      return () => {
        cur.removeEventListener('transitionend', unblockTransition);
      }
    }
  });

  return (
    (isLoading || cards.length > 0) ? 
      <Box sx={style.slider} >
        <Box sx={style.sliderHeader}>
          <Typography display='inline' color='primary' variant='h5' sx={{ mr: 2, fontWeight: 500}}>
            {(props.data === 'myList') ? 'My list' : ((props.data === 'keepWatching') ? "Keep watching" : props.data) }
          </Typography>
          { (props.data !== 'keepWatching') ?
            <Typography display='inline' variant='h6' component={Link} 
              to={ (props.data === 'myList') ? `/browse/list` : `/browse/genre/${props.data}`}
              color='secondary' sx={style.sliderExplore}>Explore</Typography>
            :
            <></>
          }
        </Box>
        <Box sx={style.sliderContent}>
          <IconButton
            ref={leftControl}
            sx={{...style.sliderControl, left: 20, ...(atStart ? style.hidden : '')}}
            onClick={() => handleSlide('left')}
          >
            <ArrowLeft color='accent' fontSize='large'/>
          </IconButton>
          { isLoading ?
            <Box width='100%' mt={15} display='flex' justifyContent={'center'} alignItems={'center'} >
              <CircularProgress color="accent" />
            </Box>
          :
            <Box sx={style.cards} ref={sliderRef} >
              {cards}
            </Box>
          }
          <IconButton
            ref={rightControl}
            size='large'
            sx={{...style.sliderControl, right: 20, ...(atEnd ? style.hidden : '')}}
            onClick={() => handleSlide('right')}
          >
            <ArrowRight color='accent' fontSize='large' />
          </IconButton>
        </Box>
      </Box>
    :
      <></>
  );
}