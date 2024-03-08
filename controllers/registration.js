const { validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return handleValidationErrors(req, res, errors);
        }
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        const { name, email, birthDate } = req.body;

        if (await userExists(email, name)) {
            return handleUserExistsError(req, res);
        }

        const newUser = await createUser(name, email, hashedPassword, birthDate);
        req.flash('success', 'Registration successful');
        res.redirect('/');
    } catch (error) {
        console.error('Error during registration:', error);
        req.flash('errors', [{ msg: 'Server error' }]);
        res.redirect('/');
    }
};

async function userExists(email, name) {
    const userExists = await User.findOne({ $or: [{ email }, { name }] });
    return !!userExists;
}

async function createUser(name, email, password, birthDate) {
    const newUser = new User({ name, email, password, birthDate });
    await newUser.save();
    return newUser;
}

function handleValidationErrors(req, res, errors) {
    req.flash('errors', errors.array());
    res.redirect('/');
}

function handleUserExistsError(req, res) {
    req.flash('errors', [{ msg: 'User already exists' }]);
    res.redirect('/');
}
