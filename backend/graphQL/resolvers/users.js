
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../Schema/User');
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators');
const { UserInputError } = require('apollo-server-express');

function generateToken (user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: new Date().toISOString()
    }, process.env.SECRET_KEY || "secret_key", { expiresIn: '1h' });
};

module.exports = {
    Query: {
        getUsers: async () => {
            try{
                const users = await User.find();
                return users;
            } catch (err) {
                throw new Error(err);
            }
        }
    },

    Mutation: {
        login: async (_, { username, password }) => {
            const { errors, valid } = validateLoginInput(username, password);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            const user = await User.findOne({ username });
            if (!user) {
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = 'Wrong Credentials!';
                throw new UserInputError('Wrong Credentials!', { errors });
            }

            const token = generateToken(user);
            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
        register: async (_, { registerInput: { username, email, password, confirmPassword } }) => {
            const { errors, valid } = validateRegisterInput(username, email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            const exists = await User.findOne({ username });

            if (exists) {
                throw new UserInputError('User already exists', {
                    errors: {
                        username: 'Username already exists',
                    }
                });
            }

            const encryptPassword = await bcrypt.hash(password, 12);

            const user = new User({
                email,
                username,
                password: encryptPassword,
                createdAt: new Date().toISOString()
            });
            
            const newUser = await user.save();
            const token = generateToken(newUser);
            return {
                ...newUser._doc,
                id: newUser._id,
                token
            }
        }
    }
};