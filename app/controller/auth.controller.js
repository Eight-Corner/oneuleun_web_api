let express = require('express');
let connection = require('../models/db.js');

const passport = require('passport');
const jwt = require('jsonwebtoken');

connection.connect(error=>{
	if (error) throw error;
	console.log("Successfully connected to the database. ");
});

const login = async (req, res, next) => {
	console.log("들어옴!!!")
	let info = {type: false, message: ''};
	try {
		console.log("들어옴!!!1")
		passport.authenticate('local', { session: false }, (err, user) => {
			if (err || !user) {
				info.type = false
				info.message = 'Login Failed!'
				return res.status(400).json({
					info: info,
					error: err
				});
			}
			req.login(user, { session: false }, (err) => {
				if (err) {
					info.message = 'ERROR'
					return res.status(500).json({
						info: info,
						err: err
					});
				}
				const token = jwt.sign({email: user.email}, 'jwt-secret-key', {expiresIn: '7d'});
				return res.json({
					success: true,
					message: '로그인 성공',
					token: token
				});

			})(req, res);
		});
	} catch (e) {
		console.error(e);
		return next(e);
	}
};

const check = (req, res) => {
	res.json(req.decoded);
};

module.exports = {
	login, check
}

