import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

// Компоненты для главной страницы
import HeroBanner from '../components/home/HeroBanner';
import FeaturedProducts from '../components/home/FeaturedProducts';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
  },
}));

const FeatureIcon = styled('img')({
  width: 80,
  height: 80,
  marginBottom: 16,
});

const InteriorDesignerPage: React.FC = () => {
  return (
    <Box>
      {/* Главный баннер */}
      <Box 
        sx={{ 
          position: 'relative',
          height: { xs: 300, md: 500 },
          backgroundImage: 'url(/assets/images/interior-designer-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }
        }}
      >
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            color="common.white"
            sx={{ 
              fontWeight: 700,
              mb: 2,
              fontFamily: '"Playfair Display", serif',
            }}
          >
            Дизайнер интерьера
          </Typography>
          <Typography 
            variant="h5" 
            color="common.white"
            sx={{ mb: 4, maxWidth: 600 }}
          >
            Создайте интерьер своей мечты с нашим интерактивным дизайнером
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            component={RouterLink}
            to="/interior-designer/new"
            sx={{ 
              px: 4, 
              py: 1.5,
              fontSize: '1.1rem',
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
              }
            }}
          >
            Создать проект
          </Button>
        </Container>
      </Box>
      
      {/* Преимущества дизайнера интерьера */}
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
            Возможности дизайнера интерьера
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <StyledPaper elevation={2}>
                <FeatureIcon src="/assets/icons/3d-model.svg" alt="3D моделирование" />
                <Typography variant="h6" gutterBottom>
                  3D моделирование
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Создавайте реалистичные 3D модели вашего интерьера с точными размерами и пропорциями
                </Typography>
              </StyledPaper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <StyledPaper elevation={2}>
                <FeatureIcon src="/assets/icons/furniture-catalog.svg" alt="Каталог мебели" />
                <Typography variant="h6" gutterBottom>
                  Каталог мебели
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Выбирайте из тысяч предметов мебели и декора из нашего каталога для вашего проекта
                </Typography>
              </StyledPaper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <StyledPaper elevation={2}>
                <FeatureIcon src="/assets/icons/ar-view.svg" alt="AR просмотр" />
                <Typography variant="h6" gutterBottom>
                  AR просмотр
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Просматривайте ваш интерьер в дополненной реальности прямо у себя дома через мобильное приложение
                </Typography>
              </StyledPaper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Как это работает */}
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
            Как это работает
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Box 
                  sx={{ 
                    width: 60, 
                    height: 60, 
                    borderRadius: '50%', 
                    backgroundColor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  1
                </Box>
                <Typography variant="h6" gutterBottom>
                  Создайте проект
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Укажите размеры помещения и выберите стиль интерьера
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Box 
                  sx={{ 
                    width: 60, 
                    height: 60, 
                    borderRadius: '50%', 
                    backgroundColor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  2
                </Box>
                <Typography variant="h6" gutterBottom>
                  Добавьте мебель
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Выберите мебель из каталога и разместите её в вашем интерьере
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Box 
                  sx={{ 
                    width: 60, 
                    height: 60, 
                    borderRadius: '50%', 
                    backgroundColor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  3
                </Box>
                <Typography variant="h6" gutterBottom>
                  Настройте интерьер
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Изменяйте цвета, текстуры и расположение предметов в реальном времени
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Box 
                  sx={{ 
                    width: 60, 
                    height: 60, 
                    borderRadius: '50%', 
                    backgroundColor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  4
                </Box>
                <Typography variant="h6" gutterBottom>
                  Сохраните и закажите
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Сохраните проект и закажите выбранную мебель с доставкой
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button 
              variant="contained" 
              size="large"
              component={RouterLink}
              to="/interior-designer/new"
            >
              Начать проект
            </Button>
          </Box>
        </Container>
      </Box>
      
      {/* Примеры проектов */}
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
            Примеры проектов
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0} 
                variant="outlined"
                sx={{ 
                  borderRadius: 2,
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <Box 
                  component="img"
                  src="/assets/images/interior-example-1.jpg"
                  alt="Современная гостиная"
                  sx={{ 
                    width: '100%',
                    height: 240,
                    objectFit: 'cover',
                  }}
                />
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Современная гостиная
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Минималистичный дизайн с акцентом на функциональность и комфорт
                  </Typography>
                  <Button 
                    variant="outlined" 
                    component={RouterLink}
                    to="/interior-designer/example/1"
                  >
                    Посмотреть проект
                  </Button>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0} 
                variant="outlined"
                sx={{ 
                  borderRadius: 2,
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <Box 
                  component="img"
                  src="/assets/images/interior-example-2.jpg"
                  alt="Скандинавская спальня"
                  sx={{ 
                    width: '100%',
                    height: 240,
                    objectFit: 'cover',
                  }}
                />
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Скандинавская спальня
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Светлые тона, натуральные материалы и уютная атмосфера
                  </Typography>
                  <Button 
                    variant="outlined" 
                    component={RouterLink}
                    to="/interior-designer/example/2"
                  >
                    Посмотреть проект
                  </Button>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0} 
                variant="outlined"
                sx={{ 
                  borderRadius: 2,
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <Box 
                  component="img"
                  src="/assets/images/interior-example-3.jpg"
                  alt="Кухня-студия"
                  sx={{ 
                    width: '100%',
                    height: 240,
                    objectFit: 'cover',
                  }}
                />
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Кухня-студия
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Функциональное пространство с современной техникой и эргономичной планировкой
                  </Typography>
                  <Button 
                    variant="outlined" 
                    component={RouterLink}
                    to="/interior-designer/example/3"
                  >
                    Посмотреть проект
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Призыв к действию */}
      <Box 
        sx={{ 
          py: 8, 
          backgroundColor: 'primary.main',
          color: 'white',
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography 
                variant="h4" 
                component="h2" 
                gutterBottom
                sx={{ 
                  fontFamily: '"Playfair Display", serif',
                }}
              >
                Готовы создать интерьер своей мечты?
              </Typography>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'normal' }}>
                Начните проект прямо сейчас и воплотите свои идеи в реальность
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Button 
                variant="contained" 
                size="large"
                component={RouterLink}
                to="/interior-designer/new"
                sx={{ 
                  backgroundColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'grey.100',
                  }
                }}
              >
                Создать проект
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default InteriorDesignerPage;
