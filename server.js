const { ApolloServer, AuthenticationError } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

// Import typeDefs and resolvers
const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require("./resolvers");

// Import Environment variables and Mongoose models
require('dotenv').config({path: 'variables.env'});
const Animal = require('./models/Animal');
const User = require('./models/User');
const Pet = require('./models/Pet');

// Connect to MLab Database
mongoose
  .connect(
  	process.env.MONGO_URI,
  	{useNewUrlParser: true}
  )
  .then(()=> console.log('DB connected'))
  .catch(err => console.error(err))

// Verify JWT Token passed from client
const getUser = async token => {
	if(token) {
		try {
			let user = jwt.verify(token, process.env.SECRET);
			console.log(user);
		} catch (err) {
			throw new AuthenticationError('Your session has ended. Please sign in again.')
		}
	}
}

// Create Apollo/GraphQL server using typeDefs, resolversm and context object
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const token = req.headers["authorization"];
		return { Animal, User, Pet, currentUser: await getUser(token) };
	}
});

server.listen().then(({url})=>{
	console.log(`Server listening on ${url}`);
});

