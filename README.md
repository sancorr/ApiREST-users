# API de Autenticación de Usuarios

Esta es una API simple para el registro, inicio de sesión y manejo de usuarios, utilizando Express.js, PostgreSQL y JWT para la autenticación. La API permite registrar nuevos usuarios, iniciar sesión con credenciales y obtener una lista de usuarios (con autenticación mediante JWT).

# Funcionalidades

* Registrar usuarios: Permite crear un nuevo usuario con nombre de usuario, email y contraseña.
* Iniciar sesión: Permite a los usuarios iniciar sesión proporcionando su email y contraseña.
* Obtener lista de usuarios: Permite obtener la lista de usuarios registrados, protegida por autenticación JWT.

## Tecnologías utilizadas

* Node.js: Backend de la API.
* Express.js: Framework para el servidor.
* PostgreSQL: Base de datos para almacenar la información de los usuarios.
* JWT (JSON Web Token): Autenticación y autorización de usuarios.
* Bcrypt: Hashing de contraseñas para almacenamiento seguro.

## Requisitos previos
1. **Node.js**: Asegúrate de tener instalado [Node.js](https://nodejs.org/). Puedes verificarlo ejecutando el siguiente comando:

   ```bash
   node -v
2. **PostgreSQL**: Asegúrate de tener acceso a una base de datos PostgreSQL en la nube Yo use Railway
3. **Instalar dependencias:**: Antes de ejecutar el proyecto, instala las dependencias necesarias. Para ello, navega a la carpeta raíz del proyecto y ejecuta:

   ```bash
   npm install

## Configuración
Clonar el repositorio

Para comenzar a trabajar con el proyecto, clona este repositorio:
```bash
git clone <URL_DEL_REPOSITORIO>

Configurar el archivo .env

El proyecto utiliza un archivo .env para configurar las variables de entorno. Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables:

DATABASE_URL=postgresql://postgres:KGBUuruLzdydzQEKlGLukcUKBAhMDnGs@autorack.proxy.rlwy.net:59505/railway 

JWT_SECRET=prueba_tecnica_Vittio


Conectar a PostgreSQL

Asegúrate de que tu base de datos PostgreSQL esté funcionando y accesible.

Si prefieres configurar la base de datos localmente, asegúrate de que PostgreSQL esté corriendo en tu máquina y que hayas creado la base de datos mencionada en la URL de conexión

Estructura de la base de datos

Este proyecto requiere una tabla users en PostgreSQL. A continuación te dejo el SQL necesario para crear la tabla:

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



EJECUTAR EL PROYECTO

Una vez que hayas configurado el archivo .env y creado la base de datos, puedes ejecutar el proyecto de la siguiente manera:

1-Iniciar el servidor

Ejecuta el siguiente comando para iniciar el servidor:

npm start

Esto iniciará el servidor en http://localhost:3000 por defecto.

2- Acceder a la API

Registrar un nuevo usuario: Realiza una solicitud POST a http://localhost:3000/api/register con los datos username, email, y password en el cuerpo de la solicitud (JSON).

Ejemplo de solicitud:

{
  "username": "usuarioEjemplo",
  "email": "usuario@example.com",
  "password": "contraseñaSegura"
}


Iniciar sesión: Realiza una solicitud POST a http://localhost:3000/api/login con los datos email y password en el cuerpo de la solicitud (JSON).

Ejemplo de solicitud:

{
  "email": "usuario@example.com",
  "password": "contraseñaSegura"
}

Obtener lista de usuarios: Realiza una solicitud GET a http://localhost:3000/api/users con el token JWT en el encabezado Authorization como Bearer <JWT_TOKEN>.

Ejemplo de solicitud:
curl -H "Authorization: Bearer <JWT_TOKEN>" http://localhost:3000/api/users



Rutas
POST /api/register
Registra un nuevo usuario. Se requiere que el cuerpo de la solicitud contenga username, email y password.

POST /api/login
Inicia sesión y devuelve un token JWT. Se requiere que el cuerpo de la solicitud contenga email y password.

GET /api/users
Devuelve la lista de todos los usuarios registrados. Se requiere que la solicitud esté autenticada con un token JWT en el encabezado Authorization






