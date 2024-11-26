from sqlalchemy.orm import Session
from . import models, schemas

def get_documents(db: Session, search: str = None):
    query = db.query(models.Document)
    if search:
        query = query.filter(models.Document.name.contains(search))
    return query.all()

def get_document_by_id(db: Session, doc_id: int):
    return db.query(models.Document).filter(models.Document.id == doc_id).first()
from sqlalchemy.orm import Session
from sqlalchemy import or_
from . import models

def get_documents_by_name(db: Session, search: str = None):
    if search:
        # Search for documents where the name contains the search term
        return db.query(models.Document).filter(models.Document.name.ilike(f"%{search}%")).all()
    return db.query(models.Document).all()

def create_document(db: Session, document: schemas.DocumentCreate):
    size = len(document.content.encode('utf-8'))  # Calculate size in bytes
    db_document = models.Document(name=document.name, content=document.content, size=size)
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document

def delete_document(db: Session, doc_id: int):
    db_document = db.query(models.Document).filter(models.Document.id == doc_id).first()
    if db_document:
        db.delete(db_document)
        db.commit()
        return True
    return False