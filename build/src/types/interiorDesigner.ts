export interface InteriorItem {
  id: number;
  project_id: number;
  product_id: number;
  position_x: number;
  position_y: number;
  position_z: number;
  rotation: number;
  scale: number;
  created_at: string;
  updated_at: string;
  product?: {
    id: number;
    name: string;
    slug: string;
    price: number;
    images: Array<{
      id: number;
      image_url: string;
      is_primary: boolean;
    }>;
  };
}

export interface InteriorItemCreate {
  product_id: number;
  position_x: number;
  position_y: number;
  position_z: number;
  rotation?: number;
  scale?: number;
}

export interface InteriorProject {
  id: number;
  user_id: number;
  name: string;
  description?: string;
  layout_type?: string;
  dimensions?: string;
  style?: string;
  created_at: string;
  updated_at: string;
  items: InteriorItem[];
}

export interface InteriorProjectCreate {
  name: string;
  description?: string;
  layout_type?: string;
  dimensions?: string;
  style?: string;
}
