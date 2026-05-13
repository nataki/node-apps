const {people} = require("../data");


const getPeople = (req, res) => {
  return res.status(200).json({status: true, data: people});
}

const createPerson = (req, res) => {
  const { name } = req.body;
  if (name && name.length > 0) {
    return res.status(201).json({ success: true, person: name } );
  }
  return res.status(400).
  json({ success: false, msg: 'please provide name value' });
}

module.exports = {
  getPeople,
  createPerson
}