const express = require("express");
const router = express.Router();
// const mongoose = require('mongoose');
const passport = require('passport');

const Tweet = require('../../models/Tweet');
const validateTweetInput = require('../../validation/tweets');

// Callback for every express routes requires req and res arguments
// Json get rendered at /api/tweets/test
// router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

// Get all tweets (index)
router.get('/', (req, res) => {
    Tweet.find()
        .sort({ date: -1 })
        .then(tweets => res.json(tweets))
        .catch(err => res.status(404).json({ notweetsfound: 'Tweets not found' }))
});

// Get single tweet (show)
router.get('/:tweetId', (req, res) => {
    Tweet.findById(req.params.tweetId)
        .then(tweet => res.json(tweet))
        .catch(err => res.status(404).json({ notweetfound: 'Tweet not found'}))
});

// Get single user's tweets (/user/:userId)
router.get('/user/:userId', (req, res) => {
    Tweet.find({ user: req.params.userId })
        .sort({ date: -1 })
        .then(tweets => res.json(tweets))
        .catch(err => res.status(404).json({ notweetsfound: 'Tweets not found' }))
});

// Protected route for posting (post), passport also adds user to the request header so we can get user ID from there
router.post('/', 
    passport.authenticate('jwt', {session: false}), 
    (req, res) => {
        const { errors, isValid } = validateTweetInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        const newTweet = new Tweet ({
            user: req.user.id,
            text: req.body.text
        });
        newTweet.save().then(tweet => res.json(tweet));
    }
);



module.exports = router;