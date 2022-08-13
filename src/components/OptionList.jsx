import { Box, Divider, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import React, { useState } from 'react';

export default function OptionList({ options }) {

  const [selectedItem, setSelectedIndex] = useState(0);

  const style = {
    listItem : {
      color: 'secondary.main',
      transition: (theme) => theme.transitions.create('background-color', {
        duration: 250,
      }),
      "&.Mui-selected": {
        color: 'secondary.dark',
        backgroundColor: 'accent.main',
        fontWeight: 500,
        "&:hover": {
          backgroundColor: 'accent.dark'
        }
      }
    }
  }

  const handeListItemClick = (event, index) => {
    setSelectedIndex(index);
    options[index].onClick();
  }

  const optionList = options.map( (option, index) => {
    return (
      <ListItemButton
        key={option.text}
        sx={style.listItem}
        selected={ selectedItem === index }
        onClick={ (event) => handeListItemClick(event, index) }
      >
        <ListItemText primary={ option.text } primaryTypographyProps={{ fontWeight: 'inherit' }} />
      </ListItemButton>
    );
  })

  return (
    <Box
      sx={{ pl: 0, width: '100%', maxWidth: 180 }}
    >
      <List>
        {optionList}
        {/* <ListItemButton
          selected={true}
          onClick={ (event) => handeListItemClick(event, 0) }
        >
          <ListItemText primary={options[0].text} />
        </ListItemButton>
        <ListItemButton
          selected={false}
          onClick={ (event) => handeListItemClick(event, 1) }
        >
          <ListItemText primary={options[1].text} />
        </ListItemButton> */}
      </List>
    </Box>
  )
}
