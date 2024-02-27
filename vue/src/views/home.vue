<template>
    <div class="container">
        <div class="left-panel">
            <h1>Listado de Películas</h1>
            <ul class="movie-list">
                <li v-for="movie in movies" :key="movie.id" class="movie-item">
                    {{ movie.title }} - <b>{{ movie.director.name }}</b> ({{ movie.year }})
                </li>
            </ul>
        </div>
        <div class="right-panel">
            <h1>Añadir Película</h1>
            <form @submit.prevent="addMovie">
                <label for="title">Título:</label>
                <input type="text" id="title" v-model="newMovie.title" required>
                <label for="year">Año:</label>
                <input type="number" id="year" v-model="newMovie.year" required>
                <label for="director">Director:</label>
                <select id="director" v-model="newMovie.director" required>
                    <option disabled value="">Seleccione director</option>
                    <option v-for="director in directors" :value="director.id" :key="director.id">
                        {{ director.name }}
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
            movies: [],
            newMovie: {
                title: '',
                year: null,
                director: ''
            },
            directors: []
        }
    },
    apollo: {
        movies: {
            query: gql`
                query {
                    movies {
                        id
                        title
                        year
                        director {
                            id
                            name
                        }
                    }
                }
            `
        },
        directors: {
            query: gql`
                query {
                    directors {
                        id
                        name
                    }
                }
            `
        }

    },
    methods: {
        async addMovie() {
            const ADD_MOVIE_MUTATION = gql`
                mutation AddMovie($title: String!, $year: Int!, $directorId: ID!) {
                    addMovie(title: $title, year: $year, directorId: $directorId) {
                        id
                        title
                        year
                        director {
                            id
                            name
                        }
                    }
                }
            `;
            try {
                const response = await this.$apollo.mutate({
                    mutation: ADD_MOVIE_MUTATION,
                    variables: {
                        title: this.newMovie.title,
                        year: this.newMovie.year,
                        directorId: this.newMovie.director
                    }
                });
                console.log('Movie added:', response.data.addMovie);
                this.newMovie.title = '';
                this.newMovie.year = null;
                this.newMovie.director = '';
                await this.$apollo.queries.movies.refetch();
            } catch (error) {
                console.error('Error adding movie:', error);
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
