import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
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
import LogoutIcon from '@mui/icons-material/Logout';

function NavBar({ isAdmin = false }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    // Dispatch action to remove token when logging out
    dispatch(removeToken());
    // Redirect to login page after logging out
    navigate("/");
  };

  // Array to store navigation pages
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

  // Add Users page if isAdmin is true
  if (isAdmin) {
    pages.push({
      key: 'Users',
      name: 'Users',
      icon: <PersonIcon color='primary' />,
    })
  }

  // Handlers for opening and closing navigation menu
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const linkStyle = { my: 2, color: 'primary', display: 'block', margin: '0.5rem 0.5rem' }
  // Styling for active link
  const linkStyleActive = { borderBottom: '2px solid #1976d2', borderRadius: '0' }

  return (
    <AppBar position="static" >
      <Container maxWidth="100%" sx={{ backgroundColor: 'white' }}>
        <Toolbar disableGutters>
          {/* Navigation menu for small screens */}
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
              {/* Render navigation links */}
              {pages.map((page) => (
                <MenuItem key={page.key} onClick={handleCloseNavMenu}>
                  {page.icon}
                  <Link to={'/' + page.key} >
                    <label style={{ color: 'primary', marginLeft: '0.5rem' }}>{page.name}</label>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* Navigation links for large screens */}
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
        </Toolbar>
      </Container>
      {/* Logout button */}
      <Button
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          alignItems: 'center',
          position: 'absolute',
          top: '1.5%',
          right: '1.5%',
          padding: '1% 2%',
          borderRadius: '5%',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem'
        }}
        variant="contained"
        color="primary"
        onClick={handleLogoutClick}
      >
        <LogoutIcon />
        Logout
      </Button>
    </AppBar>
  );
}

export default NavBar