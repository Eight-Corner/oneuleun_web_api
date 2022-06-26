const jwt = require('jsonwebtoken');

/*
exports.verifyToken = (req, res, next) => {
	try {
		const token = req.headers.authorization.split('Bearer ')[1];
		let jwt_secret = 'jwt-secret-key';

		req.decoded = jwt.verify(token, jwt_secret);
		return next();
	} catch (e) {
		if (e.name === 'TokenExpiredError') {
			return res.status(419).json({
				success: false,
				message: 'Token 만료'
			});
		}
		return res.status(401).json({
			success: false,
			message: 'Token이 유효하지 않습니다'
		});
	}
}

*/

exports.verifyToken = (req, res, next) => {
	const token = req.headers['x-access-token'] || req.query.token

	if (!token) {
		return res.status(403).json({
			success: false,
			message: '로그인이 필요합니다'
		})
	}

	// 로그인 성공시 토큰을 발급하는 부분
	const p = new Promise((resolve, reject) => {
		jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
			if (err) reject(err);
			resolve(decoded);
		})
	});

	const onError = (err) => {
		res.status(403).json({
			success: false,
			message: err.message
		});
	}

	p.then((decoded) => {
		req.decoded = decoded;
		next();
	})

}
