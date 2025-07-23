from pymongo import MongoClient

# Conexión a MongoDB local
client = MongoClient('mongodb://localhost:27017/')
db = client['mortydex']  # Cambia si tu base se llama diferente

items = db.items
mortys = db.mortys

for item in items.find():
    morty_obj = mortys.find_one({'_id': item['morty_id']})
    if morty_obj and 'id' in morty_obj:
        items.update_one(
            {'_id': item['_id']},
            {'$set': {'morty_id': morty_obj['id']}}
        )
        print(f"Actualizado item {item['_id']} -> morty_id {morty_obj['id']}")