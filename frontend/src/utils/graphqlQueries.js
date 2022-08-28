import { gql } from "@apollo/client";

export const GET_POSTS = gql`
{
    getPosts {
        id content username createdAt
        comments {
            content
            id
        }
        likes {
            username
            id
        }
        likesCount
        commentsCount
    }
}
`;

export const GET_POST = gql`
    query GetPost ($postId: ID!) {
        getPost(postId: $postId) {
            id content username createdAt
            comments {
                content
                username
                id
            }
            likes {
                username
                id
            }
            likesCount
            commentsCount
        }
    }
`;

export const CREATE_POST = gql`
    mutation createPost ($content: String!) {
        createPost(content: $content) {
            id content createdAt username likesCount
            commentsCount
            comments {
                id username content createdAt
            }
            likes {
                id username createdAt
            }
        }
    }
`;

export const CREATE_COMMENT = gql`
    mutation CreateComment($postId: ID!, $content: String!) {
        createComment(postId: $postId, content: $content) {
            id
            commentsCount
            comments {
                id username createdAt content
            }
        }
    }
`;

export const DELETE_POST = gql`
    mutation deletePost ($postId: ID!) {
        deletePost(id: $postId)
    }
`;

export const DELETE_COMMENT = gql`
    mutation DeleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id 
            commentsCount
            comments {
                id username createdAt content
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation Login($username: String!, $password: String!) {
        login( username: $username password: $password ) {
            id email username createdAt token
        }
    }
`;

export const REGISTER_USER = gql`
    mutation Register ($username: String! $email: String! $password: String! $confirmPassword: String!) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id email username createdAt token
        }
    }
`;

export const LIKE_POST = gql`
    mutation Login($postId: ID!) {
        likePost(postId: $postId) {
            id
            likesCount
            likes {
                username
                id
            }
        }
    }
`;
