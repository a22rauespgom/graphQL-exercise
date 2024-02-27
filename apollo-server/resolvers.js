import fs from 'fs';

const movies = [];
const directors = [];

const fetchData = () => {
    try {
        const jsonData = fs.readFileSync('./movies.json', 'utf-8');
        const data = JSON.parse(jsonData);

        movies.push(...data.movies);
        directors.push(...data.directors);
    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }
};


const resolvers = {
    Query: {
        movies: () => movies,
        movie: (_, { id }) => movies.find(movie => movie.id === id),
        directors: () => directors
    },
    Movie: {
        director: (parent) => {
            const director = directors.find(director => director.id === parent.directorId);
            if (!director) {
                throw new Error("El director de la película no pudo ser encontrado");
            }
            return director;
        }
    },
    Mutation: {
        addMovie: (parent, { title, year, directorId }, context) => {
            const director = directors.find(director => director.id === directorId);
            if (!director) {
                throw new Error("El director de la película no pudo ser encontrado");
            }

            const newMovie = {
                id: generateUniqueId(), // Suponiendo que tienes una función para generar IDs únicos
                title,
                year,
                directorId,
            };

            movies.push(newMovie);
            storeData(); // Suponiendo que tienes una función para almacenar los datos en algún lugar

            return newMovie;
        },
        addDirector: (_, { name }) => {
            const newDirector = {
                id: String(directors.length + 1),
                name,
            };
            directors.push(newDirector);
            return newDirector;
        },
    },
};


function storeData() {
    const data = {
        movies,
        directors,
    };
    fs.writeFileSync('./movies.json', JSON.stringify(data, null, 2), 'utf-8');
}

function generateUniqueId() {
    return String(movies.length + 1);
}

fetchData();

export default resolvers;
