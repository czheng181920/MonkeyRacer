## User information and functions
import graphene
from pymongo import MongoClient

class User(graphene.ObjectType):
    email = graphene.String()
    name = graphene.String()
    google_id = graphene.String()
    username = graphene.String()
    
    def __init__(self, email, name, google_id):
        self.email = email
        self.name = name
        self.google_id = google_id
        
    def doesUserExist(self):
        # Replace 'localhost' with your MongoDB server address if it's not on your local machine
        client = MongoClient('mongodb://localhost:27017/')
        db = client['MonkeyRacer']
        # Create or switch to a collection
        users = db['Users']
        # Find a document from the collection
        found_document = users.find_one({"email": self.email})
        if found_document is None:
            return False
        else:
            return True