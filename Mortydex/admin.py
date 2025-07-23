from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['mortydex']
users = db.users

# Cambia 'nombre_usuario' por el username que quieres hacer admin
username = 'felo'

result = users.update_one(
    {'username': username},
    {'$set': {'is_admin': True}}
)

if result.modified_count:
    print(f"Usuario '{username}' ahora es admin.")
else:
    print(f"No se encontró el usuario '{username}' o ya era admin.")