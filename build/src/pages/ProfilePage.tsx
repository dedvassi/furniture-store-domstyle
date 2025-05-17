import React from 'react';
import { Box, Typography, Grid, Paper, Tabs, Tab, Button, TextField, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useGetOrdersQuery } from '../services/orderApi';
import { useGetLoyaltyAccountQuery } from '../services/loyaltyApi';
import { useGetProjectsQuery } from '../services/interiorDesignerApi';
import { Link as RouterLink } from 'react-router-dom';

import ProfileForm from '../components/profile/ProfileForm';
import OrdersList from '../components/profile/OrdersList';
import LoyaltyCard from '../components/profile/LoyaltyCard';
import ProjectsList from '../components/profile/ProjectsList';
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
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
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

const ProfilePage: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const { user, logout } = useAuth();
  
  const { data: orders, isLoading: ordersLoading } = useGetOrdersQuery();
  const { data: loyaltyAccount, isLoading: loyaltyLoading } = useGetLoyaltyAccountQuery();
  const { data: projects, isLoading: projectsLoading } = useGetProjectsQuery();
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  if (!user) {
    return <ErrorMessage message="Необходимо авторизоваться для доступа к профилю" />;
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
        Личный кабинет
      </Typography>
      
      <Paper variant="outlined" sx={{ mb: 4 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="profile tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Профиль" id="profile-tab-0" />
          <Tab label="Заказы" id="profile-tab-1" />
          <Tab label="Программа лояльности" id="profile-tab-2" />
          <Tab label="Мои проекты интерьера" id="profile-tab-3" />
          <Tab label="Избранное" id="profile-tab-4" />
        </Tabs>
        
        <TabPanel value={tabValue} index={0}>
          <ProfileForm user={user} />
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          {ordersLoading ? (
            <LoadingSpinner />
          ) : orders && orders.length > 0 ? (
            <OrdersList orders={orders} />
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" gutterBottom>
                У вас пока нет заказов
              </Typography>
              <Button 
                component={RouterLink} 
                to="/catalog" 
                variant="contained" 
                color="primary"
                sx={{ mt: 2 }}
              >
                Перейти в каталог
              </Button>
            </Box>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          {loyaltyLoading ? (
            <LoadingSpinner />
          ) : loyaltyAccount ? (
            <LoyaltyCard account={loyaltyAccount} />
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" gutterBottom>
                Вы еще не участвуете в программе лояльности
              </Typography>
              <Typography variant="body1" paragraph>
                Присоединяйтесь к программе лояльности ДомСтиль и получайте бонусы за покупки
              </Typography>
              <Button 
                component={RouterLink} 
                to="/loyalty" 
                variant="contained" 
                color="primary"
                sx={{ mt: 2 }}
              >
                Подробнее о программе
              </Button>
            </Box>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={3}>
          {projectsLoading ? (
            <LoadingSpinner />
          ) : projects && projects.length > 0 ? (
            <ProjectsList projects={projects} />
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" gutterBottom>
                У вас пока нет проектов интерьера
              </Typography>
              <Typography variant="body1" paragraph>
                Создайте свой первый проект в нашем интерактивном дизайнере интерьера
              </Typography>
              <Button 
                component={RouterLink} 
                to="/interior-designer" 
                variant="contained" 
                color="primary"
                sx={{ mt: 2 }}
              >
                Создать проект
              </Button>
            </Box>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={4}>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" gutterBottom>
              Список избранного пуст
            </Typography>
            <Typography variant="body1" paragraph>
              Добавляйте понравившиеся товары в избранное, чтобы не потерять их
            </Typography>
            <Button 
              component={RouterLink} 
              to="/catalog" 
              variant="contained" 
              color="primary"
              sx={{ mt: 2 }}
            >
              Перейти в каталог
            </Button>
          </Box>
        </TabPanel>
      </Paper>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="outlined" 
          color="error"
          onClick={logout}
        >
          Выйти из аккаунта
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePage;
