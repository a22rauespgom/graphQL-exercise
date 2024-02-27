# Ejercicio GraphQL + ApolloQL


## Tabla de contenidos

- [Requisitos](#requisitos)
- [Configuración del Proyecto](#configuración-del-proyecto)
  - [Backend (Node.js)](#backend-nodejs)
  - [Frontend (Vue.js)](#frontend-vuejs)
- [GraphQL + ApolloQL (Entorno servidor)](#graphql--apolloql-entorno-servidor)
  - [Definición del Schema](#definición-del-schema)
  - [Definición de los resolvers](#definición-de-los-resolvers)
  - [Consultas básicas](#consultas-básicas)
  - [Mutaciones](#mutaciones)
- [GraphQL + ApolloQL (Entorno cliente)](#graphql--apolloql-entorno-cliente)
  - [Consultas GraphQL con Apollo Client](#consultas-graphql-con-apollo-client)
  - [Mutaciones en Apollo Client](#mutaciones-en-apollo-client)

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

## GraphQL + ApolloQL (Entorno servidor)

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

## GraphQL + ApolloQL (Entorno cliente)

### Consultas GraphQL con Apollo Client

En una aplicación Vue.js con Apollo Client, es común definir consultas GraphQL para recuperar datos del servidor GraphQL. En el código, encontrarás un objeto `apollo` que contiene estas definiciones.

Definiendo gql en el componente de vue.
```javascript
import { gql } from 'graphql-tag'
```

#### Estructura del Objeto `apollo`

El objeto `apollo` tiene la siguiente estructura:

```javascript
    data() {
        return {
            books: [],
            authors: []
        }
    },
    apollo: {
        books: {
            query: gql`
                query {
                    books {
                        id
                        title
                        author {
                            id
                            name
                        }
                    }
                }
            `
        },
        authors: {
            query: gql`
                query {
                    authors {
                        id
                        name
                    }
                }
            `
        }
    }
```

### Mutaciones en Apollo Client

En una aplicación Vue.js con Apollo Client, las mutaciones GraphQL se utilizan para realizar cambios en los datos del servidor. A continuación, se muestra un ejemplo de cómo agregar un libro utilizando una mutación GraphQL.

```javascript
    const ADD_BOOK_MUTATION = gql`
        mutation AddBook($title: String!, $authorId: ID!) {
            addBook(title: $title, authorId: $authorId) {
                id
                title
                author {
                    id
                    name
                }
            }
        }
    `;
    try {
        const response = await this.$apollo.mutate({
            mutation: ADD_BOOK_MUTATION,
            variables: {
                title: this.newBook.title,
                authorId: this.newBook.author
            }
        });
        console.log('Book added:', response.data.addBook);
        // Esta línea de código se utiliza para desencadenar una nueva consulta ("refetch") de la consulta "books" utilizando Apollo Client.
        await this.$apollo.queries.books.refetch();
    } catch (error) {
        console.error('Error adding book:', error);
    }

```
#### Descripción del Proceso:

1. **Definición de la Mutación:**
   Se define la mutación utilizando `gql` de Apollo Client. En este caso, la mutación `AddBook` toma dos argumentos: `title` y `authorId`.

2. **Ejecución de la Mutación:**
   Se utiliza `this.$apollo.mutate()` para ejecutar la mutación. Se proporciona la mutación `ADD_BOOK_MUTATION` y se pasan las variables necesarias (`title` y `authorId`).

3. **Manejo de la Respuesta:**
   Después de agregar el libro con éxito, se imprime el libro agregado en la consola para confirmación.

4. **Actualización de la Interfaz de Usuario:**
   Se reinician los valores del formulario `newBook.title` y `newBook.author` para prepararlos para la próxima entrada.

5. **Actualización de la Lista de Libros:**
   Se refresca la consulta `books` para actualizar la lista de libros con el nuevo libro agregado.

6. **Manejo de Errores:**
   Se manejan los errores que puedan ocurrir durante la mutación para proporcionar una experiencia de usuario más robusta y amigable.