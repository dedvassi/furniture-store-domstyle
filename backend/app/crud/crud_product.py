from typing import List, Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.models import Product, ProductImage, ProductAttribute
from app.schemas.schemas import ProductCreate, ProductUpdate


class CRUDProduct(CRUDBase[Product, ProductCreate, ProductUpdate]):
    def get_by_slug(self, db: Session, *, slug: str) -> Optional[Product]:
        return db.query(Product).filter(Product.slug == slug).first()
    
    def get_by_category(
        self, db: Session, *, category_id: int, skip: int = 0, limit: int = 100
    ) -> List[Product]:
        return (
            db.query(Product)
            .filter(Product.category_id == category_id)
            .offset(skip)
            .limit(limit)
            .all()
        )
    
    def get_active(
        self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> List[Product]:
        return (
            db.query(Product)
            .filter(Product.is_active == True)
            .offset(skip)
            .limit(limit)
            .all()
        )
    
    def search(
        self, db: Session, *, query: str, skip: int = 0, limit: int = 100
    ) -> List[Product]:
        return (
            db.query(Product)
            .filter(Product.name.ilike(f"%{query}%"))
            .offset(skip)
            .limit(limit)
            .all()
        )
    
    def add_image(
        self, db: Session, *, product_id: int, image_url: str, is_primary: bool = False
    ) -> ProductImage:
        db_obj = ProductImage(
            product_id=product_id,
            image_url=image_url,
            is_primary=is_primary
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj
    
    def add_attribute(
        self, db: Session, *, product_id: int, attribute_name: str, attribute_value: str
    ) -> ProductAttribute:
        db_obj = ProductAttribute(
            product_id=product_id,
            attribute_name=attribute_name,
            attribute_value=attribute_value
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


product = CRUDProduct(Product)
