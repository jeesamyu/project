const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

const jwthelper = require('../config/jwthelper');

router.post('/register',ctrlUser.register);
router.post('/authenticate',ctrlUser.authenticate);
router.get('/userProfile',jwthelper.verifyJwtToken,ctrlUser.userProfile)

module.exports = router;