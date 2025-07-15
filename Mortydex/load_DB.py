import os
import json
from pymongo import MongoClient

# Configurar conexión a MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["mortydex"]

# Carpeta donde están los archivos JSON
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "Mortydex/data")

# Función para importar una colección desde un archivo JSON
def importar(nombre_coleccion, archivo_json):
    path = os.path.join(DATA_DIR, archivo_json)
    
    if not os.path.exists(path):
        print(f" Archivo no encontrado: {path}")
        return
    
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
        if not isinstance(data, list):
            print(f" El contenido de {archivo_json} no es una lista.")
            return
        resultado = db[nombre_coleccion].insert_many(data)
        print(f" {len(resultado.inserted_ids)} documentos insertados en '{nombre_coleccion}'.")

# Importar todas las colecciones necesarias
if __name__ == "__main__":
    importar("mortys", "mortys.json")
    importar("posts", "posts.json")
    importar("users", "users.json")
