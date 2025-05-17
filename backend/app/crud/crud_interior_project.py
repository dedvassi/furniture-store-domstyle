from typing import List, Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.models import InteriorProject, InteriorItem
from app.schemas.schemas import InteriorProjectCreate, InteriorProjectUpdate, InteriorItemCreate


class CRUDInteriorProject(CRUDBase[InteriorProject, InteriorProjectCreate, InteriorProjectUpdate]):
    def get_by_user(
        self, db: Session, *, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[InteriorProject]:
        return (
            db.query(InteriorProject)
            .filter(InteriorProject.user_id == user_id)
            .offset(skip)
            .limit(limit)
            .all()
        )
    
    def add_item(
        self, db: Session, *, project_id: int, item_in: InteriorItemCreate
    ) -> InteriorItem:
        db_obj = InteriorItem(
            project_id=project_id,
            product_id=item_in.product_id,
            position_x=item_in.position_x,
            position_y=item_in.position_y,
            position_z=item_in.position_z,
            rotation=item_in.rotation,
            scale=item_in.scale
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj
    
    def remove_item(
        self, db: Session, *, item_id: int
    ) -> InteriorItem:
        item = db.query(InteriorItem).get(item_id)
        db.delete(item)
        db.commit()
        return item
    
    def update_item(
        self, db: Session, *, item_id: int, item_in: InteriorItemCreate
    ) -> Optional[InteriorItem]:
        item = db.query(InteriorItem).get(item_id)
        if not item:
            return None
        
        item.product_id = item_in.product_id
        item.position_x = item_in.position_x
        item.position_y = item_in.position_y
        item.position_z = item_in.position_z
        item.rotation = item_in.rotation
        item.scale = item_in.scale
        
        db.add(item)
        db.commit()
        db.refresh(item)
        return item


interior_project = CRUDInteriorProject(InteriorProject)
