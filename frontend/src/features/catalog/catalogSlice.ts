import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Category, Product } from '../../types/catalog';

interface CatalogState {
  categories: Category[];
  selectedCategory: Category | null;
  products: Product[];
  featuredProducts: Product[];
  newArrivals: Product[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  filters: {
    priceRange: [number, number];
    brands: string[];
    attributes: Record<string, string[]>;
  };
}

const initialState: CatalogState = {
  categories: [],
  selectedCategory: null,
  products: [],
  featuredProducts: [],
  newArrivals: [],
  loading: false,
  error: null,
  searchQuery: '',
  filters: {
    priceRange: [0, 1000000],
    brands: [],
    attributes: {},
  },
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<Category | null>) {
      state.selectedCategory = action.payload;
    },
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setFeaturedProducts(state, action: PayloadAction<Product[]>) {
      state.featuredProducts = action.payload;
    },
    setNewArrivals(state, action: PayloadAction<Product[]>) {
      state.newArrivals = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setPriceRange(state, action: PayloadAction<[number, number]>) {
      state.filters.priceRange = action.payload;
    },
    setBrands(state, action: PayloadAction<string[]>) {
      state.filters.brands = action.payload;
    },
    addBrand(state, action: PayloadAction<string>) {
      if (!state.filters.brands.includes(action.payload)) {
        state.filters.brands.push(action.payload);
      }
    },
    removeBrand(state, action: PayloadAction<string>) {
      state.filters.brands = state.filters.brands.filter(brand => brand !== action.payload);
    },
    setAttributeFilter(state, action: PayloadAction<{ name: string; values: string[] }>) {
      state.filters.attributes[action.payload.name] = action.payload.values;
    },
    clearFilters(state) {
      state.filters = {
        priceRange: [0, 1000000],
        brands: [],
        attributes: {},
      };
    },
  },
});

export const {
  setCategories,
  setSelectedCategory,
  setProducts,
  setFeaturedProducts,
  setNewArrivals,
  setLoading,
  setError,
  setSearchQuery,
  setPriceRange,
  setBrands,
  addBrand,
  removeBrand,
  setAttributeFilter,
  clearFilters,
} = catalogSlice.actions;

export const selectCatalog = (state: RootState) => state.catalog;
export const selectCategories = (state: RootState) => state.catalog.categories;
export const selectSelectedCategory = (state: RootState) => state.catalog.selectedCategory;
export const selectProducts = (state: RootState) => state.catalog.products;
export const selectFeaturedProducts = (state: RootState) => state.catalog.featuredProducts;
export const selectNewArrivals = (state: RootState) => state.catalog.newArrivals;
export const selectCatalogLoading = (state: RootState) => state.catalog.loading;
export const selectCatalogError = (state: RootState) => state.catalog.error;
export const selectSearchQuery = (state: RootState) => state.catalog.searchQuery;
export const selectFilters = (state: RootState) => state.catalog.filters;

export default catalogSlice.reducer;
