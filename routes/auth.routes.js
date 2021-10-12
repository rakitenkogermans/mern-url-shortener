const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password length must be at least 6 symbols.')
            .isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400)
                .json({
                    errors: errors.array(),
                    message: 'Incorrect data at registration!'
                })
        }

        const {email, password} = req.body;

        const candidate = await User.findOne({email});

        if (candidate) {
            return res.status(400).json({message: 'This email is already taken!'})
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashedPassword});

        await user.save();

        res.status(201).json({message: 'User was created!'})


    } catch {
        res.status(500).json({ message: 'Something went wrong. Please try again later.'})
    }
});

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Please write correct email!').normalizeEmail().isEmail(),
        check('password', 'Password must be filled.')
            .exists()
            .isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400)
                    .json({
                        errors: errors.array(),
                        message: 'Incorrect data at login!'
                    })
            }

            const {email, password} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                return res.status(400).json({message: 'User not found!'});
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(400).json({message: 'Password is not correct!'});
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('secretJWT'),
                { expiresIn: '1h'}
            );

            res.status(200).json({token, userId: user.id});
        } catch {
            res.status(500).json({ message: 'Something went wrong. Please try again later.'})
        }
});

module.exports = router;
