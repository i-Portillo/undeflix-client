import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'

export default function CardList({ cards, mode }) {

  return (
    ((cards.filter(card => (mode === 'All' || mode === (card.type + 's'))).length > 0 ) ?
      <Box display='grid' gridTemplateColumns="repeat(auto-fit, 200px)" gap={2}>
        {
          cards.filter(card => (mode === 'All' || mode === (card.type + 's')) )
          .map( card => <Card key={card._id} mediaData={card} />)
        }
      </Box>
      :
      <Box sx={{ mt: 15, display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center'}} >
        <Typography variant='h4' color='primary.main' >Nothing to see here...</Typography>
        <Typography variant='h4' color='primary.main' component={Link} to={'/catalog'} sx={{ fontWeight: 600, textDecoration: 'none' }} >Keep exploring</Typography>
      </Box>
    )
  )
}
