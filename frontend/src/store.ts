import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './services/api';
import authReducer from './features/auth/authSlice';
import cartReducer from './features/cart/cartSlice';
import catalogReducer from './features/catalog/catalogSlice';
import interiorDesignerReducer from './features/interiorDesigner/interiorDesignerSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    cart: cartReducer,
    catalog: catalogReducer,
    interiorDesigner: interiorDesignerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
