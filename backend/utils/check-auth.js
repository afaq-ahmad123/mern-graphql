const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

module.exports = (context) => {
    const authHeader = context.req?.headers.authorization;
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try{
                const user = jwt.verify(token, process.env.SECRET_KEY || "secret_key");
                return user;
            } catch (err) {
                throw new AuthenticationError('Invalid Token');
            }
        }
        throw new Error('Authentication token must be Bearer');
    }
    throw new Error('Authentication header must be provided');
};
