const express = require('express');
const router = express.Router();
const { Voluteer } = require('../models/Voluteer');

router.get('/', (req, res) => {
    console.log('voluteers');
    res.send('voluteers');
});

router.get('/all', (req, res) => {
    Voluteer.find().then((voluteers) => {
      res.send({voluteers});
    }).catch((e) =>{
      res.status(400).send();
    });
  });

router.post('/register', (req, res) => {
    career_list = []
    for (let i = 0; i < req.body.career_fields.length; i++) {
        obj = JSON.parse(req.body.career_fields[i])
        career_list.push(obj)
    }
    let voluteer = new Voluteer({
        first: req.body.first,
        last: req.body.last,
        password: req.body.password,
        email: req.body.email,
        cancelled: req.body.cancelled,
        notes: req.body.notes,
        vip: req.body.vip,
        station: req.body.station,
        day: req.body.station,
        event_location:req.body.event_location,
        employer: req.body.employer,
        title_industry: req.body.title_industry,
        city_state: req.body.city_state,
        career_fields: career_list
    });
    voluteer.save().then((voluteer) => {
        res.send({voluteer});
    }).catch((e) => {
        res.status(400).send();
    });
});


router.post('/signin', (req, res) => {
    Voluteer.findOne({
        email: req.body.email,
        password: req.body.password
    }).then((voluteer) => {
        if (!voluteer) {
            return res.status(404).send({
                error: "User not found"
            });
        }

        res.send(voluteer);
    }).catch((e) => {
        res.status(404).send(e);
    })
});

module.exports = router;