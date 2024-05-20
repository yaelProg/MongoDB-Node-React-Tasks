import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../auth/authSlice";


function NavBar({ isAdmin = false }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    dispatch(removeToken());
    navigate("/");
  };
  let pages = [
    {
      key: 'HomePage',
      name: 'Home Page',
      icon: <HomeIcon color='primary' />
    },
    {
      key: 'Photos',
      name: 'Photos',
      icon: <InsertPhotoIcon color='primary' />
    },
    {
      key: 'Posts',
      name: 'Posts',
      icon: <TextSnippetIcon color='primary' />
    },
    {
      key: 'Todos',
      name: 'Todos',
      icon: <TaskAltIcon color='primary' />
    }
  ];

  if (isAdmin) {
    pages.push({
      key: 'Users',
      name: 'Users',
      icon: <PersonIcon color='primary' />,
    })
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);

  };

  const linkStyle = { my: 2, color: 'primary', display: 'block', margin: '0.5rem 0.5rem' }
  const linkStyleActive = { borderBottom: '2px solid #1976d2', borderRadius: '0' }

  return (

    <AppBar position="static">
      <Container maxWidth="xl" sx={{ backgroundColor: 'white' }}>
        <Toolbar disableGutters>
          {/* <Typography
          to = {'/'}
                variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color:'gray',
              
              textDecoration: 'none',
            }}
          >
            
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color='gray'
            >
              <MenuIcon />  {/* הכפתור של ה3 פסים */}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                ///here is the onclick of the nav items, done in a

                <MenuItem key={page.key} onClick={handleCloseNavMenu}>
                  {page.icon}
                  <Link to={'/' + page.key} >
                    <label style={{ color: 'primary', marginLeft: '0.5rem' }}>{page.name}</label>
                  </Link>
                  {/* {page.icon}

                  <Link to={'/' + page.key}>{page.name}</Link> */}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'gray',
              textDecoration: 'none',
            }}
          >
            
          </Typography> */}
          <Box sx={{ backgroundColor: 'white', width: '100%', flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                sx={window.location.href.endsWith(page.key) ? { ...linkStyle, ...linkStyleActive } : linkStyle}
              >
                <Link to={'/' + page.key} style={{ color: 'primary' }}>
                  <div>{page.icon}</div>
                  <div style={{ color: 'primary' }}>{page.name}</div>
                </Link>
              </Button>
            ))}
          </Box>

          { }
        </Toolbar>
      </Container>

      <Button
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          alignItems: 'center',
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        variant="contained"
        color="primary"
        onClick={handleLogoutClick}
      >
        Logout
      </Button>


    </AppBar>

  );

}
export default NavBar