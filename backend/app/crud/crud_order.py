from typing import List, Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.models import Order, OrderItem
from app.schemas.schemas import OrderCreate, OrderUpdate, OrderItemCreate


class CRUDOrder(CRUDBase[Order, OrderCreate, OrderUpdate]):
    def get_by_user(
        self, db: Session, *, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[Order]:
        return (
            db.query(Order)
            .filter(Order.user_id == user_id)
            .offset(skip)
            .limit(limit)
            .all()
        )
    
    def create_with_items(self, db: Session, *, obj_in: OrderCreate) -> Order:
        # Create order
        db_obj = Order(
            user_id=obj_in.user_id,
            status=obj_in.status,
            total_amount=obj_in.total_amount,
            shipping_address=obj_in.shipping_address,
            billing_address=obj_in.billing_address,
            payment_method=obj_in.payment_method
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        
        # Create order items
        for item in obj_in.items:
            order_item = OrderItem(
                order_id=db_obj.id,
                product_id=item.product_id,
                quantity=item.quantity,
                price=item.price
            )
            db.add(order_item)
        
        db.commit()
        db.refresh(db_obj)
        return db_obj
    
    def update_status(
        self, db: Session, *, order_id: int, status: str
    ) -> Optional[Order]:
        order = self.get(db, id=order_id)
        if not order:
            return None
        
        order.status = status
        db.add(order)
        db.commit()
        db.refresh(order)
        return order


order = CRUDOrder(Order)
