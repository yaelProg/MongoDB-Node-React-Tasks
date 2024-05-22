import React from "react";
import { useEffect, useState } from 'react'
import { useRegisterMutation } from './authApiSlice'
import { setToken } from './authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import IsraelFlag from '../designers/Dialogs/IsraelFlag.png'; // Assuming IsraelFlag component exists for displaying the flag
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputAdornment } from '@mui/material';

const Register = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [registerFunc, { isError, isSuccess, data, error }] = useRegisterMutation()

  const roles = ["user","admin"]

  useEffect(() => {
    if (isSuccess) {
      console.log('success!! goung to put token')
      dispatch(setToken(data))
      navigate("/HomePage", { replace: true })
    }
  }, [isSuccess])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let roles = data.get('roles')
    if (data.get('roles') != "user" && data.get('roles') != "admin") {
      roles = undefined
      console.log(roles)
    }
    if (!(data.get('generalPassword') && data.get('firstName') && data.get('lastName') && data.get('username') && data.get('password'))) {
      alert("Some required fields are missing")
      return
    }
    registerFunc({
      generalPassword: data.get('generalPassword'),
      username: data.get('username'),
      password: data.get('password'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      address: data.get('address'),
      phone: data.get('phone'),
      roles: roles
    })

    console.log({
      email: data.get('email'),
      roles: roles
    });
  };
  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Our Site © '}
        <Link color="inherit" href="https://mui.com/">
          Sari & Yaeli
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="generalPassword"
                  label="סיסמת הרשמה - בקש ממנהל המערכת"
                  type="generalPassword"
                  id="generalPassword"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="address"
                  label="Address"
                  type="address"
                  id="address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                  type="tel"
                  inputProps={{ inputMode: 'tel', pattern: '[0-9]{3}-[0-9]{7}' }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={IsraelFlag} alt="Israel Flag"
                          style={{ height: '20px', marginRight: '5px' }}
                        />
                        +972
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="roles"
                  label="Role"
                  name="roles"
                  autoComplete="roles"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item xs>
                <Link to={'/SignUp'} variant="body2" >
                  {"הרשמת משתמשים  "}
                </Link>
              </Grid>
              <Grid item>
                <Link to={'/Login'} >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Register;