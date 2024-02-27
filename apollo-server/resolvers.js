import fs from 'fs';

const movies = [];
const directors = [];


fetchData();

const resolvers = {
    Query: {

    },
    Movie: {

    },
    Mutation: {

    },
};

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

function storeData() {
    const data = {
        movies,
        directors,
    };
    fs.writeFileSync('./movies.json', JSON.stringify(data, null, 2), 'utf-8');
}


export default resolvers;
