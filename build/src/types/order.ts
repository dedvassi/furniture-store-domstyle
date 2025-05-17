export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  created_at: string;
  product?: {
    id: number;
    name: string;
    slug: string;
    image_url?: string;
  };
}

export interface OrderItemCreate {
  product_id: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  user_id: number;
  status: string;
  total_amount: number;
  shipping_address: string;
  billing_address: string;
  payment_method: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export interface OrderCreate {
  user_id: number;
  status?: string;
  total_amount: number;
  shipping_address: string;
  billing_address: string;
  payment_method: string;
  items: OrderItemCreate[];
}
