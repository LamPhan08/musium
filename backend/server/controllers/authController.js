const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
// leave the line below this in comment
// import bcrypt from 'bcryptjs';

// user registration
const register = async (req, res) => {
    try {
        const { username, email, password, photo } = req.body;

        if (!username || !email || !password || !photo) {
            return res.status(400).json({ error: 'Missing parameter' });
        }

        let existingUser = await User.findOne({email})

        if (existingUser) {
            return res.json('User already exists');
        }
        
        const newUser = new User({
            username: username,
            email: email,
            password: password,
            photo: photo
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
};

// user login
const login = async (req, res) => {

    const email = req.body.email;

    try {
        
        const user = await User.findOne({email});

        // if user doesn't exist
        if(!user)
        {
            return res.json('User not found')
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
            return res.json('Incorrect email or password')
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
};

module.exports = {register, login}