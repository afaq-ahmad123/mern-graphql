const { gql } = require('apollo-server');

module.exports = gql`
    type Post {
        id: ID!
        content: String
        createdAt: String
        username: String
    }

    type User {
        id: ID!
        username: String!
        password: String
        token: String!
        email: String!
        createdAt: String
    }

    input RegisterInput {
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
    }

    type Query {
        getPosts: [Post],
        getPost(postId: ID!): Post
        getUsers: [User]
    }

    type Mutation {
        register(registerInput: RegisterInput): User!,
        login(username: String!, password: String!): User!,
        createPost(body: String!): Post!,
        deletePost(id: ID!): String!
    }
`;