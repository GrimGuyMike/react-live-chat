const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

// ROUTE:   POST api/users
// ACCESS:  Public
// DESC:    Register new user
router.post('/', (req, res) => {

    const { name, email, password } = req.body;

    if(!name || !email || !password)
    return res.status(400).json({ success: false, message: "Please provide sufficient user data!" });

    bcrypt.genSalt(10, (err, salt) => {
        
        if(err) throw err;

        bcrypt.hash(password, salt, (err, hash) => {

            if(err) throw err;

            User.findOne({ email })
            .then(found => {

                if(found)
                return res.status(400).json({ success: false, message: "User already exists!" });

                const user = new User({
                    name,
                    email,
                    password: hash
                });
    
                user.save()
                .then(doc => {

                    doc.password = undefined;

                    jwt.sign(
                        { id: doc._id.toString() },
                        process.env.JWT_SECRET,
                        { expiresIn: 3600 },
                        (err, token) => {

                            if(err) throw err;

                            res.json({
                                token,
                                user: doc
                            });

                        }
                    );

                })
                .catch(err => res.status(400).json({ success: false, message: err.message }));

            });
            
        });

    });

});

// ROUTE:   GET api/users
// ACCESS:  Private
// DESC:    Get online users
router.get('/', auth, (req, res) => {

    const requestorId = req.user.id;

    User.find({ online: true, _id: { $ne: requestorId } })
    .select('-password -dialogs')
    .then(users => res.json(users));
    
});

// ROUTE:   GET api/users/:id
// ACCESS:  Private
// DESC:    Find user by ID
router.get('/:id', auth, (req, res) => {

    const id = req.params.id;
    const currentUserId = req.user.id;

    if(id === currentUserId) return res.status(400).json({
        success: false,
        message: 'User not found'
    });

    User.findById(id)
    .select('-password -dialogs')
    .then(user => res.json(user))
    .catch(err => res.status(400).json({ success: false, message: err.message }));

});

module.exports = router;