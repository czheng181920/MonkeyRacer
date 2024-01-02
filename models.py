## MongoDB Database
from pymongo import MongoClient


class UserAuth:

    @classmethod
    def checkUser(cls, email) -> bool:
        """
        This function checks if the user exists in the database and returns a boolean

        Params:
            email (str): The user's email address
        Returns:
            bool: True if the user exists in the database, False otherwise
        """
        # Replace 'localhost' with your MongoDB server address if it's not on your local machine
        client = MongoClient('mongodb://localhost:27017/')
        db = client['MonkeyRacer']
        # Create or switch to a collection
        users = db['Users']
        # Find a document from the collection
        found_document = users.find_one({"email": email})
        if found_document is None:
            return False
        else:
            return True

    @classmethod
    def getUsername(cls, email: str) -> str:
        """
        This function returns the user's username
        
        Params:
            email (str): The user's email address
        Returns:
            str: The user's username
        """
        # Replace 'localhost' with your MongoDB server address if it's not on your local machine
        client = MongoClient('mongodb://localhost:27017/')
        db = client['MonkeyRacer']
        # Create or switch to a collection
        users = db['Users']
        # Find a document from the collection
        found_document = users.find_one({"email": email})
        return found_document["username"]
    
    @classmethod
    def checkUsername(cls, username: str) -> bool:
        """
        This function checks if the user exists in the database and returns a boolean

        Params:
            username (str): The user's attempted username
        Returns:
            bool: True if the user exists in the database, False otherwise
        """
        # Replace 'localhost' with your MongoDB server address if it's not on your local machine
        client = MongoClient('mongodb://localhost:27017/')
        db = client['MonkeyRacer']
        # Create or switch to a collection
        users = db['Users']
        # Find a document from the collection
        found_document = users.find_one({"username": username})
        if found_document is None:
            return False
        else:
            return True
        

    @classmethod 
    def createUser(cls, email:str, username: str) -> bool:
        """
        This function creates a new username in the database

        Params:
            email (str): The user's email address
            username (str): The user's username
        Returns:
            bool: True if the user was created successfully, False otherwise
        """
        # Replace 'localhost' with your MongoDB server address if it's not on your local machine
        client = MongoClient('mongodb://localhost:27017/')
        db = client['MonkeyRacer']
        # Create or switch to a collection
        users = db['Users']
        # Insert a document into the collection
        document = {"email": email, "username": username}
        users.insert_one(document)
        return True


class User:
    def __init__(self, email, name, google_id):
        self.email = email
        self.name = name
        self.google_id = google_id

        
        
# Establish a connection to MongoDB
# Replace 'localhost' with your MongoDB server address if it's not on your local machine
client = MongoClient('mongodb://localhost:27017/')


db = client['MonkeyRacer']

# Create or switch to a collection
users = db['Users']

# Insert a document into the collection
document = {"name": "John Doe", "age": 30, "city": "New York"}
users.insert_one(document)

# Find a document from the collection
found_document = users.find_one({"name": "John Doe"})
print(found_document)

# Update a document in the collection
users.update_one({"name": "John Doe"}, {"$set": {"age": 31}})

# Delete a document from the collection
users.delete_one({"name": "John Doe"})

# Close the connection
client.close()


