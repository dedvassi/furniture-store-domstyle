from typing import List, Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.models import CommunityPost, PostComment, PostLike, PostProductTag
from app.schemas.schemas import CommunityPostCreate, CommunityPostUpdate, PostCommentCreate, PostProductTagCreate


class CRUDCommunityPost(CRUDBase[CommunityPost, CommunityPostCreate, CommunityPostUpdate]):
    def get_by_user(
        self, db: Session, *, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[CommunityPost]:
        return (
            db.query(CommunityPost)
            .filter(CommunityPost.user_id == user_id)
            .order_by(CommunityPost.created_at.desc())
            .offset(skip)
            .limit(limit)
            .all()
        )
    
    def get_recent(
        self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> List[CommunityPost]:
        return (
            db.query(CommunityPost)
            .order_by(CommunityPost.created_at.desc())
            .offset(skip)
            .limit(limit)
            .all()
        )
    
    def get_popular(
        self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> List[CommunityPost]:
        return (
            db.query(CommunityPost)
            .order_by(CommunityPost.likes_count.desc())
            .offset(skip)
            .limit(limit)
            .all()
        )
    
    def create_with_tags(
        self, db: Session, *, obj_in: CommunityPostCreate, user_id: int
    ) -> CommunityPost:
        # Create post
        db_obj = CommunityPost(
            user_id=user_id,
            title=obj_in.title,
            content=obj_in.content,
            image_url=obj_in.image_url
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        
        # Create product tags
        if obj_in.product_tags:
            for tag in obj_in.product_tags:
                product_tag = PostProductTag(
                    post_id=db_obj.id,
                    product_id=tag.product_id,
                    position_x=tag.position_x,
                    position_y=tag.position_y
                )
                db.add(product_tag)
            
            db.commit()
            db.refresh(db_obj)
        
        return db_obj
    
    def add_comment(
        self, db: Session, *, post_id: int, user_id: int, comment_in: PostCommentCreate
    ) -> PostComment:
        # Create comment
        db_obj = PostComment(
            post_id=post_id,
            user_id=user_id,
            content=comment_in.content
        )
        db.add(db_obj)
        
        # Update comment count
        post = db.query(CommunityPost).get(post_id)
        post.comments_count += 1
        db.add(post)
        
        db.commit()
        db.refresh(db_obj)
        return db_obj
    
    def add_like(
        self, db: Session, *, post_id: int, user_id: int
    ) -> Optional[PostLike]:
        # Check if already liked
        existing_like = (
            db.query(PostLike)
            .filter(PostLike.post_id == post_id, PostLike.user_id == user_id)
            .first()
        )
        
        if existing_like:
            return None
        
        # Create like
        db_obj = PostLike(
            post_id=post_id,
            user_id=user_id
        )
        db.add(db_obj)
        
        # Update like count
        post = db.query(CommunityPost).get(post_id)
        post.likes_count += 1
        db.add(post)
        
        db.commit()
        db.refresh(db_obj)
        return db_obj
    
    def remove_like(
        self, db: Session, *, post_id: int, user_id: int
    ) -> bool:
        # Find like
        like = (
            db.query(PostLike)
            .filter(PostLike.post_id == post_id, PostLike.user_id == user_id)
            .first()
        )
        
        if not like:
            return False
        
        # Remove like
        db.delete(like)
        
        # Update like count
        post = db.query(CommunityPost).get(post_id)
        post.likes_count -= 1
        db.add(post)
        
        db.commit()
        return True


community_post = CRUDCommunityPost(CommunityPost)
