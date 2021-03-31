const express = require('express')

const { requireSignin } = require('../controllers/auth');
const { getEvents, createEvent, eventsByUser, eventById, isPoster, deleteEvent, updateEvent, photo, singleEvent, like, unlike, comment, uncomment, countEvents, createEventRn, getAllEventsRn, updateEventRn } = require('../controllers/event')
const { userById } = require('../controllers/user');
const { createEventValidator } = require('../validator/index');


const router = express.Router();



// get all events
router.get('/rn/allevents', getAllEventsRn);
// counts all events
router.get('/count/events', countEvents);

//like unlike
router.put("/event/like", requireSignin, like);
router.put("/event/unlike", requireSignin, unlike);

//comments
router.put("/event/comment", requireSignin, comment);
router.put("/event/uncomment", requireSignin, uncomment);

//create event
//router.post("/event/new/:userId", requireSignin, createEvent, createEventValidator);
router.post("/rn/event/new/:userId", requireSignin, createEventRn);

//events posted by a specific user
router.get("/event/by/:userId", eventsByUser);
//shows an event by its ID
router.get("/event/:eventId", singleEvent);

router.put("/event/:eventId", requireSignin, isPoster, updateEvent);
router.put("/rn/event/:eventId", requireSignin, isPoster, updateEventRn);

router.delete("/event/:eventId", requireSignin, isPoster, deleteEvent);

//event's photo
router.get("/event/photo/:eventId", photo);


// any route containing :userId, this is execute first
router.param("userId", userById);
// any route containing :postId, this is execute first
router.param("eventId", eventById);

module.exports = router;