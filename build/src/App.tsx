import React from 'react';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { theme } from './styles/theme';
import { store } from './store';
import { AuthProvider } from './contexts/AuthContext';

// Layouts
import MainLayout from './components/layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import InteriorProjectPage from './pages/InteriorProjectPage';
import InteriorDesignerPage from './pages/InteriorDesignerPage';
import CommunityPage from './pages/CommunityPage';
import LoyaltyPage from './pages/LoyaltyPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

// Защищенный маршрут
import ProtectedRoute from './components/common/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="catalog" element={<CatalogPage />} />
                <Route path="catalog/:categorySlug" element={<CatalogPage />} />
                <Route path="product/:productSlug" element={<ProductDetailPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                
                {/* Защищенные маршруты */}
                <Route path="profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="interior-designer" element={
                  <ProtectedRoute>
                    <InteriorDesignerPage />
                  </ProtectedRoute>
                } />
                <Route path="interior-project/:projectId" element={
                  <ProtectedRoute>
                    <InteriorProjectPage />
                  </ProtectedRoute>
                } />
                
                <Route path="community" element={<CommunityPage />} />
                <Route path="loyalty" element={<LoyaltyPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
