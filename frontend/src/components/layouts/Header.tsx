import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Box, Container, Menu, MenuItem, Avatar, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, useMediaQuery, useTheme, InputBase, alpha } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItemsCount } from '../../features/cart/cartSlice';
import { useAuth } from '../../contexts/AuthContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const cartItemsCount = useSelector(selectCartItemsCount);
  
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const isMenuOpen = Boolean(anchorEl);
  
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/catalog?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
  };
  
  const handleLogout = () => {
    logout();
    handleMenuClose();
  };
  
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
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
      {user ? (
        [
          <MenuItem key="profile" onClick={() => { navigate('/profile'); handleMenuClose(); }}>
            Мой профиль
          </MenuItem>,
          <MenuItem key="orders" onClick={() => { navigate('/profile?tab=orders'); handleMenuClose(); }}>
            Мои заказы
          </MenuItem>,
          <MenuItem key="projects" onClick={() => { navigate('/profile?tab=projects'); handleMenuClose(); }}>
            Мои проекты
          </MenuItem>,
          <MenuItem key="favorites" onClick={() => { navigate('/profile?tab=favorites'); handleMenuClose(); }}>
            Избранное
          </MenuItem>,
          <Divider key="divider" />,
          <MenuItem key="logout" onClick={handleLogout}>
            Выйти
          </MenuItem>
        ]
      ) : (
        [
          <MenuItem key="login" onClick={() => { navigate('/login'); handleMenuClose(); }}>
            Войти
          </MenuItem>,
          <MenuItem key="register" onClick={() => { navigate('/register'); handleMenuClose(); }}>
            Зарегистрироваться
          </MenuItem>
        ]
      )}
    </Menu>
  );
  
  const mobileMenu = (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
      sx={{
        '& .MuiDrawer-paper': { 
          width: '80%', 
          maxWidth: 300,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={handleMobileMenuToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Box sx={{ p: 2 }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Поиск товаров..."
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearch}
          />
        </Search>
      </Box>
      
      <Divider />
      
      <List>
        <ListItem button component={RouterLink} to="/" onClick={handleMobileMenuToggle}>
          <ListItemText primary="Главная" />
        </ListItem>
        <ListItem button component={RouterLink} to="/catalog" onClick={handleMobileMenuToggle}>
          <ListItemText primary="Каталог" />
        </ListItem>
        <ListItem button component={RouterLink} to="/interior-designer" onClick={handleMobileMenuToggle}>
          <ListItemText primary="Дизайнер интерьера" />
        </ListItem>
        <ListItem button component={RouterLink} to="/community" onClick={handleMobileMenuToggle}>
          <ListItemText primary="Сообщество" />
        </ListItem>
        <ListItem button component={RouterLink} to="/loyalty" onClick={handleMobileMenuToggle}>
          <ListItemText primary="Программа лояльности" />
        </ListItem>
      </List>
      
      <Divider />
      
      <List>
        {user ? (
          <>
            <ListItem button component={RouterLink} to="/profile" onClick={handleMobileMenuToggle}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Мой профиль" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Выйти" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={RouterLink} to="/login" onClick={handleMobileMenuToggle}>
              <ListItemText primary="Войти" />
            </ListItem>
            <ListItem button component={RouterLink} to="/register" onClick={handleMobileMenuToggle}>
              <ListItemText primary="Зарегистрироваться" />
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );
  
  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ backgroundColor: 'background.paper' }}>
      <Container>
        <Toolbar disableGutters>
          {/* Логотип */}
          <Typography
            variant="h5"
            component={RouterLink}
            to="/"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
              flexGrow: { xs: 1, md: 0 },
              mr: { md: 4 }
            }}
          >
            ДомСтиль
          </Typography>
          
          {/* Навигация для десктопа */}
          {!isMobile && (
            <>
              <Button 
                component={RouterLink} 
                to="/catalog" 
                color="inherit"
                sx={{ mx: 1 }}
              >
                Каталог
              </Button>
              <Button 
                component={RouterLink} 
                to="/interior-designer" 
                color="inherit"
                sx={{ mx: 1 }}
              >
                Дизайнер интерьера
              </Button>
              <Button 
                component={RouterLink} 
                to="/community" 
                color="inherit"
                sx={{ mx: 1 }}
              >
                Сообщество
              </Button>
              <Button 
                component={RouterLink} 
                to="/loyalty" 
                color="inherit"
                sx={{ mx: 1 }}
              >
                Программа лояльности
              </Button>
              
              <Box sx={{ flexGrow: 1 }} />
              
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Поиск товаров..."
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearch}
                />
              </Search>
            </>
          )}
          
          {/* Иконки справа */}
          <Box sx={{ display: 'flex' }}>
            <IconButton
              color="inherit"
              component={RouterLink}
              to="/cart"
            >
              <Badge badgeContent={cartItemsCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            
            {!isMobile && (
              <IconButton
                color="inherit"
                component={RouterLink}
                to="/profile?tab=favorites"
              >
                <FavoriteIcon />
              </IconButton>
            )}
            
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {user ? (
                <Avatar 
                  alt={`${user.first_name} ${user.last_name}`} 
                  src={user.avatar || undefined}
                  sx={{ width: 32, height: 32 }}
                />
              ) : (
                <AccountCircleIcon />
              )}
            </IconButton>
            
            {isMobile && (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="open drawer"
                onClick={handleMobileMenuToggle}
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>
      {renderMenu}
      {mobileMenu}
    </AppBar>
  );
};

export default Header;
