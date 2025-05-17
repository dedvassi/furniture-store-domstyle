export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parent_id?: number;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CategoryWithChildren extends Category {
  subcategories: Category[];
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  is_primary: boolean;
  sort_order: number;
  created_at: string;
}

export interface ProductAttribute {
  id: number;
  product_id: number;
  attribute_name: string;
  attribute_value: string;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
  discount_price?: number;
  category_id: number;
  brand?: string;
  sku: string;
  stock: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductDetail extends Product {
  images: ProductImage[];
  attributes: ProductAttribute[];
  category?: Category;
}
