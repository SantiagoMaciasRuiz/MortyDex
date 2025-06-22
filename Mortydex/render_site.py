from jinja2 import Environment, FileSystemLoader
import os

# Directorio donde están las plantillas
template_dir = 'Mortydex/app/templates'

# Crear entorno de Jinja2
env = Environment(loader=FileSystemLoader(template_dir))

# Cargar plantilla
template = env.get_template('index.html')

# Variables de contexto que uses en tu plantilla
contexto = {
    'titulo': 'Bienvenido a MortyDex',
    # Agrega más variables si tu plantilla las necesita
}

# Renderizar la plantilla con los datos
rendered_html = template.render(contexto)

# Crear carpeta 'docs' si no existe
os.makedirs('docs', exist_ok=True)

# Guardar el HTML renderizado en la carpeta 'docs'
with open('docs/index.html', 'w', encoding='utf-8') as f:
    f.write(rendered_html)
