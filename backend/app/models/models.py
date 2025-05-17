from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Text, Numeric, func
from sqlalchemy.orm import relationship
from datetime import datetime

from app.db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    first_name = Column(String)
    last_name = Column(String)
    phone = Column(String)
    role = Column(String, default="customer", nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Отношения
    orders = relationship("Order", back_populates="user")
    interior_projects = relationship("InteriorProject", back_populates="user")
    community_posts = relationship("CommunityPost", back_populates="user")
    post_comments = relationship("PostComment", back_populates="user")
    post_likes = relationship("PostLike", back_populates="user")
    loyalty_account = relationship("LoyaltyAccount", back_populates="user", uselist=False)


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text)
    parent_id = Column(Integer, ForeignKey("categories.id"))
    image_url = Column(String)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Отношения
    products = relationship("Product", back_populates="category")
    subcategories = relationship("Category", 
                                backref=relationship.backref("parent", remote_side=[id]),
                                cascade="all, delete-orphan")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text)
    price = Column(Numeric(10, 2), nullable=False)
    discount_price = Column(Numeric(10, 2))
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    brand = Column(String)
    sku = Column(String, unique=True, nullable=False)
    stock = Column(Integer, default=0, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Отношения
    category = relationship("Category", back_populates="products")
    images = relationship("ProductImage", back_populates="product", cascade="all, delete-orphan")
    attributes = relationship("ProductAttribute", back_populates="product", cascade="all, delete-orphan")
    order_items = relationship("OrderItem", back_populates="product")
    interior_items = relationship("InteriorItem", back_populates="product")
    post_product_tags = relationship("PostProductTag", back_populates="product")


class ProductImage(Base):
    __tablename__ = "product_images"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    image_url = Column(String, nullable=False)
    is_primary = Column(Boolean, default=False, nullable=False)
    sort_order = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Отношения
    product = relationship("Product", back_populates="images")


class ProductAttribute(Base):
    __tablename__ = "product_attributes"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    attribute_name = Column(String, nullable=False)
    attribute_value = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Отношения
    product = relationship("Product", back_populates="attributes")


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    status = Column(String, default="pending", nullable=False)
    total_amount = Column(Numeric(10, 2), nullable=False)
    shipping_address = Column(Text, nullable=False)
    billing_address = Column(Text, nullable=False)
    payment_method = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Отношения
    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Отношения
    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")


class InteriorProject(Base):
    __tablename__ = "interior_projects"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text)
    layout_type = Column(String)
    dimensions = Column(String)
    style = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Отношения
    user = relationship("User", back_populates="interior_projects")
    items = relationship("InteriorItem", back_populates="project", cascade="all, delete-orphan")


class InteriorItem(Base):
    __tablename__ = "interior_items"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("interior_projects.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    position_x = Column(Numeric(10, 2), nullable=False)
    position_y = Column(Numeric(10, 2), nullable=False)
    position_z = Column(Numeric(10, 2), nullable=False)
    rotation = Column(Numeric(10, 2), default=0)
    scale = Column(Numeric(10, 2), default=1)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Отношения
    project = relationship("InteriorProject", back_populates="items")
    product = relationship("Product", back_populates="interior_items")


class CommunityPost(Base):
    __tablename__ = "community_posts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    image_url = Column(String)
    likes_count = Column(Integer, default=0, nullable=False)
    comments_count = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Отношения
    user = relationship("User", back_populates="community_posts")
    comments = relationship("PostComment", back_populates="post", cascade="all, delete-orphan")
    likes = relationship("PostLike", back_populates="post", cascade="all, delete-orphan")
    product_tags = relationship("PostProductTag", back_populates="post", cascade="all, delete-orphan")


class PostComment(Base):
    __tablename__ = "post_comments"

    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey("community_posts.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Отношения
    post = relationship("CommunityPost", back_populates="comments")
    user = relationship("User", back_populates="post_comments")


class PostLike(Base):
    __tablename__ = "post_likes"

    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey("community_posts.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Отношения
    post = relationship("CommunityPost", back_populates="likes")
    user = relationship("User", back_populates="post_likes")


class PostProductTag(Base):
    __tablename__ = "post_product_tags"

    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey("community_posts.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    position_x = Column(Numeric(10, 2), nullable=False)
    position_y = Column(Numeric(10, 2), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Отношения
    post = relationship("CommunityPost", back_populates="product_tags")
    product = relationship("Product", back_populates="post_product_tags")


class LoyaltyAccount(Base):
    __tablename__ = "loyalty_accounts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    level = Column(String, default="basic", nullable=False)
    points = Column(Integer, default=0, nullable=False)
    total_spent = Column(Numeric(10, 2), default=0, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Отношения
    user = relationship("User", back_populates="loyalty_account")
    transactions = relationship("LoyaltyTransaction", back_populates="account", cascade="all, delete-orphan")


class LoyaltyTransaction(Base):
    __tablename__ = "loyalty_transactions"

    id = Column(Integer, primary_key=True, index=True)
    account_id = Column(Integer, ForeignKey("loyalty_accounts.id", ondelete="CASCADE"), nullable=False)
    points = Column(Integer, nullable=False)
    transaction_type = Column(String, nullable=False)
    source = Column(String, nullable=False)
    reference_id = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Отношения
    account = relationship("LoyaltyAccount", back_populates="transactions")


class LoyaltyReward(Base):
    __tablename__ = "loyalty_rewards"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    points_required = Column(Integer, nullable=False)
    reward_type = Column(String, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
