const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const keys = require('../../config/keys');
const passport = require('passport');
const User = require('../../models/User');
const validLoginInput = require('../../validation/login');
const validRegisterInput = require('../../validation/register');

// router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

// Controller for register
router.post("/register", (req, res) => {
    // Validation
    const { errors, isValid } = validRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
        .then(user => {
            // User already exists
            if (user) {
                errors.email = 'Email already taken';
                return res.status(400).json(errors);
            } else {
                const newUser = new User ({
                    handle: req.body.handle,
                    email: req.body.email,
                    password: req.body.password
                });
                // Encrypt the password: Generate salt
                bcrypt.genSalt(10, (err, salt) => {
                    // User salt to hash and set password equal hash
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                // Add token
                                const payload = { id: user.id, handle: user.handle };
                                jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                                    res.json({
                                        success: true,
                                        token: 'Bearer ' + token
                                    });
                                });
                            })
                            .catch(err => console.log(err));
                    })
                });
            }
        });
});

// Controller for login
router.post("/login", (req, res) => {
    // Validation 
    const { errors, isValid } = validLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const { email, password } = req.body;
    User.findOne({ email: email})
        .then(user => {
            if (!user) {
                return res.status(404).json({ email: "User does not exist" });
            } 
            // Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // Add webtoken
                        const payload = { id: user.id, handle: user.handle };
                        // Add webtoken so user stays signed in across multiple requests to backend
                        jwt.sign(
                            payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            });
                    } else {
                        errors.password = 'Incorrect password';
                        return res.status(400).json(errors);
                    }
                })
        });
});

// Protected Route
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    // passport returns user object in request header as defined in config
    res.json({
        id: req.user.id,
        handle: req.user.handle,
        email: req.user.email
    });
});


module.exports = router;