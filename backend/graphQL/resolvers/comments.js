const { UserInputError, AuthenticationError } = require('apollo-server-express');
const Post = require("../../Schema/Post");
const checkAuth = require("../../utils/check-auth")


module.exports = {
    Mutation: {
        createComment: async (_, { postId, content }, context) => {
            const { username } = checkAuth(context);
            if (content.trim() === "") {
                throw new UserInputError('Empty Comment', {
                    errors: {
                        body: 'Comment must have some body'
                    }
                });
            }

            const post = await Post.findById(postId);
            if (post) {
                post.comments.unshift({
                    content,
                    username,
                    createdAt: new Date().toISOString()
                });
                await post.save();
                return post;
            } else {
                throw new UserInputError('Post not found', {
                    errors: {
                        body: 'Post not found'
                    }
                });
            }
        },
        deleteComment: async (_, { postId, commentId }, context) => {
            const { username } = checkAuth(context);
            const post = await Post.findById(postId);

            if (post) {
                const commentIndex = post.comments.findIndex(comment => comment.id === commentId);

                if(post.comments[commentIndex].username === username) {
                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return post;
                } else throw new AuthenticationError('You can\'t delete this comment');
            } else throw new UserInputError('Post not found');
        },
        likePost: async (_, { postId }, context) => {
            const { username } = checkAuth(context);
            const post = await Post.findById(postId);

            if (post) {
                if (post.likes.find(like => like.username === username)) {
                    post.likes = post.likes.filter(like => like.username !== username);
                } else {
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    })
                }
                await post.save();
                return post;
            } else throw new UserInputError('Post not found');
        }
    }
}