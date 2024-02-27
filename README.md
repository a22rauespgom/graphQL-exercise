# Ejercicio GraphQL + ApolloQL


## Tabla de contenidos

- [Requisitos](#requisitos)
- [Configuración del Proyecto](#configuración-del-proyecto)
  - [Backend (Node.js)](#backend-nodejs)
  - [Frontend (Vue.js)](#frontend-vuejs)

## Requisitos

- Node.js
- npm (Node Package Manager)

## Configuración del Proyecto

### Backend (Node.js)

1. Ve a la carpeta `Back`.

2. Instala las dependencias utilizando npm:

    ```bash
    npm install
    ```

3. Configura las variables de entorno si es necesario.

4. Inicia el servidor:

    ```bash
    npm run dev
    ```

### Frontend (Vue.js)

1. Ve a la carpeta `Vue`.

2. Instala las dependencias utilizando npm:

    ```bash
    npm install
    ```

3. Configura las variables de entorno si es necesario.

4. Inicia la aplicación en modo de desarrollo:

    ```bash
    npm run dev
    ```

## Explicación archivos

### Schema.js
El archivo schema.js define el esquema de una API GraphQL. Este esquema especifica qué tipos de datos están disponibles y qué operaciones se pueden realizar en la API.

```javascript
type Query {
    books: [Book]
    book(id: ID!): Book
    authors: [Author] 
}
```

