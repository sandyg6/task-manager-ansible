const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema');

const app = express();
const port = 4000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/taskmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Set up GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/graphql`);
});
