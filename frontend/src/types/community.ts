export interface PostProductTag {
  id: number;
  post_id: number;
  product_id: number;
  position_x: number;
  position_y: number;
  created_at: string;
  product?: {
    id: number;
    name: string;
    slug: string;
    price: number;
    image_url?: string;
  };
}

export interface PostProductTagCreate {
  product_id: number;
  position_x: number;
  position_y: number;
}

export interface PostComment {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    first_name?: string;
    last_name?: string;
  };
}

export interface PostCommentCreate {
  content: string;
}

export interface CommunityPost {
  id: number;
  user_id: number;
  title: string;
  content: string;
  image_url?: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    first_name?: string;
    last_name?: string;
  };
  product_tags: PostProductTag[];
  comments: PostComment[];
}

export interface CommunityPostCreate {
  title: string;
  content: string;
  image_url?: string;
  product_tags?: PostProductTagCreate[];
}
