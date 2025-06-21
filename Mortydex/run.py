from flask import Flask, render_template, request, redirect, url_for

# Inicializa la app Flask con carpetas estáticas y plantillas
app = Flask(
    __name__,
    static_folder='app/static',      # Carpeta de recursos estáticos (css, js, imágenes)
    static_url_path='/static',       # Ruta pública para acceder a estáticos
    template_folder='app/templates'  # Carpeta de plantillas HTML
)

# Página principal (Mortydex)
@app.route('/')
def index():
    return render_template('index.html')

# Página del foro (Hallazgos)
@app.route('/hallazgos')
def hallazgos():
    posts = [
        {
            'id': 1,
            'title': 'Nuevo Morty Mutante descubierto',
            'content': 'Encontré un Morty de tipo Mutante en la dimensión C-137, ¡parece tener habilidades increíbles!',
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
            'seen_count': 3,
            'comments': [
                {'user': 'Beth', 'text': '¡Cuidado con esos colmillos!' }
            ]
        }
    ]
    return render_template('hallazgos.html', posts=posts)

# Página de inventario
@app.route('/inventario')
def inventario():
    # Ejemplo de items, más adelante vendrán desde base de datos
    items = []
    return render_template('inventario.html', items=items)

# Página de login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Aquí procesarías el formulario de login
        return redirect(url_for('index'))
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True)
