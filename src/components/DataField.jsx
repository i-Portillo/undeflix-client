import { Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

export default function DataField({ name, label, type, selectValues, value, defaultValue, isEditing=false, onChange, children }) {

  const style = {
    textField : {
      width: '100%',
      "& .MuiInputBase-input": { // For text color
        color: 'secondary.dark',
      },
      "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: 'black'
      }
    }
  }

  const [selectedGenres, setSelectedGenres] = useState(value);

  const field = () => {
    switch(type) {
      case 'text':
        return (
          <TextField
            name={name}
            value={value}
            disabled= {!isEditing}
            sx={ style.textField }
            InputProps={{ disableUnderline: (!isEditing), autoComplete: 'new-password' }}
            variant='standard'
            onChange={onChange}
          />
        )
      case 'password':
        return (
          <TextField
            name={name}
            value={value}
            type='password'
            disabled= {!isEditing}
            sx={ style.textField }
            InputProps={{ disableUnderline: (!isEditing), autoComplete: 'new-password' }}
            variant='standard'
            onChange={onChange}
          />
        )
      case 'textArea':
        return (
          <TextField
            name={name}
            value={value}
            multiline
            rows={4}
            disabled= {!isEditing}
            sx={ style.textField }
            InputProps={{ disableUnderline: (!isEditing), autoComplete: 'new-password' }}
            variant='standard'
            onChange={onChange}
          />
        )
      case 'select':
        return (
          <Select 
            name={name}
            value={value}
            defaultValue={defaultValue}
            disabled={!isEditing}
            onChange={onChange}
            sx={{ 
              '& .MuiInputBase-input': {
                color: 'secondary.dark',
                padding: '4px 8px 4px 8px',
                minWidth: '70px',
              },
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: 'black',
              }
            }}
          >
            {
              selectValues.map( selectValue => {
                return <MenuItem key={selectValue} value={selectValue}>{selectValue}</MenuItem>
              })
            }
          </Select>
        )
      case 'multipleSelect':
        const handleChange = (event) => {
          const {
            target: { value },
          } = event;
          setSelectedGenres(
            typeof value === 'string' ? value.split(', ') : value,
          )
          onChange(value);
        }
        
        return (
          <Select 
            multiple
            displayEmpty
            disabled={!isEditing}
            value={selectedGenres}
            onChange={handleChange}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>No genres selected</em>;
              }
              return selected.join(', ');
            }}
            sx={{ 
              '& .MuiInputBase-input': {
                color: 'secondary.dark',
                padding: '4px 8px 4px 8px',
                minWidth: '420px',
                maxWidth: '420px',
              },
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: 'black',
              },
            }}
          >
            {
              selectValues.map( genre => (
                <MenuItem 
                  key={genre}
                  value={genre}
                  sx={{
                    fontWeight: selectedGenres.indexOf(genre) === -1 ? 400 : 800,
                  }}
                >
                  {genre}
                </MenuItem>
              ))
            }
          </Select>
        )
      default:
        return children;
    }
  }

  return (
    <>
      <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: (type === 'text') ? 'center' : 'flex-stat' }}>
        <Typography fontWeight={700} >{label}</Typography>
      </Grid>
      <Grid item xs={9}>
        { field() }
      </Grid>
    </>
  )
}
