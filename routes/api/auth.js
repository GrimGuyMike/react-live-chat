const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

const auth = require('../../middleware/auth');

const router = express.Router();

// ROUTE:   POST api/auth
// ACCESS:  Public
// DESC:    Log in
router.post('/', (req, res) => {

    const { email, password } = req.body;

    if(!email || !password) return res.status(400).json({ message: "Please provide all necessary information!" });

    User.findOne({ email })
    .then(user => {

        if(!user) return res.status(400).json({ success: false, message: "User does not exist!" });

        bcrypt.compare(password, user.password)
        .then(matches => {

            if(!matches)
            return res.status(400).json({ success: false, message: "Invalid credentials!" });

            user.online = true;

            user
            .save()
            .then(user => {

                jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET,
                    { expiresIn: 3600 },
                    (err, token) => {
    
                        if(err) throw err;
    
                        user.password = undefined;

                        res.json({
                            token,
                            user
                        });
    
                    }
                );

            });
            
        });

    });

});

// ROUTE:   GET api/auth/user
// ACCESS:  Private
// DESC:    Authenticate via token
router.get('/user', auth, (req, res) => {

    User.findById(req.user.id)
    .then(user => {

        user.online = true;

        user.save()
        .then(user => {

            user.password = undefined;
            res.json(user);

        });

    });

});

module.exports = router;