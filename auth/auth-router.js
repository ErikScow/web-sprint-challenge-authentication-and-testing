const router = require('express').Router();

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../database/dbConfig')

router.post('/register', (req, res) => {
  const credentials = req.body
  const hash = bcrypt.hashSync(credentials.password, 12)
  credentials.password = hash
  db('users').insert(req.body)
      .then(()=>{
          res.status(201).json({message: "user successfully created"})
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({message: "could not add to database"})
      })
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
