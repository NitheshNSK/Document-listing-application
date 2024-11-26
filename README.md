### Document Listing Application

A full-stack application for listing, viewing, adding, and deleting documents. The app allows you to manage documents through an API and display them in a table on the frontend with various features like pagination, search, sorting, and viewing content in a modal.

### Table of Contents

	•	Features
	•	Technologies
	•	Backend Setup
	•	Frontend Setup
	•	API Documentation

# Features

	•	View Document List: Display a paginated list of documents.
	•	Search: Search documents by name.
	•	Sorting: Sort documents by name or date.
	•	View Content: View the content of a document in a modal.
	•	Add New Document: Add a new document with a name and content.
	•	Delete Document: Delete a document from the list.

# Technologies

# Backend:

	•	FastAPI: Web framework for building APIs.
	•	SQLAlchemy: ORM for database interactions.
	•	SQLite: Database for storing document information.
	•	Python 3.x

# Frontend:

	•	React: Frontend library for building UI.
	•	Material-UI: UI framework for React components.
	•	Axios: HTTP client for making requests to the API.

# Backend Setup
1.	Clone the repository:
```bash
git clone git@github.com:NitheshNSK/Document-listing-application.git
cd document-listing-app/backend
```
2.	Create a virtual environment and activate it:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```
3.	Install the required dependencies:
```bash
pip install -r requirements.txt
```
4.	Set up the database:
```bash
python app/database.py
python generate_mock_data.py
```
### or
4.	Run the database migrations:
```bash
alembic upgrade head 
```

5.	Start the FastAPI server:
```bash
uvicorn app.main:app --reload
```
The backend will be running on http://127.0.0.1:8000.


# Frontend Setup

1.	Navigate to the frontend directory:
```bash
cd frontend
```
2.	Install the required dependencies:
```bash
npm install
```
3.	Run the React development server:
```bash
npm start
```
