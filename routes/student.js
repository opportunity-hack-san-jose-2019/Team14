const express = require('express');
const _ = require('lodash');
const router = express.Router();
const { Student } = require('../models/student');

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
        full_name: req.body.full_name,
        first: req.body.first,
        last: req.body.last,
        password: req.body.password,
        email: req.body.email,
        cohort: req.body.cohort,
        interests: req.body.interests,
        evening: req.body.evening,
        location: req.body.location,
        phone: req.body.phone,
        attendance: req.body.attendance,
        module_score: req.body.module_score,
        project_score: req.body.project_score,
        bonus: req.body.bonus,
        total_score: req.body.total_score
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

router.post('/update', (req, res) => {
    Student.findOne({
        email: req.query.email,
    }).then((student) => {
        if (!student) {
            return res.status(404).send({
                error: "User not found"
            });
        }
        student = _.assign(student, req.body);
        student.save().then((student) => {
            res.send({student});
        }).catch((e) => {
            res.status(400).send();
            console.log(e)
        });
    }).catch((e) => {
        res.status(404).send(e);
    })
});

module.exports = router;