const {ApolloServer, gql} = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const mysql = require('mysql2');
const DataLoader = require('dataloader');

const conn = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'test',
	password: 'test'
});

async function batchLesson(keys, conn){
	const c = await conn.promise();
	const [row] =await c.query(`
		SELECT
			*
		FROM
			lessons
		WHERE chapter_id IN (?)`,[keys]);

	const lessonMap ={};
	keys.map(k=>{
		lessonMap[k] = row.filter(r=>r.chapter_id === k)
	})
	const t = keys.map(key => lessonMap[key])
	console.info('a')
	return t;
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: () => ({conn,lessonLoader:new DataLoader(keys => batchLesson(keys,conn))})
});

server.listen().then(({url}) => {
	console.log(`server ready at ${url}`)
});