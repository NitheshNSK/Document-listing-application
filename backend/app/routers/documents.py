from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import schemas, crud, models, database
from ..utils import log_request, log_error
router = APIRouter()

@router.get("/documents", response_model=List[schemas.DocumentResponse])
def list_documents(search: str = None, db: Session = Depends(database.get_db)):
    try:
        log_request(f"Fetching documents with search: {search}")
        documents = crud.get_documents(db, search=search)
        log_request(f"Successfully fetched {len(documents)} documents")
        return documents
    except Exception as e:
        log_error(f"Error fetching documents: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.get("/documents/{doc_id}", response_model=schemas.DocumentResponse)
def get_document(doc_id: int, db: Session = Depends(database.get_db)):
    try:
        log_request(f"Fetching document with ID: {doc_id}")
        document = crud.get_document_by_id(db, doc_id)
        if not document:
            log_error(f"Document with ID {doc_id} not found")
            raise HTTPException(status_code=404, detail="Document not found")
        log_request(f"Successfully fetched document with ID: {doc_id}")
        return document
    except Exception as e:
        log_error(f"Error fetching document with ID {doc_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
@router.get("/documents", response_model=List[schemas.DocumentResponse])
def search_documents(search: str = None, db: Session = Depends(database.get_db)):
    try:
        log_request(f"Searching documents with search term: {search}")
        documents = crud.get_documents_by_name(db, search=search)
        log_request(f"Found {len(documents)} documents matching the search")
        return documents
    except Exception as e:
        log_error(f"Error searching documents with term '{search}': {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
# Logging the add_document API call
@router.post("/documents", response_model=schemas.DocumentResponse)
def add_document(document: schemas.DocumentCreate, db: Session = Depends(database.get_db)):
    try:
        log_request(f"Creating new document with name: {document.name}")
        new_document = crud.create_document(db, document=document)
        log_request(f"Successfully created document: {new_document.name}")
        return new_document
    except Exception as e:
        log_error(f"Error creating document: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Logging the delete_document API call
@router.delete("/documents/{doc_id}")
def delete_document(doc_id: int, db: Session = Depends(database.get_db)):
    try:
        log_request(f"Attempting to delete document with ID: {doc_id}")
        success = crud.delete_document(db, doc_id)
        if not success:
            log_error(f"Document with ID {doc_id} not found")
            raise HTTPException(status_code=404, detail="Document not found")
        log_request(f"Successfully deleted document with ID: {doc_id}")
        return {"message": "Document deleted"}
    except Exception as e:
        log_error(f"Error deleting document with ID {doc_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")