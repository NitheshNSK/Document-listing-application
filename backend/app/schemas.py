from pydantic import BaseModel
from datetime import datetime

class DocumentBase(BaseModel):
    name: str
    content: str

class DocumentCreate(DocumentBase):
    pass

class DocumentResponse(DocumentBase):
    id: int
    created_at: datetime
    size: int

    class Config:
        orm_mode = True