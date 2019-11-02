const express = require('express');
const router = express.Router();
const { Student } = require('../models/Student');

router.get('/', (req, res) => {
    console.log('students');
    res.send('students');
});

router.get('/all', (req, res) => {
    Student.find().then((students) => {
      res.send({students});
    }).catch((e) =>{
      res.status(400).send();
    });
  });

router.post('/register', (req, res) => {
    let student = new Student({
        first: req.body.first,
        last: req.body.last,
        password: req.body.password,
        email: req.body.email
    });
    student.save().then((student) => {
        res.send({student});
    }).catch((e) => {
        res.status(400).send();
    });
});


router.post('/signin', (req, res) => {
    Student.findOne({
        email: req.body.email,
        password: req.body.password
    }).then((student) => {
        if (!student) {
            return res.status(404).send({
                error: "User not found"
            });
        }

        res.send(student);
    }).catch((e) => {
        res.status(404).send(e);
    })
});

module.exports = router;