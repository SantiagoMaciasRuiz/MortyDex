import os
import json
from pymongo import MongoClient
from bson.json_util import dumps

# Conexión a MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["mortydex"]

# Ruta donde guardarás los .json exportados
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXPORT_DIR = os.path.join(BASE_DIR, "data")
os.makedirs(EXPORT_DIR, exist_ok=True)  # Crea carpeta si no existe

def exportar(coleccion, nombre_archivo):
    data = db[coleccion].find()
    path = os.path.join(EXPORT_DIR, nombre_archivo)
    with open(path, "w", encoding="utf-8") as f:
        f.write(dumps(data, indent=2, ensure_ascii=False))
    print(f" Exportado '{coleccion}' a {path}")

# Exportar las colecciones deseadas
if __name__ == "__main__":
    exportar("mortys", "mortys.json")
    exportar("posts", "posts.json")
    exportar("users", "users.json")
