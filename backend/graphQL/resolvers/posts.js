
const { AuthenticationError } = require('apollo-server-express');
const Post = require('../../Schema/Post');
const checkAuth = require('../../utils/check-auth');

module.exports = {
    Query: {
        getPosts: async () => {
            try{
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        },
        getPost: async (_, { postId }) => {
            try {
                const post = await Post.findById(postId);
                if (post) return post;
                else throw new Error('Post not found');
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Mutation: {
        createPost: async (_, { content }, context) => {
            const user = checkAuth(context);

            if (content.trim() === "") {
                throw new Error('Post body must not be empty');
            }

            const newPost = new Post({
                user: user.id,
                username: user.username,
                content,
                createdAt: new Date().toISOString()
            });
            const post = await newPost.save();

            context.pubSub.publish('NEW_POST', {
                newPost: post,
            });
            return post;
        },
        deletePost: async (_, { id }, context) => {
            const user = checkAuth(context);

            try{
                const post = await Post.findById(id);
                if (user.username === post.username) {
                    await post.delete();
                    return 'Post deleted successfully';
                } else {
                    throw new AuthenticationError('Invalid Action');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Subscription: {
        newPost: {
            subscribe: (_, __, { pubSub }) => pubSub.asyncIterator('NEW_POST')
        }
    }
};