import React from 'react';
import { Box, Typography, Container, Grid, Paper, Button, TextField, InputAdornment, IconButton, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link as RouterLink } from 'react-router-dom';

const FooterLink = styled(RouterLink)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
  },
  display: 'block',
  marginBottom: theme.spacing(1),
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.grey[700],
  marginRight: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', pt: 8, pb: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Логотип и описание */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
              <Typography 
                variant="h5" 
                component={RouterLink} 
                to="/"
                sx={{ 
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  color: 'primary.main',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                ДомСтиль
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              Мебельный магазин ДомСтиль предлагает широкий ассортимент качественной мебели для дома и офиса. Мы создаем уют и комфорт в вашем доме с 2010 года.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <SocialButton aria-label="facebook">
                <FacebookIcon fontSize="small" />
              </SocialButton>
              <SocialButton aria-label="twitter">
                <TwitterIcon fontSize="small" />
              </SocialButton>
              <SocialButton aria-label="instagram">
                <InstagramIcon fontSize="small" />
              </SocialButton>
              <SocialButton aria-label="pinterest">
                <PinterestIcon fontSize="small" />
              </SocialButton>
              <SocialButton aria-label="youtube">
                <YouTubeIcon fontSize="small" />
              </SocialButton>
            </Box>
          </Grid>
          
          {/* Навигация */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" gutterBottom>
              Каталог
            </Typography>
            <FooterLink to="/catalog?category=living-room">Гостиная</FooterLink>
            <FooterLink to="/catalog?category=bedroom">Спальня</FooterLink>
            <FooterLink to="/catalog?category=kitchen">Кухня</FooterLink>
            <FooterLink to="/catalog?category=office">Офис</FooterLink>
            <FooterLink to="/catalog?category=children">Детская</FooterLink>
            <FooterLink to="/catalog">Все категории</FooterLink>
          </Grid>
          
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" gutterBottom>
              Информация
            </Typography>
            <FooterLink to="/about">О компании</FooterLink>
            <FooterLink to="/delivery">Доставка и оплата</FooterLink>
            <FooterLink to="/returns">Возврат и обмен</FooterLink>
            <FooterLink to="/loyalty">Программа лояльности</FooterLink>
            <FooterLink to="/blog">Блог</FooterLink>
            <FooterLink to="/contacts">Контакты</FooterLink>
          </Grid>
          
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" gutterBottom>
              Сервисы
            </Typography>
            <FooterLink to="/interior-designer">Дизайнер интерьера</FooterLink>
            <FooterLink to="/virtual-showroom">Виртуальный шоурум</FooterLink>
            <FooterLink to="/community">Сообщество</FooterLink>
            <FooterLink to="/consultation">Консультация дизайнера</FooterLink>
            <FooterLink to="/assembly">Сборка мебели</FooterLink>
            <FooterLink to="/measurement">Замер помещения</FooterLink>
          </Grid>
          
          {/* Подписка на рассылку */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Подписка на новости
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Будьте в курсе новинок и акций
            </Typography>
            <Box component="form" noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1 }}
              >
                Подписаться
              </Button>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        {/* Нижняя часть футера */}
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} ДомСтиль. Все права защищены.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
            <FooterLink to="/privacy" sx={{ display: 'inline', mr: 2 }}>
              Политика конфиденциальности
            </FooterLink>
            <FooterLink to="/terms" sx={{ display: 'inline' }}>
              Условия использования
            </FooterLink>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
