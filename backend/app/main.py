from fastapi import FastAPI
from .routers import documents
from .database import Base, engine
from .utils import log_request, log_error
from fastapi.middleware.cors import CORSMiddleware
# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)
# Register routers
app.include_router(documents.router, prefix="/api", tags=["documents"])
# @app.on_event("startup")
# def startup_event():
#     log_request("Application has started.")

@app.get("/example")
def example_route():
    try:
        log_request("Accessed the /example endpoint")
        return {"message": "Example route accessed successfully"}
    except Exception as e:
        log_error(f"Error in /example route: {str(e)}")
        raise
@app.get("/")
def root():
    return {"message": "Welcome to the Document Management API"}

