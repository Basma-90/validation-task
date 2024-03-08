const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const registrationController = require('../controllers/registration');


const validateRegistrationForm = [
    body('name').trim().notEmpty().matches(/^[^\d]+$/).withMessage('Full Name can\'t contain numbers'),
    body('email').trim().isEmail().normalizeEmail().matches(/@gmail.com$/).withMessage('Email must be valid and end with @gmail.com'),
    body('password').isStrongPassword().withMessage('Password must be strong'),
    body('passwordConfirm').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
    body('birthDate').isDate().withMessage('Birth date must be a valid date'),
];


router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

router.get('/', (req, res) => {
    const errors = req.flash('errors');
    const success = req.flash('success');
    res.render('index', { errors, success });
});

router.post('/register', validateRegistrationForm, registrationController.register);

module.exports = router;
