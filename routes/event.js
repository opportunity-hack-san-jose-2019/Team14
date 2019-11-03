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
            if (new Date(Date.now()) < new Date(event.start)) {
                eventList.push(event)
            }  
        });
        eventList.sort((a, b) => {
            Date.parse(a.start) - Date.parse(b.start)
        });
        res.send(eventList);
    }).catch((e) =>{
        res.status(400).send();
    });
});

router.get('/upcoming/:email', (req, res) => {
    eventList = []
    Event.find().then((events) => {
        events.forEach((event) => {
            if (_.find(event.student, {email: req.params.email}) || _.find(event.volunteer, {email: req.params.email}) || new Date(Date.now()) >= new Date(event.start)) {
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
            return Promise.reject(new Error("Event not found"));
        }
        var user_list = user_role === "student" ? event.students : event.volunteers;
        if (_.find(user_list, {email: user_email})) {
            return Promise.reject(new Error("User already joined"));
        }
        user_list.push({
            email: user_email
        });
        event = _.assign(event, {
            [user_role === "student"? "students" : "volunteers"]:user_list
        });
        return event.save();
    }).catch((e) => {
        return Promise.reject(e);
    })

    var userModel = user_role === "student" ? Student : Volunteer;
    var userUpdatePromise = userModel.findOne({
        email: user_email,
    }).then((user) => {
        if (!user) {
            return Promise.reject(new Error("User not found"));
        }
        var { event_list } = user;
        if (event_list.includes(event_id)){
            return Promise.reject(new Error("User already joined"));
        }
        event_list.push(event_id);
        user = _.assign(user, {
            event_list
        });
        return user.save();
    }).catch((e) => {
        return Promise.reject(e);
    })

    Promise.all([eventUpdatePromise, userUpdatePromise]).then(() => {
        res.send({status:"Success"});
    }).catch(e => {
        res.status(404).send({status:"Failed", message:e.message});
        console.log(e)
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
        send_calendar(event).then(event => {
            console.log(event);
            res.send({"status":"Success"});
        }).catch(e => {
            res.send({"status":"Fail", "message":e.message});
            console.log(e);
        });
    }).catch((e) => {
        res.status(404).send(e);
    })
});

module.exports = router;