## Backend Setup

### Prerequisites
- Python 3.8 or later installed
- Virtual environment setup

### Steps to Run
1. Clone the repository:
```bash
   git clone <repo-url>
   cd backend
```
2.	Create and activate a virtual environment:
```bash
    python3 -m venv venv
    source venv/bin/activate  
```
3.	Install dependencies:  
```bash
    pip install -r requirements.txt
```
4.	Set up the database:
```bash
   python app/database.py
```
5.	Generate mock data :
```bash
   python generate_mock_data.py
```
6.	Run the backend server:
```bash
   uvicorn app.main:app --reload  
```

### All the logs will be available in logs/app_logs.txt