const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');


console.log("Router loaded");

router.get('/', homeController.home);

router.use('/users',require('./users'));

router.use('/posts',require('./posts'));

router.use('/comments',require('./comments'));
// Routes for api
router.use('/api',require('./api'));
// For any further routes,access from here
// router.use('/routeName',require('./routeFile.js'));


module.exports = router;