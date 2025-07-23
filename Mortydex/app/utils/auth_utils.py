from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

# Configuración de MongoDB
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
DATABASE_NAME = os.getenv('DATABASE_NAME', 'mortydex')

client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
users_collection = db.users