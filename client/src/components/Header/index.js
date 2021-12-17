import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import HomeIcon from '@mui/icons-material/Home';
import UserBookCart from '../UserBookCart';
import {
  ThemeProvider,
  createTheme,
  Backdrop 
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search , SearchIconWrapper, StyledInputBase} from './styles'
import { connect } from 'react-redux';
import {
  addtoSearch,
} from '../../redux';


const Header = ({bookCart , addtoSearch }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [show , setShow ] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [ open ,setOpen ] = useState(false);
  const [ search , setSearch ] = useState('');
  const handleClose = () =>{
    setOpen(false);
    setShow(false);
  }
  const handleShowClick = () =>{
    setOpen(true);
    setShow(true);
  }
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleAccountClick = () =>{
    if(localStorage.getItem('token') !== null)
      navigate('/myaccount');
    else
      navigate('/login');
    handleMenuClose();
  }
  const handleLogout = () =>{
    localStorage.removeItem('token');
    navigate('/');
  }
  const handleSearchClick =() =>{
      if(search.length > 3 ){
          navigate(`/search/${search}`);
      }
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleAccountClick}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const theme = createTheme({
      palette: {
        primary : {
          main : '#e53935'
        },
        secondary : {
          main : '#2196f3'          
        }
      },
  })

  return (
    <ThemeProvider theme = { theme }>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ ml: 4 }}
            >
              <HomeIcon onClick = {()=>navigate('/')}/>
            </IconButton>
            <Search>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value = {search}
                onChange = {(e) => setSearch(e.target.value)}
              />
              <SearchIcon onClick = {handleSearchClick}/>
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
            <Box>
            <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleShowClick}
                color="inherit"
              >
              <Badge badgeContent={bookCart.length} color="secondary">
                <ShoppingCartOutlinedIcon/>
              </Badge>
            </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        { show && 
          <UserBookCart
            open = {open}
            handleClose = {handleClose}
            BackDrop = {Backdrop}
          />
        }
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </ThemeProvider>
  );
}
const mapStateToProps = state => {
  return {
    bookCart: state.bookCart.item,
  }
}
const mapDispatchToProps = dispatch =>{
    return{
      addtoSearch : (payload)=>dispatch(addtoSearch(payload))
    }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)