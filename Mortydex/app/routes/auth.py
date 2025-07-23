from flask import Blueprint, request, jsonify, session
from models.usuario import Usuario
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        # Validar que no exista el usuario
        if Usuario.find_by_username(username):
            return jsonify({'error': 'El usuario ya existe'}), 400
        
        if Usuario.find_by_email(email):
            return jsonify({'error': 'El email ya está registrado'}), 400
        
        # Crear nuevo usuario
        user = Usuario(username, email)
        user.set_password(password)
        user.save()
        
        return jsonify({'message': 'Usuario registrado exitosamente'}), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        user = Usuario.find_by_username(username)
        
        if user and user.check_password(password):
            access_token = create_access_token(identity=username)
            return jsonify({
                'access_token': access_token,
                'username': username,
                'message': 'Login exitoso'
            }), 200
        
        return jsonify({'error': 'Credenciales inválidas'}), 401
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    user = Usuario.find_by_username(current_user)
    
    if user:
        return jsonify({
            'username': user.username,
            'email': user.email
        }), 200
    
    return jsonify({'error': 'Usuario no encontrado'}), 404