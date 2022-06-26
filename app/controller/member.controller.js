const db = require("../models");
const Member = db.Member;
// express-crypto
const crypto = require('crypto');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/**********************************
 * Developer : Corner
 * Description : 유저 관련 컨트롤러
 **********************************/
// 유저 전체 조회
exports.findAll = async (req, res) => {
	await Member.findAll({
		limit: 10,
	}).then((result) => {
		let response = [];
		result.forEach(value => {
			response.push({
				m_no: value.m_no,
				nickname: value.nickname,
				email: value.email,
				age: value.age,
				createdAt: value.createdAt,
			});
		});
		res.status(200).json({status: 200, result: response, message: "success"});
	}).catch((err) => {
		res.status(500).json({status: 500, message: err.message});
	});
};


/**********************
 * Developer : Corner
 * Description : 유저 단일 조회
 **********************/
exports.findOne = async (req, res) => {
	await Member.findOne({
		m_no: req.params.m_no,
	}).then((result) => {
		const response = {
			m_no: result.m_no,
			nickname: result.nickname,
			email: result.email,
			age: result.age,
			profile_img_url: result.profile_img_url,
			createdAt: result.createdAt,
		};
		res.status(200).json({status: 200, result: response, message: "success"});
	}).catch((err) => {
		res.status(500).json({status: 500, message: err.message});
	});
};

/**********************
 * Developer : Corner
 * Description : 계정 중복체크, nickname
 **********************/
exports.dupCheckId = async (req, res) => {
	const nickname = req.body.nickname;

	await Member.findOne({
		nickname
	}).then((result) => {
		if (result) {
			res.status(200).json({status: 200, result: false, message: "중복::존재하는 계정"});
		} else {
			res.status(200).json({status: 200, result: true, message: "사용가능"});
		}
	}).catch((err) => {
		res.status(500).json({status: 500, message: err.message});
	});
}

/**********************
 * Developer : Corner
 * Description : 계정 중복체크, email
 **********************/
exports.dupCheckEmail = async (req, res) => {
	let info = {type: false, message: ''};
	if (req.body.hasOwnProperty('email') && req.body.email === '') {
		info.message = "이메일을 입력해주세요.";
		return res.status(200).json({
			status: 400,
			info
		});
	}
	const email = req.body.email;
	return await Member.findOne({
		where: {
			email: email
		}
	}).then((result) => {
		info = {type: false, message: ''}
		if (result) {
			info.type = false
			info.message = "존재하는 계정"
			return res.status(200).json({status: 200, info});
		} else {
			info.type = true
			info.message = "사용가능"
			return res.status(200).json({status: 200, info});
		}
	}).catch((err) => {
		return res.status(500).json({status: 500, message: err.message});
	});
}

/***********************************
 * Developer: corner
 * Description: Salt 암호화,
 *              salt 값을 구할 때와 해시 값을 구할 때, 작업이 끝날때까지 기다려 주어야 하므로 [동기 방식]으로 사용합니다.
 ************************************/
crypto.randomBytes(64, (err, salt) => {
	crypto.pbkdf2('password', salt.toString('base64'), 100000, 64, 'sha512', (err, key) => {
		// console.log(key.toString('base64'));
	});
});
/*********************************
 * Developer: corner
 * Description: 계정 생성
 *********************************/
exports.create = async (req, res) => {
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.status(400).json({
			message: "Error: Body(JSON)값이 비어있습니다."
		});
	}
	// :: UID, Password Crypto
	let password = req.body.password;
	let uid = req.body.email;

	crypto.createHash('sha512').update(password).digest('base64');
	password = crypto.createHash('sha512').update(password).digest('hex');

	crypto.createHash('sha512').update(uid).digest('base64');
	uid = crypto.createHash('sha512').update(uid).digest('hex');

	const {nickname, email, age} = req.body;

	await Member.create({uid, nickname, email, password, age}).then((result) => {
		let info = {
			'type': true,
			message: "success",
		}
		result = {
			"m_no": result.m_no, // 회원 번호
			"nickname": result.nickname, // 회원 닉네임
			"email": result.email, // 회원 이메일,
			"age": result.age, // 회원 생년월일
			"createdAt": result.createdAt, // 회원 생성일
		}
		let data = {status: 200, data: {result}, info}
		return res.status(200).json(data);
	}).catch((err) => {
		return res.status(500).json({status: 500, message: err.message});
	});
};


/*****************************8
 * Developer: corner
 * Description: 계정 삭제
 *             회원의 계정을 삭제합니다.
 *             params : m_no
 *****************************/

exports.delete = async (req, res) => {
	let info = {type: false, message: ''}
	let data = {result: null}
	info.message = "Error: m_no값이 없습니다.";
	if (req.query.hasOwnProperty('m_no') && req.query.m_no === '') {
		return res.status(200).json({
			status: 400,
			data,
			info,
		});
	}
	const m_no = req.query.m_no;

	await Member.destroy({
		where: {
			m_no: m_no,
		}
	}).then((result) => {
		info = {type: false, message: ''}
		data = {result}
		if (result === 0) {
			info.message = "해당 회원이 없습니다.";
			res.status(402).json({
				status: 402,
				data,
				info,
			})
		}
		info.type = true;
		info.message = "success";
		res.status(200).json({status: 200, data, info});
	}).catch((err) => {
		res.status(500).json({status: 500, message: err.message});
	});
}

