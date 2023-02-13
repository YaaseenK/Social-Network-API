const router = require('express').Router();

const {
    getUsers, getSingleUser, 
    createUser, deleteUser, 
    updateUser, removeFriend, 
    addfriend,
} = require ('../../controllers/userController');

// ----- '/' route for courses ----- //

router.route('/')
    .get(getUsers)
    .post(createUser);

// ----- '/:id' route for specific courses ----- //

router.route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

// ----- '/:id' route for specific friends ----- //

router.route('/:id/friends/:friendId')
    .post(addfriend)
    .delete(removeFriend);

module.exports = router;