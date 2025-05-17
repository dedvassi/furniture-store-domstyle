import React from 'react';
import { Box, Typography, Grid, Container, Button, Card, CardMedia, CardContent, CardActions, Paper, Divider, useTheme, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Компоненты
import HeroBanner from '../components/home/HeroBanner';
import FeaturedCategories from '../components/home/FeaturedCategories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import InteriorDesignerPromo from '../components/home/InteriorDesignerPromo';
import TestimonialSlider from '../components/home/TestimonialSlider';
import InstagramFeed from '../components/home/InstagramFeed';
import NewsletterSignup from '../components/home/NewsletterSignup';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box>
      {/* Главный баннер */}
      <HeroBanner />
      
      {/* Преимущества магазина */}
      <Box sx={{ py: 6, backgroundColor: 'background.paper' }}>
        <Container>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={0} sx={{ p: 3, textAlign: 'center', height: '100%', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ mb: 2, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/assets/icons/delivery.svg" alt="Доставка" height={50} />
                </Box>
                <Typography variant="h6" gutterBottom>Быстрая доставка</Typography>
                <Typography variant="body2" color="text.secondary">
                  Доставляем мебель по всей России в кратчайшие сроки
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={0} sx={{ p: 3, textAlign: 'center', height: '100%', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ mb: 2, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/assets/icons/quality.svg" alt="Качество" height={50} />
                </Box>
                <Typography variant="h6" gutterBottom>Гарантия качества</Typography>
                <Typography variant="body2" color="text.secondary">
                  Вся мебель проходит строгий контроль качества
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={0} sx={{ p: 3, textAlign: 'center', height: '100%', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ mb: 2, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/assets/icons/design.svg" alt="Дизайн" height={50} />
                </Box>
                <Typography variant="h6" gutterBottom>Дизайн интерьера</Typography>
                <Typography variant="body2" color="text.secondary">
                  Бесплатная консультация дизайнера при покупке
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={0} sx={{ p: 3, textAlign: 'center', height: '100%', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ mb: 2, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/assets/icons/payment.svg" alt="Оплата" height={50} />
                </Box>
                <Typography variant="h6" gutterBottom>Удобная оплата</Typography>
                <Typography variant="body2" color="text.secondary">
                  Различные способы оплаты, включая рассрочку
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Популярные категории */}
      <Box sx={{ py: 8 }}>
        <Container>
          <Typography 
            variant="h4" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{ 
              mb: 6, 
              fontFamily: '"Playfair Display", serif',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -16,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 3,
                backgroundColor: 'primary.main',
              }
            }}
          >
            Популярные категории
          </Typography>
          
          <FeaturedCategories />
        </Container>
      </Box>
      
      {/* Хиты продаж */}
      <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
        <Container>
          <Typography 
            variant="h4" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{ 
              mb: 6, 
              fontFamily: '"Playfair Display", serif',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -16,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 3,
                backgroundColor: 'primary.main',
              }
            }}
          >
            Хиты продаж
          </Typography>
          
          <FeaturedProducts />
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button 
              component={RouterLink} 
              to="/catalog" 
              variant="outlined" 
              color="primary" 
              size="large"
            >
              Перейти в каталог
            </Button>
          </Box>
        </Container>
      </Box>
      
      {/* Промо дизайнера интерьера */}
      <InteriorDesignerPromo />
      
      {/* Отзывы клиентов */}
      <Box sx={{ py: 8 }}>
        <Container>
          <Typography 
            variant="h4" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{ 
              mb: 6, 
              fontFamily: '"Playfair Display", serif',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -16,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 3,
                backgroundColor: 'primary.main',
              }
            }}
          >
            Отзывы наших клиентов
          </Typography>
          
          <TestimonialSlider />
        </Container>
      </Box>
      
      {/* Инстаграм-лента */}
      <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
        <Container>
          <Typography 
            variant="h4" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{ 
              mb: 2, 
              fontFamily: '"Playfair Display", serif',
            }}
          >
            Мы в Instagram
          </Typography>
          
          <Typography 
            variant="body1" 
            align="center" 
            color="text.secondary" 
            sx={{ mb: 6 }}
          >
            Подписывайтесь на наш Instagram и следите за новинками
          </Typography>
          
          <InstagramFeed />
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button 
              href="https://instagram.com/domstyle" 
              target="_blank"
              variant="outlined" 
              color="primary"
            >
              Подписаться
            </Button>
          </Box>
        </Container>
      </Box>
      
      {/* Подписка на рассылку */}
      <NewsletterSignup />
    </Box>
  );
};

export default HomePage;
