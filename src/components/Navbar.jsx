import { AccountCircle, Movie, Search } from '@mui/icons-material';
import { AppBar, Box, Button, Container, FormControl, IconButton, InputBase, InputLabel, Menu, MenuItem, Select, TextField, Toolbar, Typography } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { getGenres, getUser, getUserRole, signOut } from '../api';
import Dropdown from './Dropdown';

// import '../styles/Navbar.scss';

export default function Navbar() {

  const style = {
    menu: {
      '& MuiPaper-root': {
        backgroundColor: '#EBEBEB',
      }
    }
  }

  const navigate = useNavigate();

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [genres, setGenres] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect( () => {
    const fetchGenres = async () => {
      const res = await getGenres();
      const data = res.data.map( (genre) => genre.name )
      setGenres(data);
    }

    const fetchUser = async () => {
      const res = await getUserRole();
      setUserRole(res.data);
    }

    fetchGenres();
    fetchUser();
  }, []);

  const handleMenu = (e) => {
    setMenuAnchor(e.target);
  }

  const handleBrowse = (genre) => {
    navigate(`/browse/genre/${genre}`);
  }

  const handleClose = () => {
    setMenuAnchor(null);
  }

  const handleLogOut = () => {
    signOut();
    sessionStorage.clear();
    navigate('/');
  }

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery !== '') navigate(`/browse/search/${searchQuery}`);
  }

  return (
    <AppBar position='static' color='primary' >
      <Container disableGutters maxWidth={false} sx={{ m: 0 }}>
        <Toolbar disableGutters sx={{ml: '100px', mr: '100px', justifyContent: 'space-between'}}>
          <Box style={{ display: 'flex', alignItems: 'center', flexGrow: 1}}>
            <Movie color='secondary' sx={{ mr: 1 }}/>
            <Typography 
              variant='h5'
              component={Link}
              to='/catalog'
              color='secondary'
              sx={{
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                letterSpacing: 3,
                mr: 2,
              }}
            >
              UNEDflix
            </Typography>

            <Box >
              <Button color='secondary' size='large' component={Link} to='/catalog/movies'>Movies</Button>
            </Box>
            <Box >
              <Button color='secondary' size='large' component={Link} to='/catalog/shows'>Shows</Button>
            </Box>
            <Box >
              <Button color='secondary' size='large' component={Link} to='/browse/list' sx={{minWidth: '85px'}}>My List</Button>
            </Box>
            <Box >
              <Dropdown label='Browse' values={genres} action={handleBrowse} />
            </Box>

            <Box display='flex' alignItems={'center'} justifyContent={'center'} style={{ borderRadius: '10px', width: '220px', height: '40px' }} >
              <Box>
              <form noValidate onSubmit={handleSearch}>
                <InputBase
                  id='search-bar'
                  sx={{
                    backgroundColor: 'primary.dark',
                    flex: 1,
                    padding: '4px',
                    pl: '12px',
                    borderRadius: '10px',
                    color: 'secondary.dark'
                  }}
                  endAdornment={<Search />}
                  onChange={handleQueryChange}
                />
              </form>
              </Box>
            </Box>

          </Box>

          <Box>
            <IconButton
              size='large'
              color='secondary'
              onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              sx={ style.menu }
              anchorEl={menuAnchor}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(menuAnchor)}
              onClose={handleClose}
              disableScrollLock={true}
            >
              <MenuItem onClick={handleClose} component={Link} to='/profile'>Profile</MenuItem>
              { (userRole === 'admin' || userRole === 'employee') ?
                  <MenuItem onClick={handleClose} component={Link} to='/dashboard'>Dashboard</MenuItem>
                : null
              }
              <MenuItem onClick={handleLogOut}>Log out</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
