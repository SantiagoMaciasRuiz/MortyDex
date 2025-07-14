class Usuario:
    def __init__(self, username, email, password_hash=None, avatar=None):
        self.username = username
        self.email = email
        self.password_hash = password_hash
        self.avatar = avatar  # 🎯 nuevo campo
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def save(self):
        user_data = {
            'username': self.username,
            'email': self.email,
            'password_hash': self.password_hash,
            'avatar': self.avatar  # ✅ guardamos el avatar
        }
        result = users_collection.insert_one(user_data)
        return result.inserted_id
    
    @staticmethod
    def find_by_username(username):
        user_data = users_collection.find_one({'username': username})
        if user_data:
            user = Usuario(
                user_data['username'],
                user_data['email'],
                user_data.get('password_hash'),
                user_data.get('avatar')  # ✅ leer el avatar si existe
            )
            return user
        return None
    
    @staticmethod
    def find_by_email(email):
        user_data = users_collection.find_one({'email': email})
        if user_data:
            user = Usuario(
                user_data['username'],
                user_data['email'],
                user_data.get('password_hash'),
                user_data.get('avatar')
            )
            return user
        return None
