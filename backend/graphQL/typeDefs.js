const gql = require('graphql-tag');

module.exports = gql`
    type Post {
        id: ID!
        content: String
        createdAt: String
        username: String
        comments: [Comment]!
        likes: [Like]!
        likesCount: Int!
        commentsCount: Int!
    }

    type Comment {
        id: ID!
        username: String!
        content: String!
        createdAt: String!
    }

    type Like {
        id: ID!
        username: String!
        createdAt: String!
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
        getUsers: [User!]!
    }

    type Mutation {
        register(registerInput: RegisterInput): User!,
        login(username: String!, password: String!): User!,
        createPost(content: String!): Post!,
        deletePost(id: ID!): String!,
        createComment(postId: ID!, content: String!): Post!,
        deleteComment(postId: ID!, commentId: ID!): Post!,
        likePost(postId: ID!): Post!
    }

    type Subscription {
        newPost: Post!
    }
`;