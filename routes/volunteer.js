const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { Volunteer } = require('../models/volunteer');

router.get('/', (req, res) => {
    console.log('volunteers');
    res.send('volunteers');
});

router.get('/all', (req, res) => {
    Volunteer.find().then((volunteers) => {
      res.send({volunteers});
    }).catch((e) =>{
      res.status(400).send();
    });
});

router.get('/profile', (req, res) => {
    Volunteer.findOne({
        email: req.query.email,
    }).then((volunteer) => {
        if (!volunteer) {
            return res.status(404).send({
                error: "User not found"
            });
        }
        res.send(volunteer);
    }).catch((e) => {
        res.status(404).send(e);
    })
});

router.post('/register', (req, res) => {
    career_list = []
    if (req.body.career_fields !== undefined ) {
        for (let i = 0; i < req.body.career_fields.length; i++) {
            obj = JSON.parse(req.body.career_fields[i])
            career_list.push(obj)
        }
    }
    let volunteer = new Volunteer({
        first: req.body.first,
        last: req.body.last,
        password: req.body.password,
        email: req.body.email,
        full_name: req.body.full_name,
        phone: req.body.phone,
        cancelled: req.body.cancelled,
        notes: req.body.notes,
        vip: req.body.vip,
        station: req.body.station,
        day: req.body.day,
        event_location: req.body.event_location,
        employer: req.body.employer,
        title_industry: req.body.title_industry,
        city_state: req.body.city_state,
        career_fields: career_list
    });
    volunteer.save().then((volunteer) => {
        res.send({volunteer});
    }).catch((e) => {
        res.status(400).send();
    });
});

router.post('/signin', (req, res) => {
    Volunteer.findOne({
        email: req.body.email,
        password: req.body.password
    }).then((volunteer) => {
        if (!volunteer) {
            return res.status(404).send({
                error: "User not found"
            });
        }

        res.send(volunteer);
    }).catch((e) => {
        res.status(404).send(e);
    })
});

router.post('/update', (req, res) => {
    Volunteer.findOne({
        email: req.query.email,
    }).then((volunteer) => {
        if (!volunteer) {
            return res.status(404).send({
                error: "User not found"
            });
        }
        if (req.body.career_fields) {
            career_list = []
            for (let i = 0; i < req.body.career_fields.length; i++) {
                obj = JSON.parse(req.body.career_fields[i])
                career_list.push(obj)
            }
            req.body.career_fields = career_list;
        }
        volunteer = _.assign(volunteer, req.body);
        volunteer.save().then((volunteer) => {
            res.send({volunteer});
        }).catch((e) => {
            res.status(404).send();
            console.log(e)
        });
    }).catch((e) => {
        res.status(404).send(e);
    })
});

router.post('/addeditskill', (req, res) => {
    Volunteer.findOne({
        email: req.body.email,
    }).then((volunteer) => {
        if (!volunteer) {
            return res.status(404).send({
                error: "User not found"
            });
        }
        var { skill_name, skill_level } = req.body;
        req.body.career_fields = _.unionBy([{skill_name, skill_level: parseInt(skill_level)}],volunteer.career_fields, "skill_name");
        volunteer = _.assign(volunteer, req.body);
        volunteer.save().then((volunteer) => {
            res.send({volunteer});
        }).catch((e) => {
            res.status(404).send();
            console.log(e)
        });
    }).catch((e) => {
        res.status(404).send(e);
    })
});

module.exports = router;