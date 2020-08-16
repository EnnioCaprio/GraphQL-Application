const User = require('../../models/User');
const { Error } = require('mongoose');

module.exports = {
    users: async () => {
        try{
            const users = await User.find();
            return users.map(user => {
                return{
                    ...user._doc,
                    _id: user.id
                }
            })
        }catch(err){
            throw err
        }
    },
    createUser: async (args) => {
        try{
            const user = new User({
                username: args.inputUser.username,
                email: args.inputUser.email,  
                password: args.inputUser.password
            })
            const userResult = await user.save()
            return{
                ...userResult._doc,
                _id: userResult.id
            }
        }catch(err){
            throw err
        }
    },
    getSingleUser: async (args) => {
        try{
            const user = await User.findById({_id: args._id})
            return{
                ...user._doc,
                _id: user.id,
                password: null
            }
        }catch(err){
            throw err
        }
    },
    updateUser: async (args) => {
        try{
            const updateUser = await User.findByIdAndUpdate({_id:args.updateUser._id}, args.updateUser, {new: true, runValidators: true});
            return{
                ...updateUser._doc,
                _id: updateUser.id
            }
        }catch(err){
            throw err
        }
    },
    deleteUser: async (args) => {
        try{
            const user = await User.findByIdAndDelete({_id: args._id});
            return{
                ...user._doc,
                _id: user.id,
                password: null
            }
        }catch(err){
            throw err
        }       
    }
}