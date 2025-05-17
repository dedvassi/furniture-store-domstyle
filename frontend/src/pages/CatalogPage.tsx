import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, Container, Breadcrumbs, Link, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, Slider, Checkbox, FormControlLabel, Divider, Pagination } from '@mui/material';
import { Link as RouterLink, useParams, useSearchParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';

import { useGetCategoriesQuery, useGetProductsByCategoryQuery, useGetProductsQuery } from '../services/catalogApi';
import ProductCard from '../components/catalog/ProductCard';
import CategorySidebar from '../components/catalog/CategorySidebar';
import FilterSidebar from '../components/catalog/FilterSidebar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const CatalogPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const sortBy = searchParams.get('sort') || 'newest';
  
  // Получаем категории
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useGetCategoriesQuery();
  
  // Находим текущую категорию
  const currentCategory = categories?.find(cat => cat.slug === categorySlug);
  
  // Получаем товары
  const { data: products, isLoading: productsLoading, error: productsError } = 
    currentCategory 
      ? useGetProductsByCategoryQuery({ 
          categoryId: currentCategory.id, 
          skip: (page - 1) * 12, 
          limit: 12 
        })
      : useGetProductsQuery({ 
          skip: (page - 1) * 12, 
          limit: 12 
        });
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('query', event.target.value);
    newParams.set('page', '1');
    setSearchParams(newParams);
  };
  
  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', event.target.value as string);
    setSearchParams(newParams);
  };
  
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', value.toString());
    setSearchParams(newParams);
  };
  
  if (categoriesLoading || productsLoading) {
    return <LoadingSpinner />;
  }
  
  if (categoriesError || productsError) {
    return <ErrorMessage message="Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже." />;
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
        {currentCategory && (
          <Typography color="text.primary">{currentCategory.name}</Typography>
        )}
      </Breadcrumbs>
      
      {/* Заголовок */}
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
        {currentCategory ? currentCategory.name : 'Каталог мебели'}
      </Typography>
      
      {/* Поиск и фильтры */}
      <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
        <TextField
          fullWidth
          placeholder="Поиск товаров..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1 }}
        />
        
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="sort-label">Сортировка</InputLabel>
          <Select
            labelId="sort-label"
            value={sortBy}
            label="Сортировка"
            onChange={handleSortChange}
            startAdornment={
              <InputAdornment position="start">
                <SortIcon />
              </InputAdornment>
            }
          >
            <MenuItem value="newest">Сначала новые</MenuItem>
            <MenuItem value="price_asc">Цена: по возрастанию</MenuItem>
            <MenuItem value="price_desc">Цена: по убыванию</MenuItem>
            <MenuItem value="popular">По популярности</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      {/* Основной контент */}
      <Grid container spacing={4}>
        {/* Сайдбар с категориями и фильтрами */}
        <Grid item xs={12} md={3}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Категории
            </Typography>
            <CategorySidebar categories={categories || []} currentCategoryId={currentCategory?.id} />
          </Box>
          
          <Divider sx={{ mb: 4 }} />
          
          <Box>
            <Typography variant="h6" gutterBottom>
              Фильтры
            </Typography>
            <FilterSidebar />
          </Box>
        </Grid>
        
        {/* Список товаров */}
        <Grid item xs={12} md={9}>
          {products && products.length > 0 ? (
            <>
              <Grid container spacing={3}>
                {products.map((product) => (
                  <Grid item key={product.id} xs={12} sm={6} md={4}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
              
              {/* Пагинация */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Pagination 
                  count={10} // В реальном приложении это будет вычисляться на основе общего количества товаров
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            </>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" gutterBottom>
                Товары не найдены
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Попробуйте изменить параметры поиска или фильтры
              </Typography>
              <Button 
                component={RouterLink} 
                to="/catalog" 
                variant="contained" 
                color="primary"
              >
                Сбросить фильтры
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CatalogPage;
