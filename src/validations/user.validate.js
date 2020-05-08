import Joi from 'joi'

export default Joi.object().keys({
	email: Joi.string().email().required().label('Email'),
	username: Joi.string().alphanum().min(3).max(30).required().label('Username'),
	// Minimum eight characters, at least one letter and one number:
	password: Joi.string()
		.regex(/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,30}$/)
		.label('Passsword')
		.options({
			language: {
				string: {
					regex: {
						base:
							'Password must have a minimum of 8 characters, 1 letter and 1 number',
					},
				},
			},
		}),
})
