const express = require('express');

const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');

// router.get('/', usersController.profile);   // If only /users comes

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);

// Update the profile info
router.post('/update/:id',passport.checkAuthentication,usersController.update);

// Routes for signin and sign up
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

// Route for the form action sign up
router.post('/create',usersController.create);

// use passport as a middleware to authenticate
// passport firt authenticate it before calling the users controller
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),usersController.createSession);


router.get('/sign-out', usersController.destroySession);


module.exports = router;