const router = require('express').Router();
const userRoute = require('./User-route');
const thoughtRoute = require('./Thought-route');

router.use('/users', userRoute);
router.use('/thoughts', thoughtRoute);

module.exports = router;
