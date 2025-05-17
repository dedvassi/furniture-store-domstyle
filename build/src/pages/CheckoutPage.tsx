import React from 'react';
import { Box, Typography, Grid, Paper, Stepper, Step, StepLabel, Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Divider } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotalAmount } from '../features/cart/cartSlice';
import { useCreateOrderMutation } from '../services/orderApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import CheckoutSummary from '../components/checkout/CheckoutSummary';
import PaymentMethod from '../components/checkout/PaymentMethod';
import OrderSuccess from '../components/checkout/OrderSuccess';

const steps = ['Информация о доставке', 'Способ оплаты', 'Подтверждение заказа'];

const schema = yup.object({
  firstName: yup.string().required('Имя обязательно'),
  lastName: yup.string().required('Фамилия обязательна'),
  email: yup.string().email('Введите корректный email').required('Email обязателен'),
  phone: yup.string().required('Телефон обязателен'),
  address: yup.string().required('Адрес обязателен'),
  city: yup.string().required('Город обязателен'),
  postalCode: yup.string().required('Индекс обязателен'),
  deliveryMethod: yup.string().required('Выберите способ доставки'),
});

const CheckoutPage: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [paymentMethod, setPaymentMethod] = React.useState('card');
  const [orderId, setOrderId] = React.useState<number | null>(null);
  
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      deliveryMethod: 'standard',
    }
  });
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };
  
  const onSubmit = async (data: any) => {
    if (activeStep === 0) {
      handleNext();
    } else if (activeStep === 1) {
      handleNext();
    } else if (activeStep === 2) {
      try {
        // Создаем заказ
        const orderData = {
          user_id: user?.id || 0,
          status: 'pending',
          total_amount: totalAmount,
          shipping_address: `${data.address}, ${data.city}, ${data.postalCode}`,
          billing_address: `${data.address}, ${data.city}, ${data.postalCode}`,
          payment_method: paymentMethod,
          items: cartItems.map(item => ({
            product_id: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        };
        
        const result = await createOrder(orderData).unwrap();
        setOrderId(result.id);
        handleNext();
      } catch (error) {
        console.error('Failed to create order:', error);
      }
    }
  };
  
  // Если корзина пуста, перенаправляем на страницу корзины
  React.useEffect(() => {
    if (cartItems.length === 0 && activeStep !== 3) {
      navigate('/cart');
    }
  }, [cartItems, navigate, activeStep]);
  
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
        Оформление заказа
      </Typography>
      
      <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {activeStep === 3 ? (
        <OrderSuccess orderId={orderId} />
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper variant="outlined" sx={{ p: 3 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                {activeStep === 0 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Информация о получателе
                    </Typography>
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="firstName"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Имя"
                              fullWidth
                              error={!!errors.firstName}
                              helperText={errors.firstName?.message}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="lastName"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Фамилия"
                              fullWidth
                              error={!!errors.lastName}
                              helperText={errors.lastName?.message}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="email"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Email"
                              fullWidth
                              error={!!errors.email}
                              helperText={errors.email?.message}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="phone"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Телефон"
                              fullWidth
                              error={!!errors.phone}
                              helperText={errors.phone?.message}
                            />
                          )}
                        />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" gutterBottom>
                          Адрес доставки
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Controller
                          name="address"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Адрес"
                              fullWidth
                              error={!!errors.address}
                              helperText={errors.address?.message}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="city"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Город"
                              fullWidth
                              error={!!errors.city}
                              helperText={errors.city?.message}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="postalCode"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Почтовый индекс"
                              fullWidth
                              error={!!errors.postalCode}
                              helperText={errors.postalCode?.message}
                            />
                          )}
                        />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" gutterBottom>
                          Способ доставки
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Controller
                          name="deliveryMethod"
                          control={control}
                          render={({ field }) => (
                            <FormControl fullWidth error={!!errors.deliveryMethod}>
                              <InputLabel id="delivery-method-label">Способ доставки</InputLabel>
                              <Select
                                {...field}
                                labelId="delivery-method-label"
                                label="Способ доставки"
                              >
                                <MenuItem value="standard">Стандартная доставка (3-5 дней) - 500 ₽</MenuItem>
                                <MenuItem value="express">Экспресс-доставка (1-2 дня) - 1000 ₽</MenuItem>
                                <MenuItem value="pickup">Самовывоз из магазина - Бесплатно</MenuItem>
                              </Select>
                              {errors.deliveryMethod && (
                                <FormHelperText>{errors.deliveryMethod.message}</FormHelperText>
                              )}
                            </FormControl>
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}
                
                {activeStep === 1 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Способ оплаты
                    </Typography>
                    
                    <PaymentMethod
                      selectedMethod={paymentMethod}
                      onMethodChange={handlePaymentMethodChange}
                    />
                  </Box>
                )}
                
                {activeStep === 2 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Подтверждение заказа
                    </Typography>
                    
                    <Typography variant="body1" paragraph>
                      Пожалуйста, проверьте информацию о заказе перед подтверждением.
                    </Typography>
                    
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Товары в заказе:
                      </Typography>
                      
                      {cartItems.map((item) => (
                        <Box key={item.productId} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">
                            {item.name} x {item.quantity}
                          </Typography>
                          <Typography variant="body2" fontWeight="bold">
                            {(item.price * item.quantity).toLocaleString()} ₽
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Назад
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isLoading}
                  >
                    {activeStep === 2 ? 'Подтвердить заказ' : 'Продолжить'}
                  </Button>
                </Box>
              </form>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <CheckoutSummary 
              cartItems={cartItems} 
              totalAmount={totalAmount} 
              deliveryMethod={activeStep >= 1 ? 'standard' : undefined}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default CheckoutPage;
