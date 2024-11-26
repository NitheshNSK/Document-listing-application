import logging
import os
from logging.handlers import RotatingFileHandler

# Directory and file setup
LOG_DIR = "logs"
os.makedirs(LOG_DIR, exist_ok=True)
LOG_FILE = os.path.join(LOG_DIR, "app_logs.txt")  # Using .txt instead of .log
s=os.makedirs(LOG_DIR, exist_ok=True)

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        RotatingFileHandler(LOG_FILE, maxBytes=5 * 1024 * 1024, backupCount=5),
        logging.StreamHandler()  # Optional: log to console as well
    ]
)



def log_request(message: str):
    """Log a request message."""
    logging.info(message)

def log_error(message: str):
    """Log an error message."""
    logging.error(message)

def log_warning(message: str):
    """Log a warning message."""
    logging.warning(message)