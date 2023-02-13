const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    deleteThought,
    updateThought,
    removeReaction,
    addReaction,
} = require ('../../controllers/thoughtController');

// ----- '/' route for thoughts ----- //

router.route('/')
    .get(getAllThoughts)
    .post(addThought);

// ----- '/:id' route for specific thoughts ----- //

router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

// ----- '/:id' route for specific reactions ----- //

router.route('/:thoughtId/reactions').post(addReaction)

router.route('/:thoughtId/reactions/reactionId').delete(removeReaction);

module.exports = router;