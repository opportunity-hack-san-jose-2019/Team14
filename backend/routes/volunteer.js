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
    let voluteer = new Voluteer({
        first: req.body.first,
        last: req.body.last,
        password: req.body.password,
        email: req.body.email
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