# Hackathon - Hack The System 2021-2022 #

----------


### < OhMyCode /> Backend en NodeJS/MongoDB

----------

OhMyCode es una aplicación web realizada para el Hackathon de "Hack The System". Se trata de una plataforma de aprendizaje en la que se busca acercar la programación a las personas que quieren iniciarse en este mundo, por lo que principalmente la idea está enfocada en aprender a programar desde cero.

No obstante se tiene en cuenta la posibilidad de escalar esta idea a más formaciones dentro de la misma plataforma.


## Instrucciones

Para el correcto funcionamiento de la aplicación será necesario renombrar el archivo ".env.example" por ".env" y modificar si fuera necesario, los datos de ejemplo proporcionados como variables de entorno.

### Instalar dependencias del proyecto:

En primer lugar, debemos usar el siguiente comando para instalar todas las dependencias del proyecto:

    npm install


### Inicializar la base de datos:

Para inicializar la base de datos con los datos de ejemplo, se ha creado un Script que realizará todo este proceso. Para ello debe ejecutar el siguiente comando desde la raíz del proyecto:

    npm run install_db

> Este proceso creará la base de datos con 2 cursos y 1 usuarios de prueba:

> user@example.com - Contraseña: 1234


### Iniciar proyecto en modo desarrollo:

Para arrancar el proyecto en modo desarrollo se usará:

    npm run dev


### Rutas API:

> Se incluye una colección de "POSTMAN" para importarla y tener ya las rutas correspondientes

**POST:**

Registro de usuarios:
> /apiv1/register

Al hacer una petición "POST" a la siguiente ruta con usuario y contraseña, devuelve un TOKEN implementado con JWT para poder usar en la cabecera "Authorization" en el resto de peticiones:

> /apiv1/authenticate

Para poder crear cursos usando la siguiente petición, añadir el TOKEN en la cabecera "Authorization":

> /apiv1/cursos


**GET:**

Para poder mostrar los cursos usando la siguiente petición, añadir el TOKEN en la cabecera "Authorization":

> /apiv1/cursos

Para poder mostrar los usuarios usando la siguiente petición, añadir el TOKEN en la cabecera "Authorization":

> /apiv1/usuarios


**PUT:**

Para poder actualizar la lista "users" en los cursos (usuarios inscritos en un curso), usar la siguiente petición:

> /apiv1/cursos/id

Para poder actualizar la lista "courses" en los usuarios (cursos en los que está inscrito un usuario), usar la siguiente petición:

> /apiv1/usuarios/id


**DELETE:**

Para eliminar un curso, usar la siguiente petición:

> /apiv1/cursos/id

Para eliminar un usuario, usar la siguiente petición:

> /apiv1/usuarios/id
