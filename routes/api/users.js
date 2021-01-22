const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const User = require('../../models/User');

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

// Controller for register
router.post("/register", (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            // User already exists
            if (user) {
                return res.status(400).json({ email: "Email already taken"});
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
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                });
            }
        });
});

module.exports = router;