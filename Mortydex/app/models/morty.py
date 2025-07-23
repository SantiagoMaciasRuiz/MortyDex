from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["mortydex"]
mortys_collection = db["mortys"]
