# API REST

<div style="text-align: justify">

<hr/>

## Introducción

**Chatter** es una app de mensajes, muy parecida a WhatsApp u otras aplicaciones de mensajería. En este repositorio se encuentra la API REST con la cual el frontend obtiene toda la información de usuarios y sus respectivos chats.

## Modelo de clases

Las clases que maneja chatter para administrar sus mensajes son las siguientes:

#### 1. User

Es la persona que utiliza la aplicación, capaz de mandar y recibir mensajes, iniciar sesión y evidentemente, registrarse.

**Atributos**

|  Nombre  |   Tipo   |
| :------: | :------: |
|  userId  |  string  |
|   name   |  string  |
| lastName |  string  |
|  email   |  string  |
| password |  string  |
|  image   |  string  |
|  chats   | Chat [ ] |

#### 2. Chat

Conversación entera entre un usuario y otra persona (no es necesario que la otra persona este registrada en la aplicación para enviarle un mensaje). Dentro del chat, se encuentra la información básica del destinatario junto con el conjunto de mensajes que la conforman.

**Atributos**

|  Nombre  |    Tipo     |
| :------: | :---------: |
|  chatId  |   string    |
|   name   |   string    |
|  image   |   string    |
| messages | Message [ ] |

#### 2. Message

Último pero no menos importante se encuentra el mensaje en sí. Está conformado únicamente por el texto y por un atributo booleano **received** que indica si el mensaje fue recibido por el usuario _(received = true)_ o enviado por él _(received = false)_.

**Atributos**

|  Nombre   |  Tipo   |
| :-------: | :-----: |
| messageId | string  |
|  message  | string  |
| received  | boolean |

<hr />

## Endpoints

La API cuenta con endpoints para generar las acciones en el servidor. Las acciones pueden ser categorizadas por dos tipos: Acciones de **usuario** y acciones de **chats** Las acciones de usuario hacen referencia a todo lo que es el manejo de la cuenta, como por ejemplo registrar un nuevo usuario o iniciar sesión, mientras que las de chats se encargan de todo el manejo de mensajería, como enviar un mensaje o borrar un chat.

#### 1. Acciones de usuario

##### Obtener el usuario loggeado

##### `GET /users`

Retorna toda la información del usuario loggeado. El ID del usuario es obtenido mediante el JWT.

|      Caso      | Status |                Respuesta                 |
| :------------: | :----: | :--------------------------------------: |
|     Exito      |  200   |                 { user }                 |
|   Not Found    |  404   |      { message: 'User not found' }       |
|     Fallo      |  500   | { message: 'Error while fetching data' } |
| No autoritzado |  401   |    { message: 'Unauthorized action' }    |

##### Eliminar el usuario loggeado

##### `DELETE /users`

Elimina al usuario loggeado. El ID del usuario es obtenido mediante el JWT.

|      Caso      | Status |                Respuesta                 |
| :------------: | :----: | :--------------------------------------: |
|     Exito      |  201   | { message: 'User deleted successfully' } |
|  No hay Token  |  401   |    { message: 'Unauthorized action' }    |
|     Fallo      |  500   | { message: 'Error while fetching data' } |
| No autoritzado |  401   |    { message: 'Unauthorized action' }    |

##### Crear un usuario

##### `POST /signup`

En el body de la request:

```js
{
    name: string,
    lastName: string,
    email: string,
    password: string,
    image: file (PNG, JPG, JPEG)
}
```

Si los datos del cuerpo de la request están correctos, se creará el usuario en la base de datos con un ID autogenerado. Este usuario ahora podrá enviar mensajes y crear conversarciones. Aún asi incluso despues de ser creado, es necesario iniciar sesión para obtener su Token.

|                    Caso                    | Status |                                                          Respuesta                                                           |
| :----------------------------------------: | :----: | :--------------------------------------------------------------------------------------------------------------------------: |
|                   Exito                    |  201   |                                         { message: 'User registered successfully' }                                          |
|          Mail ingresado ya existe          |  409   |                                            { message: 'User already registered' }                                            |
|                   Fallo                    |  500   |                                           { message: 'Error while fetching data' }                                           |
|  No se encontró una imagen en la consulta  |  422   |                                              { message: 'Missing image file' }                                               |
| Datos ingresados están en formato inválido |  400   | { message: 'Bad Request: Make sure all attributes and their types are OK', attributes: { name, lastName, email, password } } |

##### Iniciar sesión

##### `POST /login`

En el body de la request:

```js
{
    email: string,
    password: string
}
```

Si el email y la contraseña corresponden a un usuario existente, la consulta devuele el Auth Token para realizar las operaciones de administrador del usuario, como borrarlo, crear un chat, etc. Este token debe ser ingresado en las consultas que correspondan para que éstas tengan efecto.

