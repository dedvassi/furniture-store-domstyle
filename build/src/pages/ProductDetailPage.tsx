import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Breadcrumbs, Link, Button, Divider, Tabs, Tab, Paper, Chip, Rating } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedIcon from '@mui/icons-material/Verified';
import CreditCardIcon from '@mui/icons-material/CreditCard';

import { useGetProductBySlugQuery } from '../services/catalogApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import ProductImageGallery from '../components/product/ProductImageGallery';
import ProductSpecifications from '../components/product/ProductSpecifications';
import RelatedProducts from '../components/product/RelatedProducts';
import ProductReviews from '../components/product/ProductReviews';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const ProductDetailPage: React.FC = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const [tabValue, setTabValue] = React.useState(0);
  const dispatch = useDispatch();
  
  const { data: product, isLoading, error } = useGetProductBySlugQuery(productSlug || '');
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        productId: product.id,
        name: product.name,
        price: product.discount_price || product.price,
        quantity: 1,
        image: product.images.find(img => img.is_primary)?.image_url || '',
        slug: product.slug
      }));
    }
  };
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (error || !product) {
    return <ErrorMessage message="Произошла ошибка при загрузке товара. Пожалуйста, попробуйте позже." />;
  }
  
  return (
    <Box>
      {/* Хлебные крошки */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/" color="inherit">
          Главная
        </Link>
        <Link component={RouterLink} to="/catalog" color="inherit">
          Каталог
        </Link>
        {product.category && (
          <Link 
            component={RouterLink} 
            to={`/catalog/${product.category.slug}`} 
            color="inherit"
          >
            {product.category.name}
          </Link>
        )}
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>
      
      {/* Основная информация о товаре */}
      <Grid container spacing={4}>
        {/* Галерея изображений */}
        <Grid item xs={12} md={6}>
          <ProductImageGallery images={product.images} />
        </Grid>
        
        {/* Информация о товаре */}
        <Grid item xs={12} md={6}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontFamily: '"Playfair Display", serif',
            }}
          >
            {product.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={4.5} precision={0.5} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              4.5 (24 отзыва)
            </Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            {product.discount_price ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography 
                  variant="h5" 
                  component="span" 
                  color="primary" 
                  fontWeight="bold"
                >
                  {product.discount_price.toLocaleString()} ₽
                </Typography>
                <Typography 
                  variant="body1" 
                  component="span" 
                  sx={{ 
                    textDecoration: 'line-through', 
                    color: 'text.secondary',
                    ml: 2 
                  }}
                >
                  {product.price.toLocaleString()} ₽
                </Typography>
                <Chip 
                  label={`-${Math.round((1 - product.discount_price / product.price) * 100)}%`} 
                  color="error" 
                  size="small" 
                  sx={{ ml: 2 }}
                />
              </Box>
            ) : (
              <Typography variant="h5" component="span" color="primary" fontWeight="bold">
                {product.price.toLocaleString()} ₽
              </Typography>
            )}
          </Box>
          
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Артикул: {product.sku}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Наличие: {product.stock > 0 ? 'В наличии' : 'Под заказ'}
            </Typography>
            {product.brand && (
              <Typography variant="subtitle2" gutterBottom>
                Бренд: {product.brand}
              </Typography>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              fullWidth
            >
              В корзину
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              size="large" 
              startIcon={<FavoriteIcon />}
            >
              В избранное
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              size="large" 
              startIcon={<ShareIcon />}
            >
              Поделиться
            </Button>
          </Box>
          
          <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocalShippingIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Доставка от 1 дня
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <VerifiedIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Гарантия 2 года
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CreditCardIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Оплата при получении
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Вкладки с дополнительной информацией */}
      <Box sx={{ mt: 6 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="product tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Характеристики" id="product-tab-0" />
          <Tab label="Отзывы" id="product-tab-1" />
          <Tab label="Доставка и оплата" id="product-tab-2" />
        </Tabs>
        
        <TabPanel value={tabValue} index={0}>
          <ProductSpecifications attributes={product.attributes} />
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <ProductReviews productId={product.id} />
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Доставка
          </Typography>
          <Typography variant="body1" paragraph>
            Мы осуществляем доставку по всей России. Стоимость и сроки доставки зависят от региона и выбранного способа доставки.
          </Typography>
          <Typography variant="body1" paragraph>
            В Москве и Санкт-Петербурге доставка осуществляется собственной службой доставки в течение 1-3 дней.
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Оплата
          </Typography>
          <Typography variant="body1" paragraph>
            Вы можете оплатить заказ следующими способами:
          </Typography>
          <ul>
            <li>Наличными при получении</li>
            <li>Банковской картой при получении</li>
            <li>Банковской картой онлайн</li>
            <li>Через систему быстрых платежей</li>
          </ul>
        </TabPanel>
      </Box>
      
      {/* Похожие товары */}
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
          Похожие товары
        </Typography>
        
        <RelatedProducts categoryId={product.category_id} currentProductId={product.id} />
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
