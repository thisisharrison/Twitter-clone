const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validLoginInput(data) {
    let errors = {};
    data.email = validText(data.email) ? data.email : '';
    data.password = validText(data.password) ? data.password : '';

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email required';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password required'
    }
    return {
        // render error messages 
        errors: errors,
        // boolean for quick check
        isValid: Object.keys(errors).length === 0
    }
};