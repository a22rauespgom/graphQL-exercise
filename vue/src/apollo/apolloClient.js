// Importa las dependencias necesarias
import { createApolloProvider } from '@vue/apollo-option'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'

// Configura el cliente Apollo
const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    cache,
    uri: 'http://localhost:4000/graphql',
})

// Crea el proveedor de Apollo
const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})

// Exporta el proveedor de Apollo
export default apolloProvider
