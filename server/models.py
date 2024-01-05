## MongoDB Database
from pymongo import MongoClient
from dotenv import load_dotenv
import os

class UserAuth:

    
    @classmethod
    def checkUser(cls, email:str, uri:str) -> bool:
        """
        This function checks if the user exists in the database and returns a boolean

        Params:
            email (str): The user's email address
            uri (str): The MongoDB connection uri
        Returns:
            bool: True if the user exists in the database, False otherwise
        """
        # Replace 'localhost' with your MongoDB server address if it's not on your local machine
        client = MongoClient(uri)
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
    def getUsername(cls, email: str, uri:str) -> str:
        """
        This function returns the user's username
        
        Params:
            email (str): The user's email address
            uri (str): The MongoDB connection URI
        Returns:
            str: The user's username
        """
        # Replace 'localhost' with your MongoDB server address if it's not on your local machine
        client = MongoClient(uri)
        db = client['MonkeyRacer']
        # Create or switch to a collection
        users = db['Users']
        # Find a document from the collection
        found_document = users.find_one({"email": email})
        return found_document["username"]
    
    @classmethod
    def checkUsername(cls, username: str, uri:str) -> bool:
        """
        This function checks if the user exists in the database and returns a boolean

        Params:
            username (str): The user's attempted username
            uri (str): The MongoDB connection URI
        Returns:
            bool: True if the user exists in the database, False otherwise
        """
        # Replace 'localhost' with your MongoDB server address if it's not on your local machine
        client = MongoClient(uri)
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
    def createUser(cls, email:str, username: str, uri:str) -> bool:
        """
        This function creates a new username in the database

        Params:
            email (str): The user's email address
            username (str): The user's username
        Returns:
            bool: True if the user was created successfully, False otherwise
        """
        # Replace 'localhost' with your MongoDB server address if it's not on your local machine
        client = MongoClient(uri)
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

        
        



