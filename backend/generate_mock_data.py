from faker import Faker
from sqlalchemy.orm import Session
from app import models, database

# Initialize Faker to generate fake data
fake = Faker()

# Function to generate mock documents
def generate_documents(db: Session, num_docs: int = 20):
    for _ in range(num_docs):
        name = fake.sentence(nb_words=3) + ".txt"  # Random file name
        content = fake.text(max_nb_chars=200)  # Random content
        created_at = fake.date_this_decade()  # Random creation date
        size = len(content)  # Mock file size as the length of content

        # Create a new document and add it to the session
        document = models.Document(
            name=name,
            content=content,
            created_at=created_at,
            size=size
        )
        db.add(document)

    # Commit the session to save the documents to the database
    db.commit()

# Get the database session
if __name__ == "__main__":
    db = database.SessionLocal()
    generate_documents(db)
    print("Mock documents have been generated and inserted into the database.")