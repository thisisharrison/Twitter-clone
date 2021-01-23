const validText = require('./valid-text');
const Validator = require('validator');

const validateTweetInput = data => {
    const errors = {};
    
    data.text = validText(data.text) ? data.text : '';
    if (Validator.isEmpty(data.text)) {
        errors.tweet = 'Tweet cannot be blank'
    }
    if (!Validator.isLength(data.text, { min: 5, max: 140 })) {
        errors.tweet = 'Tweet must be 5 to 140 characters long'
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

module.exports = validateTweetInput;