const express = require('express');

// import { login, register } from '../controllers/authController.js';
// const login = require('../controllers/authController')
// const register = require('../controllers/authController')

const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', 
    async (req, res) => {
        try {

            /* hashing password (drawback: cannot see password in db => leave this snippet in comment)
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(req.body.password, salt);
                
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                    photo: req.body.photo
                });
            */
            
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            });

            await newUser.save();


            res.status(200).json({
                success: true,
                message: "Created successfully!"
            });

        } catch (err) {
            res.status(500).json({
                success: false,
                message: "Failed to create! Try again!"
            });
        }
    }
);
router.post('/login',
    async (req, res) => {

        const email = req.body.email;

        try {
            
            const user = await User.findOne({email});

            // if user doesn't exist
            if(!user)
            {
                return res.status(404)
                .json({
                    success: false,
                    message: 'User not found'
                });
            }

            /* leave this snippet in comment:
            const checkCorrectPassword = bcrypt.compare(req.body.password, user.password)
            // if the password is incorrect
            if(!checkCorrectPassword) {
                return res.status(401)
                .json({
                    success: false,
                    message: 'Incorrect email or password'
                }); 
            }
            */

            // if the password is incorrect
            if(req.body.password !== user.password)
            {
                return res.status(401)
                .json({
                    success: false,
                    message: 'Incorrect email or password'
                });
            }

            const {password, role, ...rest} = user._doc;

            // create jwt token
            const token = jwt.sign
            (
                {
                    id: user._id,
                    role: user.role
                },
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: "15d"
                }
            );

            // set token in the browser cookies and send the response to the client
            res.cookie('accessToken', token, {
                httpOnly: true,
                expires: token.expiresIn
            }).status(200).json({
                // token,
                success: true,
                token,
                message: "successfully logged in",
                data: {...rest},
                role
            });

        } catch (err) {
            res.status(500)
                .json({
                    success: false,
                    message: 'Login failed!'
                });
        }
    }
);

module.exports = router;