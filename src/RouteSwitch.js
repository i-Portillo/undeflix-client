import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Billboard from './pages/Billboard';
import Browse from './pages/Browse';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Watch from './pages/Watch';
import Idle from './pages/Idle';
import Blocked from './pages/Blocked';

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Auth />} />
        <Route path='/idle' element={
            <PrivateRoute role='user'>
              <Idle />
            </PrivateRoute>
          } />
        <Route path='/blocked' element={
            <PrivateRoute role='user'>
              <Blocked />
            </PrivateRoute>
          } />
        <Route path='/catalog/movies' element={
          <PrivateRoute role='user' >
              <Navbar />
              <Billboard mode='Movies' />
            </PrivateRoute>
          } />
        <Route path='/catalog/shows' element={
          <PrivateRoute role='user' >
              <Navbar />
              <Billboard mode='Shows' />
            </PrivateRoute>
          } />
        <Route exact path='/catalog' element={
            <PrivateRoute role='user' >
              <Navbar />
              <Billboard mode='All' />
            </PrivateRoute>
          } />
        <Route path='/profile' element={
            <PrivateRoute role='user' >
              <Navbar />
              <Profile />
            </PrivateRoute>
          } />
        <Route path='/dashboard' element={
            <PrivateRoute role='employee' >
              <Navbar />
              <Dashboard />
            </PrivateRoute>
          } />
        <Route path='/browse/list' element={
            <PrivateRoute role='user' >
              <Navbar />
              <Browse category='list'/>
            </PrivateRoute>
        } />
        <Route path='/browse/movies' element={
            <PrivateRoute role='user' >
              <Navbar />
              <Browse category='movies'/>
            </PrivateRoute>
        } />
        <Route path='/browse/shows' element={
            <PrivateRoute role='user' >
              <Navbar />
              <Browse category='shows'/>
            </PrivateRoute>
        } />
        <Route path='/browse/genre/:genre' element={
            <PrivateRoute role='user' >
              <Navbar />
              <Browse category='genre'/>
            </PrivateRoute>
        } />
        <Route path='/browse/search/:query' element={
            <PrivateRoute role='user' >
              <Navbar />
              <Browse category='search'/>
            </PrivateRoute>
        } />
        <Route path='/watch/:id/:progress' element={
            <PrivateRoute role='user' >
              <Watch />
            </PrivateRoute>
          } />
        <Route path='*' element={
            <NotFound />
          } />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;