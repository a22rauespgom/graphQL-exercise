# Ejercicio GraphQL + ApolloQL


## Tabla de contenidos

- [Requisitos](#requisitos)
- [Configuración del Proyecto](#configuración-del-proyecto)
    - [Backend (Node.js)](#backend-nodejs)
    - [Frontend (Vue.js)](#frontend-vuejs)
- [GraphQL + ApolloQL](#graphql--apolloql)
    - [Definición del Schema](#definición-del-schema)
    - [Definición de los resolvers](#definición-de-los-resolvers)
    - [Consultas básicas](#consultas-básicas)

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

## GraphQL + ApolloQL

### Definición del Schema

El esquema GraphQL define los tipos de datos y las relaciones entre ellos. Para nuestro caso de uso de gestión de libros y autores, nuestro esquema se verá así:

```javascript
type Query {
    books: [Book]
    book(id: ID!): Book
    authors: [Author] 
}

  type Mutation {
    addBook(title: String!, authorId: ID!): Book
    addAuthor(name: String!): Author
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
  }

  type Author {
    id: ID!
    name: String!
  }
```

En nuestro esquema, definimos tipos de datos como Book y Author, así como consultas (Query) y mutaciones (Mutation) para interactuar con esos datos.

### Definición de los resolvers

### Consultas básicas

```javascript
{
  books {
    id
    title
    author {
      name
    }
  }
}
```
```javascript
{
  authors {
    id
    name
  }
}
```


### Mutaciones

Además de realizar consultas, GraphQL nos permite realizar mutaciones para agregar, actualizar o eliminar datos en nuestra base de datos.

```javascript
mutation {
  addBook(title: "Nombre del Libro", authorId: "1") {
    id
    title
    author {
      name
    }
  }
}
```

