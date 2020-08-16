const { buildSchema } = require('graphql');


module.exports = buildSchema(`

    type User{
        _id: ID!
        username: String!
        email: String!
        password: String
    }

    input InputUser{
        username: String!
        email: String!
        password: String!
    }

    input UpdateUser{
        _id: ID!
        username: String!
        email: String!
        password: String!
    }
    
    type RootQuery{
        users: [User!]!
        getSingleUser(_id: ID!): User
    }

    type RootMutation{
        createUser(inputUser: InputUser): User!
        updateUser(updateUser: UpdateUser): User
        deleteUser(_id: ID!): User
    }

    schema{
        query: RootQuery
        mutation: RootMutation
    }

`)