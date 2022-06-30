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

exports.verifyToken = async (req, res, next) => {
	const token = req.headers.authorization.split('Bearer ')[1] || req.headers['x-access-token']

	if (!token) {
		return res.status(403).json({
			success: false,
			message: '로그인이 필요합니다.'
		})
	}
	// 토큰이 유효한지 검증
	const p = new Promise((resolve, reject) => {
		jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
			if (err) reject(err);
			resolve(decoded);
		})
	});

	p.then((decoded) => {
		req.decoded = decoded;
		next();
	})


	// jwt.verify(token, 'jwt-secret-key', async (err, decoded) => {
	// 	if (err) {
	// 		info.message = 'Token이 유효하지 않습니다.';
	// 		return res.status(401).json({
	// 			status: 401,
	// 			info,
	// 		});
	// 	}
	// 	const user = await member.findOne({ where : decoded.email });
	//
	// 	if (!user) {
	// 		info.message = '유저가 존재하지 않습니다.';
	// 		return res.status(401).json({
	// 			status: 401,
	// 			info
	// 		});
	// 	}
	//
	// 	req.email = decoded.email;
	// 	next();
	// });

	/*const p = new Promise((resolve, reject) => {
		jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
			if (err) reject(err);
			resolve(decoded);
		})
	});
*/
	/*
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
	*/
	//


}
