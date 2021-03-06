//Import the User model
const { User } = require('../models');
//Import apollo-server-express's AuthenticationError to notify user of problems when logging on
const { AuthenticationError } = require('apollo-server-express');
//Import the signToken function
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            //console.log(context);
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
                return userData;
            }

            throw new AuthenticationError('User needs to be logged in.');
        },
        //Used for testing purposes
        // users: async () => {
        //     return User.find()
        //         .select('-__v -password');
        // },
        //Used for testing purposes
        // user: async (parent, { username }) => {
        //     return User.findOne({ username })
        //         .select('-__v -password');
        // }
    },
    Mutation: {
        addUser: async (parent, {username, email, password}) => {
            //args passed are the username, email, and password
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            
            //returned object matches structure of Auth object declared in typeDefs
            return { token, user };
        },
        loginUser: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw new AuthenticationError('Incorrect credentials were entered.');
            }

            //Use the User model's isCorrectPassword method to determine whether the entered password matches the one created at signup
            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials were entered.');
            }

            //Only if both authentication steps are satisfied do you sign the token and return the Auth object
            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, args, context) => {
            if(context.user) {
                // console.log('trying to add');
                // console.log(args);
                const user = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: {...args} } },
                    { new: true, runValidators: true }
                );

                return user;
            }
            
            throw new AuthenticationError('You need to be logged in to save a book.');
        },
        removeBook: async (parent, args, context) => {
            // console.log(args.bookId);
            if(context.user) {
                // console.log('trying to remove');
                const user = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: args.bookId } }},
                    { new: true }
                );

                return user;
            }

            throw new AuthenticationError('You need to be logged in to remove a book.');
        }
    }
};

module.exports = resolvers;