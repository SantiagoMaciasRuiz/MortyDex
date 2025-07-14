from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["mortydex"]
mortys = db["mortys"]

# Lista de mortys igual a la que tienes en JS
morty_list = [
  { "id": 1, "name": "Morty Cascado", "type": "Piedra", "img": "/static/images/mortys/pm-001.jpg" },
  { "id": 2, "name": "Morty Conejo", "type": "Papel", "img": "/static/images/mortys/pm-008.jpg" },
  { "id": 3, "name": "Morty Mutado", "type": "Papel", "img": "/static/images/mortys/pm-015.jpg" },
  { "id": 4, "name": "Morty Fusionado", "type": "Tijera", "img": "/static/images/mortys/pm-047.jpg" },
  { "id": 5, "name": "Morty Gatero", "type": "Tijera", "img": "/static/images/mortys/pm-052.jpg" },
  { "id": 6, "name": "Morty Gymbro", "type": "Papel", "img": "/static/images/mortys/pm-054.jpg" },
  { "id": 7, "name": "Morty Venezolano", "type": "Piedra", "img": "/static/images/mortys/pm-058.jpg" },
  { "id": 8, "name": "Morty Mago", "type": "Tijera", "img": "/static/images/mortys/pm-059.jpg" },
  { "id": 9, "name": "Morty Mullet", "type": "Papel", "img": "/static/images/mortys/pm-085.jpg" },
  { "id": 10, "name": "Morty Afro", "type": "Piedra", "img": "/static/images/mortys/pm-087.png" },
  { "id": 11, "name": "Morty CareNalga", "type": "Papel", "img": "/static/images/mortys/pm-283.png" },
  { "id": 12, "name": "Morty Punketo", "type": "Tijera", "img": "/static/images/mortys/pm-100.png" },
  { "id": 13, "name": "Morty Ingeniero de Sistemas", "type": "Papel", "img": "/static/images/mortys/pm-240.png" },
  { "id": 14, "name": "Morty TaxiDriver", "type": "Tijera", "img": "/static/images/mortys/pm-172.png" },
  { "id": 15, "name": "Morty Vampiro", "type": "Papel", "img": "/static/images/mortys/pm-153.png" }
]

# Limpia la colección si ya existía
mortys.delete_many({})
mortys.insert_many(morty_list)

print("Mortys insertados correctamente.")
