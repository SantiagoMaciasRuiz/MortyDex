# routes/inventario.py
import os
from flask import Blueprint, request, redirect, url_for, flash, session, render_template
from werkzeug.utils import secure_filename
from datetime import datetime
from pymongo import MongoClient

bp_inventario = Blueprint('inventario', __name__)
UPLOAD_FOLDER = os.path.join('app', 'static', 'images', 'mortys')
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}

client = MongoClient("mongodb://localhost:27017/")
db = client["mortydex"]
items_collection = db["items"]

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@bp_inventario.route("/inventario/agregar", methods=["POST"])
def agregar_morty():
    nombre = request.form.get("nombre")
    tipo = request.form.get("tipo")
    imagen = request.files.get("imagen")

    if not all([nombre, tipo, imagen]):
        flash("Faltan campos", "error")
        return redirect(url_for("inventario.inventario"))

    if imagen and allowed_file(imagen.filename):
        # Contar cuántos mortys hay
        count = items_collection.count_documents({})
        filename = f"PM-{count + 1:03d}.jpg"
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        imagen.save(filepath)

        item = {
            "nombre": nombre,
            "tipo": tipo,
            "img": f"/static/images/mortys/{filename}",
            "user_id": session.get("user_id", "anon"),
            "fecha": datetime.utcnow()
        }

        items_collection.insert_one(item)
        flash("✅ Morty agregado con éxito", "success")
    else:
        flash("❌ Archivo no permitido", "error")

    return redirect(url_for("inventario.inventario"))

@bp_inventario.route("/inventario")
def inventario():
    user_id = session.get('user_id')
    items = list(items_collection.find({"user_id": user_id}))
    return render_template("inventario.html", items=items)
