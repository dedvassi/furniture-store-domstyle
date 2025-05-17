from typing import List, Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.models import Category
from app.schemas.schemas import CategoryCreate, CategoryUpdate


class CRUDCategory(CRUDBase[Category, CategoryCreate, CategoryUpdate]):
    def get_by_slug(self, db: Session, *, slug: str) -> Optional[Category]:
        return db.query(Category).filter(Category.slug == slug).first()
    
    def get_root_categories(
        self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> List[Category]:
        return (
            db.query(Category)
            .filter(Category.parent_id == None)
            .filter(Category.is_active == True)
            .offset(skip)
            .limit(limit)
            .all()
        )
    
    def get_subcategories(
        self, db: Session, *, parent_id: int, skip: int = 0, limit: int = 100
    ) -> List[Category]:
        return (
            db.query(Category)
            .filter(Category.parent_id == parent_id)
            .filter(Category.is_active == True)
            .offset(skip)
            .limit(limit)
            .all()
        )
    
    def get_category_tree(self, db: Session, *, category_id: int) -> Optional[Category]:
        category = self.get(db, id=category_id)
        if not category:
            return None
        
        # Get all subcategories
        subcategories = self.get_subcategories(db, parent_id=category_id)
        setattr(category, "subcategories", subcategories)
        
        return category


category = CRUDCategory(Category)
