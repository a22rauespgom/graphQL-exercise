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

```javascript
const resolvers = {
  Query: {
    // Resolver para el campo 'books' en la consulta Query
    books: () => books, // Retorna todos los libros
    // Resolver para el campo 'book' en la consulta Query
    book: (_, { id }) => books.find(book => book.id === id), // Retorna un libro por su ID
    // Resolver para el campo 'authors' en la consulta Query
    authors: () => authors // Retorna todos los autores
  },
  Book: {
    // Resolver para el campo 'author' en el tipo Book
    author: (parent) => { // 'parent' representa el objeto Book que contiene el campo 'authorId'
      const author = authors.find(author => author.id === parent.authorId);
      if (!author) {
        throw new Error("El autor del libro no pudo ser encontrado");
      }
      return author;
    }
  },
  Mutation: {
    // Resolver para el campo 'addBook' en la mutación Mutation
    addBook: (parent, { title, authorId }, context) => {
      const author = authors.find(author => author.id === authorId);
      if (!author) {
        throw new Error("El autor del libro no pudo ser encontrado");
      }

      const newBook = {
        id,
        title,
        authorId,
      };

      books.push(newBook); // Agrega el nuevo libro al arreglo 'books'

      return newBook; // Retorna el nuevo libro agregado
    },
  },
};
```


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

