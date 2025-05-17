from typing import List, Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.models import LoyaltyAccount, LoyaltyTransaction, LoyaltyReward
from app.schemas.schemas import LoyaltyAccountCreate, LoyaltyTransactionCreate, LoyaltyRewardCreate, LoyaltyRewardUpdate


class CRUDLoyalty(CRUDBase[LoyaltyAccount, LoyaltyAccountCreate, LoyaltyAccountCreate]):
    def get_by_user(self, db: Session, *, user_id: int) -> Optional[LoyaltyAccount]:
        return db.query(LoyaltyAccount).filter(LoyaltyAccount.user_id == user_id).first()
    
    def create_account(self, db: Session, *, user_id: int) -> LoyaltyAccount:
        db_obj = LoyaltyAccount(
            user_id=user_id,
            level="basic",
            points=0,
            total_spent=0
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj
    
    def add_transaction(
        self, db: Session, *, account_id: int, transaction_in: LoyaltyTransactionCreate
    ) -> LoyaltyTransaction:
        # Create transaction
        db_obj = LoyaltyTransaction(
            account_id=account_id,
            points=transaction_in.points,
            transaction_type=transaction_in.transaction_type,
            source=transaction_in.source,
            reference_id=transaction_in.reference_id
        )
        db.add(db_obj)
        
        # Update account points
        account = db.query(LoyaltyAccount).get(account_id)
        if transaction_in.transaction_type == "earn":
            account.points += transaction_in.points
        elif transaction_in.transaction_type == "spend":
            account.points -= transaction_in.points
        
        # Update level based on total spent
        if transaction_in.source == "purchase" and transaction_in.transaction_type == "earn":
            # Assuming points are a percentage of the purchase amount
            purchase_amount = transaction_in.points * 10  # Example: 1 point for every $10 spent
            account.total_spent += purchase_amount
            
            # Update level based on total spent
            if account.total_spent >= 10000:
                account.level = "vip"
            elif account.total_spent >= 5000:
                account.level = "platinum"
            elif account.total_spent >= 2000:
                account.level = "gold"
            elif account.total_spent >= 500:
                account.level = "silver"
        
        db.add(account)
        db.commit()
        db.refresh(db_obj)
        return db_obj
    
    def get_rewards(
        self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> List[LoyaltyReward]:
        return (
            db.query(LoyaltyReward)
            .filter(LoyaltyReward.is_active == True)
            .offset(skip)
            .limit(limit)
            .all()
        )
    
    def create_reward(
        self, db: Session, *, reward_in: LoyaltyRewardCreate
    ) -> LoyaltyReward:
        db_obj = LoyaltyReward(
            name=reward_in.name,
            description=reward_in.description,
            points_required=reward_in.points_required,
            reward_type=reward_in.reward_type,
            is_active=reward_in.is_active
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


loyalty = CRUDLoyalty(LoyaltyAccount)
