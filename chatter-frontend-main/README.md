# Front End - Chatter

<hr />

## Estructura del proyecto

```
.
├── .next
├── public
├── src
│   ├── assets
│   │   └──
│   ├── components
│   │   └── ...
│   ├── layout
│   │   └── ...
│   ├── pages
│   │   └── ...
│   ├── redux
│   │   └── ...
│   ├── types
│   │   └── ...
│   ├── utils
│   │   └── ...
│   ├── App.css
│   ├── App.test.css
│   ├── index.css
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── .gitignore
├── next-env.d.ts
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
└── tsconfig.tsbuildinfo
```

<hr />

## Correr el cliente

- Utilizar `npm run dev` para correr en development.

## Funcionalidades (Conexión)

Entre ellas están el inicio de sesión, registrarse, enviar mensaje, obtener los mensajes, etc.

Implementar el manejo de sockets utilizando la librería [socket.io](https://socket.io/). Toda la documentación sobre los sockets que retorna la API se encuentra en el README.md de [chatter_api](/chatter-api-main/)

Persistir el JWT en la sesión de manera que al recargar la página no se pierda el usuario loggeado.

## Tecnologías

- React
- Next.js
- Redux
- Typescript
- Styled components
- Axios
