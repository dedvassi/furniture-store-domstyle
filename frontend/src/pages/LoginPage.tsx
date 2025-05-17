import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper, TextField, FormControlLabel, Checkbox, Link, Avatar, CircularProgress } from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';

const schema = yup.object({
  email: yup.string().email('Введите корректный email').required('Email обязателен'),
  password: yup.string().required('Пароль обязателен'),
});

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  
  // Получаем URL для перенаправления после входа
  const from = location.state?.from?.pathname || '/';
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    }
  });
  
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await login(data.email, data.password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка при входе');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Вход в аккаунт
        </Typography>
        
        {error && (
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 2, 
              mt: 2, 
              width: '100%', 
              bgcolor: 'error.light', 
              color: 'error.contrastText',
              borderColor: 'error.main'
            }}
          >
            <Typography variant="body2">{error}</Typography>
          </Paper>
        )}
        
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '100%' }}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
          
          <Controller
            name="remember"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} color="primary" />}
                label="Запомнить меня"
              />
            )}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Войти'}
          </Button>
          
          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/forgot-password" variant="body2">
                Забыли пароль?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                {"Нет аккаунта? Зарегистрироваться"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
