import { Accordion, AccordionDetails, AccordionSummary, CardMedia, IconButton, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// import '../styles/Card.scss';

import { deleteFeedback, deleteMediaFromList, getMediaDetails, getMediaInList, getMediaSrcsAndProgress, getUserFeedback, getViewLog, putFeedback, putMediaInList } from '../api/index.js';
import { useEffect } from 'react';
import { useRef } from 'react';

export default function Card(props) {

  const mediaData = props.mediaData;

  const style = {
    card: {
      display: 'inline-block',
      borderRadius: '10px',

      height: '300px',
      width: '200px',
      zIndex: 10,

      "&:hover": {
        transform: 'scale(1.2, 1.2)',
        zIndex: 100,
        cursor: 'pointer',
      },
      transition: (theme) => theme.transitions.create('transform', {
        duration: 175,
        easing: theme.transitions.easing.easeInOut,
      }),

      "&:hover > .label": {
        opacity: '100%',
      }

    },
    poster: {
      borderRadius: '10px',
      height: 'inherit',
    },
    label: {
      boxSizing: 'border-box',
      padding: '5px',
      display: 'flex',
      position: 'absolute',
      bottom: 0,
      height: '70px',
      width: 'inherit',
      backgroundImage: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
      borderRadius: '0px 0px 10px 10px',
      opacity: 0,

      title: {
        display: 'flex',
        color: '#EBEBEB',
        fontWeight: 600,
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '1.2em',
        alignSelf: 'flex-end',
      },

      transition: (theme) => theme.transitions.create('opacity', {
        duration: 250,
        easing: theme.transitions.easing.easeInOut,
      }),
    },
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: '2px solid',
      borderColor: '#EBEBEB',
      borderRadius: '10px',
      backgroundColor: '#1E1E1E',
      boxShadow: 24,
    },
  }

  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [addedToList, setAddedToList] = useState(null);
  const [mediaSrcList, setMediaSrcList] = useState([]);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const likeBtn = useRef();
  const dislikeBtn = useRef();

  const modal = useRef();
  const seasonsDrawer = useRef();

  const navigate = useNavigate();

  const getDetails = async () => {
    const res = await getMediaDetails(mediaData._id);
    console.log(res.data);
    setDetails(res.data);
  }

  const getFeedback = async () => {
    console.log('getting feedback')
    const res = await getUserFeedback(mediaData._id);
    if (res.data.found) {
      setFeedback(res.data.feedback);
    }
  }

  const getInList = async () => {
    const res = await getMediaInList(mediaData._id);
    setAddedToList(res.data);
  }

  const getMediaSrcList = async () => {
    const res = await getMediaSrcsAndProgress(mediaData._id);
    const mediaSrcs = res.data;
    console.log(mediaSrcs);
    setMediaSrcList(mediaSrcs);
  }

  const handleClick = () => {
    console.log(mediaData.title);
    if (!details) getDetails();
    getFeedback();
    getInList();
    getMediaSrcList();
    handleOpen();
  }

  const handlePlay = (season, episode) => {
    navigate(`/watch/${mediaSrcList.mediaSrcs[season][episode]._id}/${mediaSrcList.seasonsProgress[season][episode]}`);
  }

  const getCurrentEpisode = () => {
    let currentSeason = mediaSrcList.mediaSrcs.length - 1;
    let currentEpisode = mediaSrcList.mediaSrcs[currentSeason].length - 1;
    let found = false;

    while (currentSeason >= 0 && !found) {

      currentEpisode = mediaSrcList.mediaSrcs[currentSeason].length - 1;

      while (currentEpisode >= 0) {

        if (mediaSrcList.seasonsProgress[currentSeason][currentEpisode] === 100) {
          if (currentEpisode === (mediaSrcList.mediaSrcs[currentSeason].length - 1)) {
            currentEpisode = 0;
            if (currentSeason === mediaSrcList.mediaSrcs.length - 1) {
              currentSeason = 0;
            } else {
              currentSeason++;
            }
          } else {
            currentEpisode++;
          }
          found = true;
          break;
        }

        if (mediaSrcList.seasonsProgress[currentSeason][currentEpisode] !== 0) {
          found = true;
          break;
        }

        currentEpisode--;
      }
      if(found) break;
      
      currentSeason--;
    }

    if (!found) {
      currentSeason = 0;
      currentEpisode = 0;
    }

    return [currentSeason, currentEpisode];
  }

  const handlePlayCurrent = () => {
    if (mediaData.type === 'Movie') {
      navigate(`/watch/${mediaSrcList.mediaSrcs[0][0]._id}/${mediaSrcList.seasonsProgress[0][0]}`);
    } else {
      const [currentSeason, currentEpisode] = getCurrentEpisode();
      console.log('Found:', [currentSeason, currentEpisode])
      navigate(`/watch/${mediaSrcList.mediaSrcs[currentSeason][currentEpisode]._id}/${mediaSrcList.seasonsProgress[currentSeason][currentEpisode]}`);
    }
  }

  const handleLikeClick = () => {
    if (feedback === null) {
      putFeedback(mediaData._id, true);
      setFeedback(true);
      dislikeBtn.current.style.display = 'none';
    } else {
      deleteFeedback(mediaData._id);
      setFeedback(null);
      dislikeBtn.current.style.display = '';
    }
  }

  const handleDislikeClick = () => {
    if (feedback === null) {
      putFeedback(mediaData._id, false);
      setFeedback(false);
      likeBtn.current.style.display = 'none';
    } else {
      deleteFeedback(mediaData._id);
      setFeedback(null);
      likeBtn.current.style.display = '';
    }
  }

  const handleAdd = () => {
    putMediaInList(mediaData._id);
    setAddedToList(true);
  }

  const handleRemove = () => {
    console.log('Trying to remove.')
    deleteMediaFromList(mediaData._id);
    setAddedToList(false);
  }

  const handleDrawerClick = () => {
    if (!drawerIsOpen) {
      modal.current.style.transform = 'translate(-70%, -50%)';
      seasonsDrawer.current.style.transform = 'translate(99%, 0)';
      setDrawerIsOpen(true);
    } else {
      modal.current.style.transform = 'translate(-50%, -50%)';
      seasonsDrawer.current.style.transform = 'translate(0, 0)';
      setDrawerIsOpen(false);
    }
  }

  const handleAccordionChange = (season) => (event, isExpanded) => {
    setExpanded(isExpanded ? season : false )
  }

  // useEffect( () => {
  //   if (details) getMediaSrcList();
  // }, [details]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setDrawerIsOpen(false);
    return setOpen(false);
  };

  return (
    <>
    <Box sx={style.card} onClick={handleClick}>
      <CardMedia sx={style.poster} component="img" width="200px" image={mediaData.poster ?? ''} />
      <Box className='label' sx={style.label} >
        <Typography sx={style.label.title}>{mediaData.title}</Typography>
      </Box>
    </Box>
    <Modal open={open} onClose={handleClose} disableAutoFocus={true} >
      <Box width='700px' height='600px' ref={modal} sx={{ 
        boxSizing: 'border-box',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',

        transition: (theme) => theme.transitions.create('transform', {
          duration: 275,
          easing: theme.transitions.easing.easeInOut,
        }),
      }}>
        <Box sx={{ 
          // ...style.modal,
          position: 'absolute',
          // top: '50%',
          // left: '50%',
          // transform: 'translate(-50%, -50%)',
          border: '2px solid',
          borderColor: '#EBEBEB',
          borderRadius: '10px',
          boxSizing: 'border-box',
          boxShadow: 24,
          backgroundColor: '#1E1E1E',
          zIndex: 100,
          minWidth: '700px',
        }}>
          <Box sx={{ display: 'flex' }}> {/* Modal main content */}
            <Box component="img" src={mediaData.poster ?? ''} maxWidth='350px' sx={{ borderTopLeftRadius: '10px' }}/>
            <Box sx={{ p: 2, width: '100%'}}>
              <Box sx={{ justifyContent: 'space-around', display: 'flex' }} >
                <IconButton size='large' color='primary' onClick={handlePlayCurrent}>
                  <PlayCircleFilledIcon fontSize='large' />
                </IconButton>
                <IconButton size='large' color='primary' onClick={addedToList ? handleRemove : handleAdd }>
                  { addedToList ?
                    <RemoveIcon fontSize='large' />
                    :
                    <AddIcon fontSize='large' />
                  }
                </IconButton>
                <Box width={'120px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                  <IconButton size='large' color='primary' onClick={handleLikeClick} ref={likeBtn} >
                    {
                      feedback === true ?
                      <ThumbUpIcon fontSize='large' color='accent' />
                      :
                      (feedback === null) ? <ThumbUpOffAltIcon fontSize='large' /> : <></>
                    }
                  </IconButton>
                  <IconButton size='large' color='primary' onClick={handleDislikeClick} ref={dislikeBtn}>
                    {
                      feedback === false ?
                      <ThumbDownIcon fontSize='large' color='error' />
                      :
                      (feedback === null) ? <ThumbDownOffAltIcon fontSize='large' /> : <></>
                    }
                  </IconButton>
                </Box>
              </Box>
              <Box>
                <Typography variant='h6' color='primary' >Synopsis</Typography>
                <Typography color='primary' variant='body2' >
                {details ? `${details.overview}` : '' }
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ p: 2, }}> {/* Modal media title */}
            <Typography variant='h4' fontWeight='500' color='primary.main'>{mediaData.title} {details ? `[${details.release_date.slice(0,4)}]` : '' }</Typography>
          </Box>
        </Box>

        { 
          (mediaData.type === 'Show') ?
            <Box 
              ref={seasonsDrawer}
              sx={{
                position: 'absolute',
                width: '300px',
                height: '500px',
                zIndex: 98,

                top: 50,
                right: 0,

                border: '2px solid',
                borderColor: 'primary.main',
                borderRadius: '0 10px 10px 0',

                backgroundColor: 'secondary.dark',

                transition: (theme) => theme.transitions.create('transform', {
                  duration: 275,
                  easing: theme.transitions.easing.easeInOut,
                }),
              }}
            >
              <Box height='100%' p='8px' sx={{ overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', }} >
                {
                  // Accordion

                  (mediaSrcList.mediaSrcs) ?
                    mediaSrcList.mediaSrcs.map( (season, seasonIndex) => {
                      return (
                        <Accordion key={seasonIndex} expanded={expanded === 'season' + (seasonIndex + 1)} onChange={handleAccordionChange('season' + (seasonIndex + 1))} sx={{ backgroundColor: 'secondary.darkish' }} >

                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon color='primary' />}
                          >
                            <Typography variant='h6' color='primary' >Season {seasonIndex + 1}</Typography>
                          </AccordionSummary>

                          {
                            season.map( (episode, epIndex) => {
                              return (
                                <AccordionDetails key={epIndex} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px', pl: '8px' }} >
                                  <Typography color='primary' variant='body1' noWrap >{(epIndex + 1) + '. ' + episode.title}</Typography>
                                  <IconButton onClick={ () => handlePlay(seasonIndex, epIndex)} >
                                    <PlayCircleFilledIcon color='primary' fontSize='large'/>
                                    {
                                      (mediaSrcList && mediaSrcList.seasonsProgress[seasonIndex][epIndex] !== 0) ?
                                        (mediaSrcList.seasonsProgress[seasonIndex][epIndex] === 100) ?
                                          <CheckCircleIcon fontSize='small' color='accent' sx={{position: 'absolute', top: 5, right: 0}} />
                                        :
                                          <PendingIcon fontSize='small' sx={{ color: 'error.light', position: 'absolute', top: 5, right: 0}} />
                                      :
                                      <></>
                                    }
                                    
                                  </IconButton>
                                </AccordionDetails>
                              )
                            })
                          }

                        </Accordion>
                      )
                    })
                  :
                    <></>
                  
                }
              </Box>

              <Box    // Open/Close tag
                sx={{
                  position: 'absolute',
                  backgroundColor: 'secondary.main',
                  width: 50,
                  height: 40,
                  top: 230,
                  right: -36,
                  
                  zIndex: 95,

                  border: '2px solid',
                  borderColor: 'primary.main',
                  borderRadius: '0 10px 10px 0',

                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',

                  padding: '5px',
                  
                  cursor: 'pointer',

                  transition: (theme) => theme.transitions.create('backgroundColor', {
                    duration: 175,
                    easing: theme.transitions.easing.easeInOut,
                  }),

                  "&:hover": {
                    backgroundColor: 'secondary.light',
                  },
                }}

                onClick={handleDrawerClick}
              >
                <FormatListBulletedIcon color='primary' />
              </Box>
            </Box>
          :
          <></>
        }



      </Box>
    </Modal>
    </>
  );

}