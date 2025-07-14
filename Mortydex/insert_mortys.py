from pymongo import MongoClient
from datetime import datetime

client = MongoClient("mongodb://localhost:27017/")
db = client['mortydex']
posts_collection = db['posts']

posts = [
    {
        'title': 'Han visto el morty Guineo?',
        'content': 'Estaba relajadito en Urabá y me encontré este care banano, no sé si alguien más lo habrá visto pero que hpta tiradero de caja',
        'author': 'Rick',
        'seen_count': 5,
        'comments': [
            {'user': 'Rick', 'text': 'Qué chimba!'},
            {'user': 'Summer', 'text': '¡Yo también lo vi!'}
        ],
        'morty_img': '/static/images/mortys/morty_guineo.png',  # 👈 Añadir imagen
        'morty_type': 'Plátano',
        'created_at': datetime.utcnow()
    },
    {
        'title': 'Morty Vampiro avistado',
        'content': 'Un Morty Vampiro apareció en el cementerio de Itagüí, ¡cuidado con los colmillos!',
        'author': 'Beth',
        'seen_count': 3,
        'comments': [
            {'user': 'Beth', 'text': '¡Cuidado con esos colmillos!'}
        ],
        'morty_img': '/static/images/mortys/vampire_morty.png',
        'morty_type': 'Oscuro',
        'created_at': datetime.utcnow()
    }
]

result = posts_collection.insert_many(posts)
print(f"{len(result.inserted_ids)} posts insertados.")
