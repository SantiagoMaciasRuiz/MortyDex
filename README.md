# Mortydex


**Mortydex** es una aplicación web desarrollada con Flask que permite interactuar con una base de datos de personajes, episodios y otras características del universo de _Rick and Morty_. Este proyecto tiene como objetivo proporcionar una plataforma fácil de usar para consultar la información sobre los diferentes tipos de Mortys y sus afinaciones.


---

## Equipo de Desarrollo

- **Juan Camilo Valencia Garcia** – [jcvalenciaga@unal.edu.co](mailto:jcvalenciaga@unal.edu.co)
- **Santiago Macias Ruiz** – [smaciasr@unal.edu.co](mailto:smaciasr@unal.edu.co)
- **Julian Orrego Martinez** – [jorrego@unal.edu.co](mailto:jorrego@unal.edu.co)
- **Juan Felipe Lopez Ramirez** – [jualopezra@unal.edu.co](mailto:jualopezra@unal.edu.co)

---

## Tecnologías Utilizadas

- Python 3.11+
- Flask
- MongoDB (local)
- HTML5 + CSS3 (Jinja2 templates)
- JavaScript
- JWT Authentication
- dotenv

---

## Requisitos Previos

- Tener instalado **Python 3.10 o superior**.
- Tener instalado **MongoDB local** (ejecutando en `localhost:27017`).
  > Puedes descargarlo desde: https://www.mongodb.com/try/download/community

---

## Primera vez usando MongoDB 📦

No necesitas crear manualmente la base de datos. Al ejecutar el script `load_DB.py`, MongoDB creará automáticamente:

- La base de datos `mortydex`
- Las colecciones `mortys`, `posts`, y `users`
- Los datos se cargarán desde archivos JSON ubicados en la carpeta `/data`

Solo asegúrate de que:

1. MongoDB esté instalado y corriendo en tu máquina local (`mongod`)
2. Estés dentro del entorno virtual (si lo usas)

## Instalación del Proyecto

### 1. Clona el repositorio

```bash
git clone https://github.com/tu_usuario/mortydex.git
cd mortydex
```

### 2. Crea y activa un entorno virtual

```bash
python -m venv venv
venv\Scripts\activate        # En Windows
# source venv/bin/activate  # En Mac/Linux
```

### 3. Instala las dependencias

```bash
pip install -r Mortydex/requirements/requirements.txt
```

### 4. Inicializa la Base de Datos

Antes de correr el servidor, ejecuta el siguiente script para cargar datos de ejemplo desde los archivos JSON:

```bash
python Mortydex/load_DB.py
```

### 5. Ejecutar el Proyecto

```bash
  python Mortydex/run.py
```

### 6. Abre la pagina en el navegador:

Cuando hayas iniciado la ejecución de run.py dirigete en tu navegador a la siguiente ip:

   http://127.0.0.1:5000
