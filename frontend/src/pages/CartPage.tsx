import React from 'react';
import { Box, Typography, Grid, Paper, Button, Divider, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotalAmount, removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';
import EmptyCart from '../components/cart/EmptyCart';
import CartSummary from '../components/cart/CartSummary';
import RelatedProducts from '../components/product/RelatedProducts';

const CartPage: React.FC = () => {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const dispatch = useDispatch();
  
  const handleRemoveItem = (productId: number) => {
    dispatch(removeFromCart(productId));
  };
  
  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ productId, quantity }));
    }
  };
  
  if (cartItems.length === 0) {
    return <EmptyCart />;
  }
  
  return (
    <Box>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom
        sx={{ 
          mb: 4, 
          fontFamily: '"Playfair Display", serif',
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: -10,
            left: 0,
            width: 80,
            height: 3,
            backgroundColor: 'primary.main',
          }
        }}
      >
        Корзина
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Товар</TableCell>
                  <TableCell align="center">Цена</TableCell>
                  <TableCell align="center">Количество</TableCell>
                  <TableCell align="right">Сумма</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell component="th" scope="row">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          component="img"
                          src={item.image || '/assets/placeholder.jpg'}
                          alt={item.name}
                          sx={{ width: 80, height: 80, objectFit: 'cover', mr: 2 }}
                        />
                        <Box>
                          <Typography 
                            component={RouterLink} 
                            to={`/product/${item.slug}`}
                            sx={{ 
                              color: 'text.primary', 
                              textDecoration: 'none',
                              '&:hover': {
                                color: 'primary.main',
                                textDecoration: 'underline',
                              }
                            }}
                          >
                            {item.name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1">
                        {item.price.toLocaleString()} ₽
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconButton 
                          size="small"
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 2 }}>
                          {item.quantity}
                        </Typography>
                        <IconButton 
                          size="small"
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1" fontWeight="bold">
                        {(item.price * item.quantity).toLocaleString()} ₽
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton 
                        color="error"
                        onClick={() => handleRemoveItem(item.productId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button 
              component={RouterLink} 
              to="/catalog" 
              variant="outlined"
            >
              Продолжить покупки
            </Button>
            <Button 
              variant="outlined" 
              color="error"
              onClick={() => dispatch(clearCart())}
            >
              Очистить корзину
            </Button>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <CartSummary totalAmount={totalAmount} />
        </Grid>
      </Grid>
      
      {/* Рекомендуемые товары */}
      <Box sx={{ mt: 8 }}>
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom
          sx={{ 
            mb: 4, 
            fontFamily: '"Playfair Display", serif',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -10,
              left: 0,
              width: 60,
              height: 3,
              backgroundColor: 'primary.main',
            }
          }}
        >
          Вам также может понравиться
        </Typography>
        
        <RelatedProducts />
      </Box>
    </Box>
  );
};

export default CartPage;
