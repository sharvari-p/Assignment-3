const fs = require('fs');
const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const app = express();
const path = require("path");

const PORT = 3000;

let PRODUCTS = []

const resolvers = {
	Query: {
		productList: () => PRODUCTS
	},
	Mutation: {
		addProduct: (_, { Category, Price, Name, Image }) => {
			const PRODUCT = {
				id: PRODUCTS.length+1,
				Category: Category,
				Price: Price,
				Name: Name,
				Image: Image
			}
			PRODUCTS.push(PRODUCT)
			return PRODUCT
		}
	}
};
  
const server = new ApolloServer({
	typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
	resolvers
});

server.applyMiddleware({ app });
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../static")));

app.listen(PORT, () => console.log('Listening on PORT', PORT));