const express = require('express');
const { people } = require('../data');
const {createPerson, getPeople} = require("../controller/people");

const router = express.Router();

router.route('/').get(getPeople).post(createPerson);

module.exports = router;