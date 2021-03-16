const { check } = require('express-validator')
const { User } = require('../db/models')
const { Provider } = require('../db/models')

exports.validateUser = [
    check('surname').isString().not().isEmpty().trim(),
    check('otherNames').isString().not().isEmpty().trim(),
    // check('email').normalizeEmail().isEmail().not().isEmpty().trim().custom(value => {
    //     return User.findOne({ where: { email: value } }).then(email => {
    //         if (email) {
    //             return Promise.reject('Email already in use');
    //         }
    //     })
    // }).withMessage('Please enter a valid email address'),
    check('phoneNumber').isLength({ min: 10 })
        .withMessage('Please enter a valid phone number')
        .not().isEmpty().trim().custom(value => {
            return User.findOne({ where: { phoneNumber: value } }).then(phoneNumber => {
                if (phoneNumber) {
                    return Promise.reject('Phone number already in use');
                }
            })
        }),
    check('fcm').isString(),
    check('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),
    check('region').isNumeric().not().isEmpty().trim()
];

exports.validateUserUpdate = [
    check('surname').isString().not().isEmpty().trim(),
    check('otherNames').isString().not().isEmpty().trim(),
    check('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters long')
];

exports.validateProviderUpdate = [
    check('ghanaPostGPS').isString().trim(),
    check('company').isString().not().isEmpty().trim().withMessage('Company cannot be empty'),
    check('driversLicense').isString().not().isEmpty().trim().withMessage('License cannot be empty'),
    check('insuranceExpiry').isDate(),
    check('insuranceNumber').isString().not().isEmpty().trim(),
    check('roadWorthy').isAlphanumeric(),
    check('roadWorthyExpiry').isDate(),
    check('tankCapacity').isNumeric().not().isEmpty().trim()
];

