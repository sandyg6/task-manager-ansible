const graphql = require('graphql');
const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt } = graphql;
const mongoose = require('mongoose');

// Task Model
const Task = mongoose.model('Task', {
  name: String,
  description: String,
  status: String
});

// TaskType (GraphQL Type)
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

// RootQuery (GraphQL query root)
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Task.findById(args.id);
      },
    },
    tasks: {
      type: new graphql.GraphQLList(TaskType),
      resolve() {
        return Task.find({});
      },
    },
  },
});

// Mutation (GraphQL mutation root)
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTask: {
      type: TaskType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
      },
      resolve(parent, args) {
        const task = new Task({
          name: args.name,
          description: args.description,
          status: args.status,
        });
        return task.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

