import Joi from '@hapi/joi'

export default Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .message('Username must have at least 3 characters')
        .max(30)
        .message('Username must have at most 30 characters')
        .required(),
    password: Joi.string()
        .min(8)
        .message('Password must have a minimum of 8 characters')
        .max(30)
        .pattern(/^((?=.*[\d])(?=.*[a-z]))/)
        .message('Password must have at least 1 letter and 1 number'),
    email: Joi.string()
        .required()
        .email()
        .message('Email is not a valid email'),
})
