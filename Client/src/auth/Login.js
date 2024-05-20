import React from "react";
import { useEffect, useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import { setToken } from "./authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from "../designers/NavBar";
import SignUp from "./SignUp";
// import heLocale from 'date-fns/locale/he'; 
import DecodeToken from "./decodeToken";

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loginFunc, { isError, error, isSuccess, isLoading, data }] =
    useLoginMutation()
  useEffect(() => {
    if (isSuccess) {

      dispatch(setToken(data))
      const role = DecodeToken().roles
      console.log(`role is ${role} `)

      navigate("/HomePage", { replace: true })


      //לעשות שייכנס לפי הROLES של הבנאדם

      // if(data.roles!="headmaster")
      // {
      // navigate("/Nav_bar", { replace: true })
      // }
      // else{
      //   navigate("/HomePage_admin", { replace: true })
      // }
    }
  }, [isSuccess])
  // Function to handle form submission
  // const handleSubmit = (e) => {
  // e.preventDefault();
  // loginFunc(formData)
  // // navigate("/Nav_bar")
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    loginFunc({
      username: data.get('username'),
      password: data.get('password')
    })
    console.log({
      username: data.get('username'),
      password: data.get('password'),
    });
    //  navigate("/HomePage_admin", { replace: true })

  };
  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
Our Site        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  // TODO remove, this demo shouldn't need to reset the theme.

  const defaultTheme = createTheme();
  return (

    <ThemeProvider theme={defaultTheme} >
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
            כניסה
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              dir='rtl'
              margin="normal"
              required
              fullWidth
              id="username"
              label="שם משתמש"
              name="username"
              autoComplete="username"
              //check it....
              autoFocus
            />
            <TextField
              dir='rtl'
              margin="normal"
              required
              fullWidth
              name="password"
              label="סיסמא"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              dir='rtl'
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}

            >
              כניסה
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to={'/Register'} variant="body2" >
                  {"כניסת מנהלים  "}
                </Link>
              </Grid>
              <Grid item>
                <Link to={'/SignUp'}>
                  {"\n Don't have an account? "}
                  <span style={{  textDecoration: 'underline' }}>Sign Up</span>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};
export default Login;
// export const {loginFunc} = loginFunc;
