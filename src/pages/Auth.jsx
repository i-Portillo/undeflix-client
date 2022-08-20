import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Paper, Typography, Button, Container, TextField, Grid } from '@mui/material';

import { checkAuth, postUser, signIn, signUp } from '../api/index.js';

const initialFormData = {
  email: '',
  password: '',
  confirm: '',
  name: '',
  family_name: '',
  // role: 'user',
  // subscription_status: 'Active',
  bank_details: '',
  state: '',
  city: '',
  address: '',
  zip_code: '',
}

const Auth = () => {

  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if (!isSignup) {
        await signIn(formData);
        navigate('/catalog');
      } else {
        if (  // TODO: Proper validation
          formData.email !== '' &&
          formData.password !== '' &&
          formData.bank_details !== '' &&
          formData.password === formData.confirm 
        ) {
          formData.role = 'user';
          formData.subscription_status = 'Active';
          const res = await postUser(formData);
          if (res.status === 200) {
            await signIn(formData);
            navigate('/catalog');
          } else {
            throw new Error(res.data.message);
          }
        }
      }
    } catch(err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  }

  const style = {
    paper: {
      padding: 2,
      marginTop: 10,
    },
    title: {
      color: 'secondary.main',
      marginBottom: 2
    },
    submit: {
      marginTop: 2
    },
    switchBtn: {
      color: 'secondary.main',
      marginTop: 1
    }
  }

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const res = await checkAuth();
        if (res.status === 200) {
          navigate('/catalog')
        }
      } catch(err) {
        
      }
    }
    isLoggedIn();
  }, [])

  return (

    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={style.paper}>
        <Typography variant='h3' sx={style.title}>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup &&
              <>
                <Grid item xs={6}>
                  <TextField fullWidth name="name" label="First Name" onChange={handleChange} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth name="family_name" label="Family Name" onChange={handleChange} />
                </Grid>
              </>
            }
            <Grid item xs={12}>
              <TextField fullWidth name="email" label="Email Address" onChange={handleChange} type="email" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth name="password" label="Password" onChange={handleChange} type="password" />
            </Grid>
            { isSignup &&
              <>
                <Grid item xs={12}>
                  <TextField fullWidth name="confirm" label="Repeat Password" onChange={handleChange} type="password" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth name="bank_details" label="Bank Details" onChange={handleChange} type="text" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth name="state" label="State" onChange={handleChange} type="text" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth name="city" label="City" onChange={handleChange} type="text" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth name="address" label="Address" onChange={handleChange} type="text" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth name="zip_code" label="Zip Code" onChange={handleChange} type="text" />
                </Grid>
              </>
            }
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={style.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button fullWidth onClick={switchMode} color="primary" sx={style.switchBtn}>
                { isSignup ? "Already have a member? Sign In" : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>

  )
}

export default Auth;