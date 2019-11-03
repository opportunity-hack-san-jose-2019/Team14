const express = require('express');
const router = express.Router();
const { Event } = require('../models/event');
const { Student } = require('../models/student');
const { Volunteer } = require('../models/volunteer');
const { Notification } = require('../models/notification');
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

router.get('/attending', (req, res) => {
    let userRole = req.query.role
    
    if (userRole === 'students') {
        Student.findOne({
            email: req.query.email,
        }).then((student) => {
            eventIds = []
            for (let i = 0; i < student.event_list.length; i++) {
                eventIds.push(student.event_list[i]);
            }
            Event.find({
                '_id': { $in: eventIds}
            }).then(events => {
                res.send(events);
            });
        }).catch((e) => {
            res.status(404).send(e);
        })
    } else {
        Volunteer.findOne({
            email: req.query.email,
        }).then((volunteer) => {
            eventIds = []
            for (let i = 0; i < volunteer.event_list.length; i++) {
                eventIds.push(volunteer.event_list[i]);
            }
            Event.find({
                '_id': { $in: eventIds}
            }).then(events => {
                res.send(events);
            });
        }).catch((e) => {
            res.status(404).send(e);
        })
    }
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
            error: "1.Unable to join"
        });
    }

    Event.findOne({
        _id: event_id,
    }).then((event) => {
        if (!event) {
            return res.status(404).send({
                error: "2.Unable to join"
            });
        }
        var user_list = user_role === "students" ? event.students : event.volunteers;
        if (_.find(user_list, {email: user_email})) {
            return res.status(404).send({
                error: "3.Unable to join"
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
            
            var doneSaveDB = event.save().then(event => {
                var userModel = user_role === "students" ? Student : Volunteer;
                return userModel.findOne({
                    email: user_email,
                }).then((user) => {
                    if (!user) {
                        return Promise.reject(new Error("4. Unable to join"));
                    }
                    var { event_list } = user;
                    if (event_list.includes(event_id)){
                        return Promise.reject(new Error("5. Unable to join"));
                    }
                    event_list.push(event_id);
                    user = _.assign(user, {
                        event_list
                    });
                    return user.save();
                }).catch((e) => {
                    return Promise.reject(e);
                })
            });

            doneSaveDB.then(() => {
                var eventGoogle = {
                    'summary': event.title,
                    'location': event.location,
                    'description': event.description,
                    'start': {
                      'dateTime': event.start,
                      'timeZone': 'America/Los_Angeles',
                    },
                    'end': {
                      'dateTime': event.end,
                      'timeZone': 'America/Los_Angeles',
                    },
                    'attendees': [{'email':user_email}],
                    'reminders': {
                      'useDefault': false,
                      'overrides': [
                        {'method': 'email', 'minutes': 24 * 60},
                        {'method': 'popup', 'minutes': 10},
                      ],
                    },
                };
        
                return send_calendar(eventGoogle, (err, eventRes) => {
                    if (err){
                        return Promise.reject(err)
                    }
                    else{
                        return Promise.resolve(eventRes);
                    }
                });
            }).then(eventRes => {
                res.send({"status":"Success", "eventObject":eventRes});
            }).catch(e => {
                res.status(404).send({"status":"Fail", "message":'2 '+e.message});
            })
        }
    }).catch((e) => {
        res.status(404).send(e);
    })
});

router.post('/sendinvitations', (req, res) => {
    var { event_id, emails } = req.body;

    Event.findOne({
        _id: event_id,
    }).then((event) => {
        if (!event) {
            return res.status(404).send({
                error: "Event not found"
            });
        }
        var { title, description } = event;

        var allEmailPromise = Promise.all(emails.map(async email => {
            let notification = new Notification({
                title: "You have been invited to participate in "+title,
                description,
                time: Date.now(),
                type: "Event Invitation",
                event_id,
                user_email: email,
                seen: false,
                checked: false
            });
            return notification.save()
            .then(async noti => {
                return Student.findOne({
                    email,
                }).then(async (student) => {
                    student.notifications.push(noti._id);
                    return student.save();
                }).catch(async (e) => {
                    return Volunteer.findOne({email}).then(async volunteer => {
                        volunteer.notifications.push(noti._id);
                        return volunteer.save();
                    }).catch(async err => {
                        return Promise.reject(err);
                    })
                })
            }).catch(async err => {
                return Promise.reject(err);
            });
        }));

        allEmailPromise.then(() => {
            res.send({"status":"Success"});
        }).catch(err => {
            return res.status(404).send(e);
        })
    }).catch((e) => {
        return res.status(404).send(e);
    })
});

router.post('/acceptinvitation', (req, res) => {
    var { event_id, user_email, user_role } = req.body;
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