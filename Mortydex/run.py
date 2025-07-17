from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
from bson import ObjectId
import os
from dotenv import load_dotenv
from functools import wraps
from flask import jsonify
from random import choice
import subprocess
import atexit
import sys

# Cargar variables de entorno
load_dotenv()

# Inicializa la app Flask con carpetas estáticas y plantillas
app = Flask(
    __name__,
    static_folder='app/static',      # Carpeta de recursos estáticos (css, js, imágenes)
    static_url_path='/static',       # Ruta pública para acceder a estáticos
    template_folder='app/templates'  # Carpeta de plantillas HTML
)

# Configuraciones
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'tu-clave-secreta-para-sesiones')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'tu-clave-jwt-secreta')

# Configurar JWT
jwt = JWTManager(app)

# Configuración de MongoDB
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
DATABASE_NAME = os.getenv('DATABASE_NAME', 'mortydex')

try:
    client = MongoClient(MONGO_URI)
    db = client[DATABASE_NAME]
    users_collection = db.users
    posts_collection = db.posts
    items_collection = db.items
    mortys_collection = db.mortys

    print("Conexión a MongoDB exitosa")
except Exception as e:
    print(f"Error conectando a MongoDB: {e}")

# Decorador para rutas que requieren login
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            flash('Debes iniciar sesión para acceder a esta página', 'error')
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function
# Ruta de prueba para verificar conexión a MongoDB
@app.route('/ping')
def ping():
    try:
        mongo.db.command("ping")
        return jsonify({'status': 'Conectado a MongoDB'})
    except Exception as e:
        return jsonify({'error': str(e)})
# Clase Usuario para manejo de datos
class Usuario:
    def __init__(self, username, email, password_hash=None):
        self.username = username
        self.email = email
        self.password_hash = password_hash
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def save(self):
        user_data = {
            'username': self.username,
            'email': self.email,
            'password_hash': self.password_hash
        }
        result = users_collection.insert_one(user_data)
        return result.inserted_id
    
    @staticmethod
    def find_by_username(username):
        user_data = users_collection.find_one({'username': username})
        if user_data:
            user = Usuario(user_data['username'], user_data['email'])
            user.password_hash = user_data['password_hash']
            user.id = str(user_data['_id'])
            return user
        return None
    
    @staticmethod
    def find_by_email(email):
        user_data = users_collection.find_one({'email': email})
        if user_data:
            user = Usuario(user_data['username'], user_data['email'])
            user.password_hash = user_data['password_hash']
            user.id = str(user_data['_id'])
            return user
        return None

# Rutas de autenticación
@app.route('/crear_sesion', methods=['POST'])
def crear_sesion():
    data = request.get_json()
    username = data.get('username')

    user = Usuario.find_by_username(username)
    if user:
        session['user_id'] = user.id
        session['username'] = user.username  # 👈 esta línea es clave
        return jsonify({'message': 'Sesión iniciada correctamente'}), 200

    return jsonify({'error': 'Usuario no encontrado'}), 404

# debuug    _request
def mostrar_sesion_en_consola():
    print("🧠 Session:", dict(session))



@app.route('/api/mortys')
def get_mortys():
    mortys = list(db.mortys.find({}, {'_id': 0}))  # excluye _id de Mongo
    return jsonify(mortys)

# Página principal (Mortydex)
@app.route('/')
def index():
    return render_template('index.html')

# Página del foro (Hallazgos) - ahora requiere login
@app.route('/hallazgos')
@login_required
def hallazgos():
    # Obtener posts desde MongoDB
    posts_cursor = posts_collection.find().sort('created_at', -1)
    posts = []
    
    for post in posts_cursor:
        posts.append({
            'id': str(post['_id']),
            'title': post.get('title', ''),
            'content': post.get('content', ''),
            'author': post.get('author', 'Anónimo'),
            'seen_count': post.get('seen_count', 0),
            'comments': post.get('comments', [])
        })
    
    # Si no hay posts en la DB, usar datos de ejemplo
    if not posts:
        posts = [
            {
                'id': 1,
                'title': 'Nuevo Morty Mutante descubierto',
                'content': 'Encontré un Morty de tipo Mutante en la dimensión C-137, ¡parece tener habilidades increíbles!',
                'author': session.get('username', 'Rick'),
                'seen_count': 5,
                'comments': [
                    {'user': 'Rick', 'text': 'Increíble hallazgo!'},
                    {'user': 'Summer', 'text': '¡Yo también lo vi!' }
                ]
            },
            {
                'id': 2,
                'title': 'Morty Vampiro avistado',
                'content': 'Un Morty Vampiro apareció en el cementerio de Citadel, ¡cuidado con los colmillos!',
                'author': session.get('username', 'Beth'),
                'seen_count': 3,
                'comments': [
                    {'user': 'Beth', 'text': '¡Cuidado con esos colmillos!' }
                ]
            }
        ]
    
    return render_template('hallazgos.html', posts=posts)

