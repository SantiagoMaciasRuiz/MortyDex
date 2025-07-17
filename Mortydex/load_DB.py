import os
import json
from pymongo import MongoClient

# Conexión a MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["mortydex"]

# Ruta a la carpeta de datos
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
def importar(nombre_coleccion, archivo_json):
    path = os.path.join(DATA_DIR, archivo_json)
    print(f"📁 Leyendo desde: {path}")

    if not os.path.exists(path):
        print(f"❌ Archivo no encontrado: {path}")
        return

    with open(path, encoding="utf-8") as f:
        data = json.load(f)

    if not isinstance(data, list):
        print(f"❌ El contenido de {archivo_json} no es una lista.")
        return

    # Eliminar _id para evitar conflicto con $oid
    for doc in data:
        if "_id" in doc:
            del doc["_id"]

    db[nombre_coleccion].delete_many({})
    resultado = db[nombre_coleccion].insert_many(data)
    print(f"✅ {len(resultado.inserted_ids)} documentos insertados en '{nombre_coleccion}'.")

# Ejecutar importaciones
if __name__ == "__main__":
    importar("mortys", "mortys.json")
    importar("posts", "posts.json")
    importar("users", "users.json")
