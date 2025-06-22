from jinja2 import Environment, FileSystemLoader
import os
import shutil

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

# Copiar archivos estáticos a docs/
static_src = 'Mortydex/app/static'
static_dst = 'docs/static'

if os.path.exists(static_dst):
    shutil.rmtree(static_dst)

shutil.copytree(static_src, static_dst)
