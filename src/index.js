const express = require('express');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');
const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/users');
const app = express();



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    if(req.method === 'OPTIONS'){
        return res.sendStatus(200)
    }
    next()
})

app.use(express.json());

app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
}))

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.crv5u.mongodb.net/${process.env.MONGO_DB}`,{
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true
})


if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (request, response) => {
		response.sendFile(path.join(__dirname, '../client/build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('listening on port___', port)
})