const express = require('express');
const { people } = require('../data');

const router = express.Router();

router.get('/', (req, res) => {
  return res.status(200).json({status: true, data: people});
});

router.post('/', (req, res) => {
  const { name } = req.body;
  if (name && name.length > 0) {
    return res.status(201).json({ success: true, person: name } );
  }
  return res.status(400).
    json({ success: false, msg: 'please provide name value' });
})

module.exports = router;