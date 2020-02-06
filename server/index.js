const {ApolloServer, gql} = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const mysql = require('mysql2');

const conn = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'test',
	password: 'test'
});

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: () => ({conn})
});

server.listen().then(({url}) => {
	console.log(`server ready at ${url}`)
});