# Página de inventario - ahora requiere login
@app.route('/inventario')
@login_required
def inventario():
    # Obtener items del usuario desde MongoDB
    user_id = session.get('user_id')
    items_cursor = items_collection.find({'user_id': user_id})
    items = list(items_cursor)
    
    return render_template('inventario.html', items=items)

# API para obtener posts (usado por JavaScript)
@app.route('/api/posts')
def api_posts():
    posts_cursor = posts_collection.find().sort('created_at', -1)
    posts = []

    for post in posts_cursor:
        posts.append({
            'id': str(post['_id']),
            'title': post.get('title', ''),
            'content': post.get('content', ''),
            'author': post.get('author', 'Anónimo'),
            'seen_count': post.get('seen_count', 0),
            'comments': post.get('comments', []),
            'morty_img': post.get('morty_img', '/static/images/mortys/avatar_morty.png'),
            'morty_type': post.get('morty_type', 'Desconocido')
        })

    return jsonify(posts)


# Página de login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        if not username or not password:
            flash('Por favor, completa todos los campos', 'error')
            return render_template('login.html')
        
        # Buscar usuario en la base de datos
        user = Usuario.find_by_username(username)
        
        if user and user.check_password(password):
            # Login exitoso
            session['user_id'] = user.id
            session['username'] = user.username
            flash(f'¡Bienvenido, {user.username}!', 'success')
            
            # Redirigir a la página que intentaba acceder o al inicio
            next_page = request.args.get('next')
            return redirect(next_page) if next_page else redirect(url_for('index'))
        else:
            flash('Credenciales inválidas', 'error')
    
    return render_template('login.html')
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')

        # Validaciones...
        
        if Usuario.find_by_username(username):
            flash('El nombre de usuario ya está en uso', 'error')
            return render_template('register.html')

        if Usuario.find_by_email(email):
            flash('El email ya está registrado', 'error')
            return render_template('register.html')

        # # ✅ Obtener morty aleatorio
        # mortys = list(mortys_collection.find({}))
        # avatar = choice(mortys)['img'] if mortys else '/static/images/icons/default.png'

        try:
            user = Usuario(username, email)
            user.set_password(password)
            user_id = user.save()

            flash('¡Registro exitoso! Ahora puedes iniciar sesión', 'success')
            return redirect(url_for('login'))

        except Exception as e:
            flash(f'Error al registrar usuario: {str(e)}', 'error')

    return render_template('register.html')
# Cerrar sesión
@app.route('/logout')
def logout():
    session.clear()
    flash('Has cerrado sesión exitosamente', 'info')
    return redirect(url_for('index'))

# Ruta para crear posts (ejemplo)


@app.route('/crear_post', methods=['POST'])
@login_required
def crear_post():
    title = request.form.get('title')
    content = request.form.get('content')

    if title and content:
        # 👉 Elegir un Morty aleatorio
        morty = db.mortys.aggregate([{'$sample': {'size': 1}}]).next()

        post_data = {
            'title': title,
            'content': content,
            'author': session.get('username'),
            'user_id': session.get('user_id'),
            'seen_count': 0,
            'comments': [],
            'created_at': datetime.utcnow(),
            #  Agregar imagen y tipo del Morty
            'morty_name': morty.get('name'),
            'morty_type': morty.get('type'),
            'morty_img': morty.get('img')
        }

        posts_collection.insert_one(post_data)
        flash('Post creado exitosamente', 'success')

    return redirect(url_for('hallazgos'))


# API endpoints para uso con JavaScript  
@app.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    user = Usuario.find_by_username(username)
    
    if user and user.check_password(password):
        access_token = create_access_token(identity=username)
        return {
            'success': True,
            'access_token': access_token,
            'username': username,
            'message': 'Login exitoso'
        }, 200
    
    return {'success': False, 'message': 'Credenciales inválidas'}, 401

# Obtener la ruta absoluta del script actual
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Ruta al script export_DB.py dentro de la carpeta Mortydex
EXPORT_SCRIPT_PATH = os.path.join(BASE_DIR, 'export_DB.py')


def guardar_datos_al_cerrar():
    print("💾 Exportando datos antes de cerrar...")
    try:
        # Ejecutar el script de exportación
        subprocess.run([sys.executable, EXPORT_SCRIPT_PATH], check=True)

        print("✅ Datos exportados correctamente.")
    except Exception as e:
        print(f"❌ Error exportando base de datos: {e}")

# Registrar la función para que se ejecute al cerrar la app
atexit.register(guardar_datos_al_cerrar)


if __name__ == '__main__':
    app.run(debug=False)