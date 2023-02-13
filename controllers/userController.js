const { User, Thought} = require('../models');

module.exports = {
// Getting All Users
    getUsers (req, res) {
        User.find()
            .sort({_id: -1})
            .select('-__v')
            .then((allUsers) => res.json(allUsers))
            .catch((err) => res.status(500).json(err));
    },

// Getting Single User
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id})
            .select('-__v')
            .then((singleUser) =>
                !singleUser
                    ? res.status(404).json({message: 'Error: User ID not found'})
                    : res.json(singleUser)
            )
            .catch((err) => res.status(500).json(err));
    },

// Creating a User
    createUser( req, res) {
        User.create(req.body).then((createUser) => res.json(createUser))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

// Updating a Current User
    updateUser({ params, body }, res) {
        User.findOneAndUpdate (
            { _id: params.id },
            body, { new : true, runValidator: true},
        )
            .then((updateUser) =>
                !updateUser
                    ? res.status(404).json({message: 'Error: User ID not found'})
                    : res.json(updateUser)
            )
            .catch((err) => res.status(500).json(err));
    },

//Deleting a User
    deleteUser(req, res) {
        User.findOneAndDelete ({ _id: req.params.id})
            .then((deleteUser) =>
                !deleteUser
                    ? res.status(404).json({message: 'Error: User ID not found'})
                    : Thought.deleteMany ({ _id: {$in: deleteUser.thoughts}})
            )
            .then(() => res.json({message: 'Success! User and user thoughts have been deleted! '}))
            .catch((err) => res.status(500).json(err));
    },

// Adding a new friend
addfriend(req, res) {
    User.findOneAndUpdate (
        { _id: req.params.id },
        { $addToSet: { friends: req.params.friendId}},
        { runValidators: true, new: true }
    )
    .then((isFriend) =>
        !isFriend
            ? res.status(404).json({ message: 'Error: User ID not found'})
            : res.json(isFriend)
    )
    .catch((err) => res.status(500).json(err));
},

// Removing a Friend 
removeFriend({ params }, res) {
    console.log("remove friend", params.friendId);
    User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
    )
    .then((userData) => res.json(userData))
    .catch((err) => res.json(err));
},


};
