from datetime import datetime
from typing import Optional, List, Dict, Any

from pydantic import BaseModel, EmailStr, validator, Field

# Базовые модели
class BaseResponse(BaseModel):
    class Config:
        orm_mode = True

# Модели для аутентификации
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: Optional[str] = None
    exp: Optional[float] = None

# Модели для пользователей
class UserBase(BaseModel):
    email: EmailStr
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    role: Optional[str] = "customer"
    is_active: Optional[bool] = True

class UserCreate(UserBase):
    password: str
    
    @validator('password')
    def password_min_length(cls, v):
        if len(v) < 8:
            raise ValueError('Пароль должен содержать не менее 8 символов')
        return v

class UserUpdate(UserBase):
    password: Optional[str] = None

class UserResponse(UserBase, BaseResponse):
    id: int
    created_at: datetime
    updated_at: datetime

# Модели для категорий
class CategoryBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    parent_id: Optional[int] = None
    image_url: Optional[str] = None
    is_active: bool = True

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(CategoryBase):
    name: Optional[str] = None
    slug: Optional[str] = None

class CategoryResponse(CategoryBase, BaseResponse):
    id: int
    created_at: datetime
    updated_at: datetime

class CategoryWithChildren(CategoryResponse):
    subcategories: List['CategoryResponse'] = []

# Модели для товаров
class ProductImageBase(BaseModel):
    image_url: str
    is_primary: bool = False
    sort_order: int = 0

class ProductImageCreate(ProductImageBase):
    pass

class ProductImageResponse(ProductImageBase, BaseResponse):
    id: int
    product_id: int
    created_at: datetime

class ProductAttributeBase(BaseModel):
    attribute_name: str
    attribute_value: str

class ProductAttributeCreate(ProductAttributeBase):
    pass

class ProductAttributeResponse(ProductAttributeBase, BaseResponse):
    id: int
    product_id: int
    created_at: datetime

class ProductBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    price: float
    discount_price: Optional[float] = None
    category_id: int
    brand: Optional[str] = None
    sku: str
    stock: int = 0
    is_active: bool = True

class ProductCreate(ProductBase):
    images: Optional[List[ProductImageCreate]] = None
    attributes: Optional[List[ProductAttributeCreate]] = None

class ProductUpdate(ProductBase):
    name: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    discount_price: Optional[float] = None
    category_id: Optional[int] = None
    brand: Optional[str] = None
    sku: Optional[str] = None
    stock: Optional[int] = None
    is_active: Optional[bool] = None

class ProductResponse(ProductBase, BaseResponse):
    id: int
    created_at: datetime
    updated_at: datetime

class ProductDetailResponse(ProductResponse):
    images: List[ProductImageResponse] = []
    attributes: List[ProductAttributeResponse] = []
    category: Optional[CategoryResponse] = None

# Модели для заказов
class OrderItemBase(BaseModel):
    product_id: int
    quantity: int
    price: float

class OrderItemCreate(OrderItemBase):
    pass

class OrderItemResponse(OrderItemBase, BaseResponse):
    id: int
    order_id: int
    created_at: datetime
    product: Optional[Dict[str, Any]] = None

class OrderBase(BaseModel):
    user_id: int
    status: str = "pending"
    total_amount: float
    shipping_address: str
    billing_address: str
    payment_method: str

class OrderCreate(OrderBase):
    items: List[OrderItemCreate]

class OrderUpdate(BaseModel):
    status: Optional[str] = None
    shipping_address: Optional[str] = None
    billing_address: Optional[str] = None

class OrderResponse(OrderBase, BaseResponse):
    id: int
    created_at: datetime
    updated_at: datetime
    items: List[OrderItemResponse] = []

# Модели для проектов интерьера
class InteriorItemBase(BaseModel):
    product_id: int
    position_x: float
    position_y: float
    position_z: float
    rotation: Optional[float] = 0
    scale: Optional[float] = 1

class InteriorItemCreate(InteriorItemBase):
    pass

class InteriorItemUpdate(InteriorItemBase):
    product_id: Optional[int] = None
    position_x: Optional[float] = None
    position_y: Optional[float] = None
    position_z: Optional[float] = None

class InteriorItemResponse(InteriorItemBase, BaseResponse):
    id: int
    project_id: int
    created_at: datetime
    updated_at: datetime
    product: Optional[Dict[str, Any]] = None

class InteriorProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    layout_type: Optional[str] = None
    dimensions: Optional[str] = None
    style: Optional[str] = None

class InteriorProjectCreate(InteriorProjectBase):
    pass

class InteriorProjectUpdate(InteriorProjectBase):
    name: Optional[str] = None

class InteriorProjectResponse(InteriorProjectBase, BaseResponse):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    items: List[InteriorItemResponse] = []

# Модели для сообщества
class PostProductTagBase(BaseModel):
    product_id: int
    position_x: float
    position_y: float

class PostProductTagCreate(PostProductTagBase):
    pass

class PostProductTagResponse(PostProductTagBase, BaseResponse):
    id: int
    post_id: int
    created_at: datetime
    product: Optional[Dict[str, Any]] = None

class PostCommentBase(BaseModel):
    content: str

class PostCommentCreate(PostCommentBase):
    pass

class PostCommentResponse(PostCommentBase, BaseResponse):
    id: int
    post_id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    user: Optional[Dict[str, Any]] = None

class CommunityPostBase(BaseModel):
    title: str
    content: str
    image_url: Optional[str] = None

class CommunityPostCreate(CommunityPostBase):
    product_tags: Optional[List[PostProductTagCreate]] = None

class CommunityPostUpdate(CommunityPostBase):
    title: Optional[str] = None
    content: Optional[str] = None
    image_url: Optional[str] = None

class CommunityPostResponse(CommunityPostBase, BaseResponse):
    id: int
    user_id: int
    likes_count: int
    comments_count: int
    created_at: datetime
    updated_at: datetime
    user: Optional[Dict[str, Any]] = None
    product_tags: List[PostProductTagResponse] = []
    comments: List[PostCommentResponse] = []

# Модели для программы лояльности
class LoyaltyTransactionBase(BaseModel):
    points: int
    transaction_type: str
    source: str
    reference_id: Optional[str] = None

class LoyaltyTransactionCreate(LoyaltyTransactionBase):
    pass

class LoyaltyTransactionResponse(LoyaltyTransactionBase, BaseResponse):
    id: int
    account_id: int
    created_at: datetime

class LoyaltyAccountBase(BaseModel):
    level: str = "basic"
    points: int = 0
    total_spent: float = 0

class LoyaltyAccountCreate(LoyaltyAccountBase):
    user_id: int

class LoyaltyAccountUpdate(LoyaltyAccountBase):
    level: Optional[str] = None
    points: Optional[int] = None
    total_spent: Optional[float] = None

class LoyaltyAccountResponse(LoyaltyAccountBase, BaseResponse):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    transactions: List[LoyaltyTransactionResponse] = []

class LoyaltyRewardBase(BaseModel):
    name: str
    description: Optional[str] = None
    points_required: int
    reward_type: str
    is_active: bool = True

class LoyaltyRewardCreate(LoyaltyRewardBase):
    pass

class LoyaltyRewardUpdate(LoyaltyRewardBase):
    name: Optional[str] = None
    description: Optional[str] = None
    points_required: Optional[int] = None
    reward_type: Optional[str] = None
    is_active: Optional[bool] = None

class LoyaltyRewardResponse(LoyaltyRewardBase, BaseResponse):
    id: int
    created_at: datetime
    updated_at: datetime
