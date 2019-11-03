const express = require('express');
const router = express.Router();
const { Event } = require('../models/event');
const { Student } = require('../models/student');
const { Volunteer } = require('../models/volunteer');
const { send_calendar } = require('../google/send_calendar');
const _ = require('lodash');

router.get('/', (req, res) => {
    console.log('events');
    res.send('events');
});

router.get('/all', (req, res) => {
    Event.find().then((events) => {
      res.send({events});
    }).catch((e) =>{
      res.status(400).send();
    });
});

router.get('/upcoming', (req, res) => {
    eventList = []
    Event.find().then((events) => {
        events.forEach((event) => {
            console.log(event)
            if (_.find(event.students, {email: req.query.email}) || _.find(event.volunteers, {email: req.query.email}) || new Date(Date.now()) >= new Date(event.start)) {
                return
            }
            eventList.push(event)
        });
        eventList.sort((a, b) => {
            Date.parse(a.start) - Date.parse(b.start)
        });
    res.send(eventList);
    }).catch((e) =>{
        res.status(400).send();
    });
});

router.get('/info', (req, res) => {
    Event.findOne({
        _id: req.query.id,
    }).then((event) => {
        if (!event) {
            return res.status(404).send({
                error: "Event not found"
            });
        }
        res.send(event);
    }).catch((e) => {
        res.status(404).send(e);
    })
});

router.post('/create', (req, res) => {
    let event = new Event({
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
        location: req.body.location,
    });
    event.save().then((event) => {
        res.send(event);
    }).catch((e) => {
        res.status(404).send(e);
    });
});

router.post('/update', (req, res) => {
    Event.findOne({
        _id: req.query.id,
    }).then((event) => {
        if (!event) {
            return res.status(404).send({
                error: "Event not found"
            });
        }
        event = _.assign(event, req.body);
        event.save().then((event) => {
            res.send({event});
        }).catch((e) => {
            res.status(400).send(e);
            console.log(e)
        });
    }).catch((e) => {
        res.status(404).send(e);
    })
});

router.post('/join', (req, res) => {
    var { event_id, user_role, user_email } = req.body;
    
    if (event_id === undefined || user_role === undefined || user_email === undefined){
        return res.status(404).send({
            error: "Unable to join"
        });
    }
    var eventUpdatePromise = Event.findOne({
        _id: event_id,
    }).then((event) => {
        if (!event) {
            res.status(404).send({
                error: "Unable to join"
            });
        }
        var user_list = user_role === "students" ? event.students : event.volunteers;
        if (_.find(user_list, {email: user_email})) {
            res.status(400).send({
                error: "Unable to join"
            });
        } else {
            user_list.push({
                email: user_email
            });
    
            if (user_role === "students") {
                event = _.assign(event, {"students": user_list})
            } else {
                event = _.assign(event, {"volunteers": user_list})
            }
            
            event.save().then(event => {
                var userModel = user_role === "students" ? Student : Volunteer;
                var userUpdatePromise = userModel.findOne({
                    email: user_email,
                }).then((user) => {
                    if (!user) {
                        res.status(404).send({
                            error: "Unable to join"
                        });
                    }
                    var { event_list } = user;
                    if (event_list.includes(event_id)){
                        res.status(404).send(e);
                    }
                    event_list.push(event_id);
                    user = _.assign(user, {
                        event_list
                    });
                    user.save().then(user => res.send({user}));
                }).catch((e) => {
                    return res.status(404).send(e)
                })
            });
        }
    }).catch((e) => {
        res.status(404).send(e);
    })
});

router.post('/sendinvitations', (req, res) => {
    var { event_id, emails } = req.body;
    Event.findOne({
        _id: event_id,
    }).then((eventFromDB) => {
        if (!eventFromDB) {
            return res.status(404).send({
                error: "Event not found"
            });
        }

        var event = {
            'summary': eventFromDB.title,
            'location': eventFromDB.location,
            'description': eventFromDB.description,
            'start': {
              'dateTime': eventFromDB.start,
              'timeZone': 'America/Los_Angeles',
            },
            'end': {
              'dateTime': eventFromDB.end,
              'timeZone': 'America/Los_Angeles',
            },
            'attendees': emails.map(item => ({'email':item})),
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10},
              ],
            },
        };
        
        send_calendar(event, (err, eventRes) => {
            if (err){
                res.send({"status":"Fail", "message":e.message});
                console.log(e);
            }
            else{
                res.send({"status":"Success", "event": eventRes});
            }
        });
    }).catch((e) => {
        res.status(404).send(e);
    })
});

module.exports = router;