const express = require('express');
const _ = require('lodash');
const router = express.Router();
const { Skill } = require('../models/skill');
const { Student } = require('../models/student')

router.get('/', (req, res) => {
    console.log('skills');
    res.send('skill');
});

router.get('/populateSkills', (req, res) => {
    let set = new Set()
    Student.find().then((students) => {
        for (let i = 0; i < students.length; i++) {
            student = students[i]
            console.log(student)
            for (let j = 0; j < student.interests.length; j++) {
                set.add(student.interests[j].skill_name)
            }
        }
        console.log('here');
        let array = Array.from(set)
        for (let i = 0; i < array.length; i++) {
            let skill = new Skill({
                skill_name: array[i]
            });

            skill.save().catch(e => console.log(e));
        }

        res.send("done")
        
    }).catch((e) =>{
        console.log(e)
        res.status(400).send();
    });
});

router.post('/skill', (req, res) => {
    let skill = new Skill({
        skill_name: req.body.skill_name
    });

    skill.save().then((skill) => {
        res.send({skill});
    }).catch((e) => {
        res.status(400).send();
    });
});

router.get('/all', (req, res) => {
    Skill.find().then((skill) => {
        res.send({skill});
    }).catch((e) =>{
        res.status(400).send();
    });
});


module.exports = router;