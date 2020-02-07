const {ApolloServer, gql} = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const mysql = require('mysql2');
const DataLoader = require('dataloader');
const {batchLesson, batchProblem, batchStaple} = require('./dataloaders');

const conn = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'test',
	password: 'test'
});



const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: () => ({
		conn,
		lessonLoader: new DataLoader(keys => batchLesson(keys, conn)),
		stapleLoader: new DataLoader(keys => batchStaple(keys, conn)),
		problemLoader: new DataLoader(keys => batchProblem(keys, conn))
	})
});

server.listen().then(({url}) => {
	console.log(`server ready at ${url}`)
});