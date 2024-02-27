import fs from 'fs';

const books = [];
const authors = [];

const fetchData = () => {
    try {
        const jsonData = fs.readFileSync('./libros.json', 'utf-8');
        const data = JSON.parse(jsonData);

        books.push(...data.books);
        authors.push(...data.authors);
    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }
};


const resolvers = {
    Query: {
        books: () => books,
        book: (_, { id }) => books.find(book => book.id === id),
        authors: () => authors
    },
    Book: {
        author: (parent) => {
            const author = authors.find(author => author.id === parent.authorId);
            if (!author) {
                throw new Error("El autor del libro no pudo ser encontrado");
            }
            return author;
        }
    },
    Mutation: {
        addBook: (parent, { title, authorId }, context) => {
            const author = authors.find(author => author.id === authorId);
            if (!author) {
                throw new Error("El autor del libro no pudo ser encontrado");
            }

            const newBook = {
                id: generateUniqueId(),
                title,
                authorId,
            };

            books.push(newBook);
            storeData();

            return newBook;
        },
        addAuthor: (_, { name }) => {
            const newAuthor = {
                id: String(authors.length + 1),
                name,
            };
            authors.push(newAuthor);
            return newAuthor;
        },
    },
};

function storeData() {
    const data = {
        books,
        authors
    };
    fs.writeFileSync('./libros.json', JSON.stringify(data, null, 2), 'utf-8');

}

function generateUniqueId() {
    return String(books.length + 1);
}

fetchData();

export default resolvers;
