
const Post = require('../../Schema/Post');

module.exports = {
    Query: {
        getPosts: async () => {
            try{
                const posts = await Post.find();
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
    }
};