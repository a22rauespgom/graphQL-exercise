<template>
    <div class="container">
        <div class="left-panel">
            <h1>Listado de Libros</h1>
            <ul class="book-list">
                <li v-for="book in books" :key="book.id" class="book-item">
                    {{ book.title }} - <b>{{ book.author.name }}</b>
                </li>
            </ul>
        </div>
        <div class="right-panel">
            <h1>Añadir Libro</h1>
            <form @submit.prevent="addBook">
                <label for="title">Título:</label>
                <input type="text" id="title" v-model="newBook.title" required>
                <label for="author">Autor:</label>
                <select id="author" v-model="newBook.author" required>
                    <option disabled value="">Seleccione autor</option>
                    <option v-for="author in authors" :value="author.id" :key="author.id">
                        {{ author.name }}
                    </option>
                </select>
                <button>Añadir</button>
            </form>
        </div>
    </div>
</template>

<script>
import { gql } from 'graphql-tag'

export default {
    data() {
        return {
            books: [],
            newBook: {
                title: '',
                author: ''
            },
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

    },
    methods: {
        async addBook() {
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
                this.newBook.title = '';
                this.newBook.author = '';
                await this.$apollo.queries.books.refetch();
            } catch (error) {
                console.error('Error adding book:', error);
            }
        },
    }
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
    height: 100vh;
}

.left-panel,
.right-panel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2rem;
    width: 50%;
}

h1 {
    margin-bottom: 1rem;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin-bottom: 0.5rem;
}

input,
select {
    margin-bottom: 1rem;
    padding: 0.5rem;
}

button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