|                    Caso                    | Status |                                                  Respuesta                                                   |
| :----------------------------------------: | :----: | :----------------------------------------------------------------------------------------------------------: |
|                   Exito                    |  201   |                             { message: 'Logged In successfully', userId, token }                             |
|       Mail o contraseña incorrectos        |  401   |                                  { message: 'Incorrect email or password' }                                  |
|                   Fallo                    |  500   |                                   { message: 'Error while fetching data' }                                   |
| Datos ingresados están en formato inválido |  400   | { message: 'Bad Request: Make sure all attributes and their types are OK', attributes: { email, password } } |

#### 2. Acciones de chats

##### Obtener todos los chats del usuario loggeado

##### `GET /chats`

Retorna toda la información de los chats del usuario con todos sus respectivos mensajes. Debe incluirse el **Auth Token** del usuario en la consulta para que ésta tenga efecto.

|      Caso      | Status |             Respuesta              |
| :------------: | :----: | :--------------------------------: |
|     Exito      |  200   |      { chats: [ { chat } ] }       |
| No autoritzado |  401   | { message: 'Unauthorized action' } |

##### Crear un chat para el usuario loggeado

##### `POST /chats`

En el body de la request:

```js
{
    name: string,
    image: file (PNG, JPG, JPEG)
}
```

Crea un nuevo chat con una persna con el nombre y foto de perfil dados en el cuerpo de la request. Debe incluirse el **Auth Token** del usuario en la consulta para que ésta tenga efecto.

|      Caso      | Status |                Respuesta                 |
| :------------: | :----: | :--------------------------------------: |
|     Exito      |  201   | { message: 'Chat created successfully' } |
|     Fallo      |  500   | { message: 'Error while fetching data' } |
| No autoritzado |  401   |    { message: 'Unauthorized action' }    |

##### Enviar nuevo mensaje a un chat del usuario loggeado

##### `POST /chats/:chatId`

En el body de la request:

```js
{
	message: string;
}
```

Envía un nuevo mensaje desde el usuario al chat con _chatId_ ingresado por parámetro y con el texto dado en el cuerpo de la request. Debe incluirse el **Auth Token** del usuario en la consulta para que ésta tenga efecto.

|      Caso      | Status |                Respuesta                 |
| :------------: | :----: | :--------------------------------------: |
|     Exito      |  201   | { message: 'Message sent successfully' } |
| chat no existe |  404   | { message: 'Could not find user chat' }  |
|     Fallo      |  500   | { message: 'Error while fetching data' } |
| No autoritzado |  401   |    { message: 'Unauthorized action' }    |

##### Eliminar un chat del usuario loggeado

##### `DELETE /chats/:chatId`

Elimina el chat con _chatId_ del de la lista de chats del usuario. Debe incluirse el **Auth Token** del usuario en la consulta para que ésta tenga efecto.

|      Caso      | Status |                    Respuesta                     |
| :------------: | :----: | :----------------------------------------------: |
|     Exito      |  201   | { message: 'Chat history deleted successfully' } |
| chat no existe |  404   |     { message: 'Could not find user chat' }      |
|     Fallo      |  500   |     { message: 'Error while fetching data' }     |
| No autoritzado |  401   |        { message: 'Unauthorized action' }        |

<hr/>

## Sockets

Se utiliza la tecnología de <a href="https://socket.io/">Sockets.io</a> para generar sockets y avisar al front end cada vez que se creen o modifiquen estados. El servidor se encuentra en _http://localhost:8080_, por lo que los sockets deben escuchar a esa URL. Los tipos de sockets posibles son:

### 1. Sockets de usuario

#### Usuario eliminado

```js

on 'users'
{
    action: 'delete',
    userId: userId
}

```

#### Usuario creado / registrado

```js

on 'users'
{
    action: 'register',
    userId: userId
}

```

### 2. Sockets de chats

#### Nuevo chat creado

```js

'chats'
{
    action: 'create',
    userId: userId,
    chatId: chatId
}

```

#### Nuevo mensaje enviado

```js

on 'chats'
{
    action: 'SentNewMessage',
    userId: userId,
    chatId: chatId
}

```

#### Chat eliminado

```js

on 'chats'
{
    action: 'delete',
    userId: userId,
    chatId: chatId
}

```

#### Nuevo mensaje recibido

Esta característica es especial, ya que dado que la API a la que se consulta no es una realmente funcional, no existe el concepto de "recibir un nuevo mensaje". De todas formas, para poder evaluar el área, la API enviará un nuevo mensaje de respuesta autogenerado a los 5 segundos luego de recibir uno. Una vez se dispare el mensaje, se notificará al front mediante el siguiente socket:

```js

// SI EL MENSAJE LLEGA CORRECTAMENTE:

on 'chats'
{
    action: 'ReceivedNewMessage',
    userId: userId,
    chatId: chatId
}

// SI HUBO UN FALLO Y EL MENSAJE NO SE PUDO ENVIAR: (30% DE PROBABILIDAD DE QUE SUCEDA)

on 'chats'
{
    action: 'error',
    error: 'Could not fetch database while sending a reply message'
}

```

<hr />
