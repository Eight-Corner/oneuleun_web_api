const express = require('express');
const router = express.Router();

const member = require('./member.route.js');
// const auth = require('./auth.route.js');
router.use('/api', member);
// router.use('/api', auth);





module.exports = router;
