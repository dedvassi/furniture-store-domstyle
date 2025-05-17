import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
  totalItems: JSON.parse(localStorage.getItem('cart') || '[]')
    .reduce((total: number, item: CartItem) => total + item.quantity, 0),
  totalAmount: JSON.parse(localStorage.getItem('cart') || '[]')
    .reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.productId !== action.payload);
      
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateQuantity(state, action: PayloadAction<{ productId: number; quantity: number }>) {
      const item = state.items.find(item => item.productId === action.payload.productId);
      
      if (item) {
        item.quantity = action.payload.quantity;
        
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
      
      localStorage.removeItem('cart');
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalItems = (state: RootState) => state.cart.totalItems;
export const selectCartTotalAmount = (state: RootState) => state.cart.totalAmount;

export default cartSlice.reducer;
