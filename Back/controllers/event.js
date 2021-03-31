const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

const Event = require('../models/event');

exports.eventById = (req, res, next, id) => {
    Event.findById(id)
    .populate("postedBy", "_id name")
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name')
    .select('_id title place description created likes comments photo')
    .exec((err, event) => {
        if(err || !event){
            return res.status(400).json({
                error: err
            });
        }
        req.event = event;
        next();
    });
};

exports.getEvents = (req,res) => {
    const skip = req.query.skip;
    console.log(skip)
    const events = Event.find()
    .skip(parseInt(skip))
    .limit(2)
    .populate("postedBy", "_id name")
    .populate('comments','text created')
    .populate('comments.postedBy','_id name')
    .select("_id title place description created likes")
    .sort({created: -1})
    .then((events) => {
        res.json(events);
    })
    .catch(err => console.log(err));
};

exports.getAllEventsRn = (req,res) => {
    const events = Event.find()
    .populate('comments.postedBy', '_id name updated')
    .populate('postedBy', '_id name updated')
    .select('_id title place description created likes comments updated')
    .sort({created: -1})
    .then((events) => {
        res.json(events);
    })
    .catch(err => console.log(err));
    
}

exports.countEvents = (req,res) => {
    Event.count()
    .then((data) => {
        res.json({data})
    })
    .catch(err => console.log(err))
}

{/*exports.createEvent = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    console.log(form);
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        let event = new Event(fields);
        console.log(fields);
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        event.postedBy = req.profile;
        console.log(files);
        if(files.photo){
            event.photo.data = fs.readFileSync(files.photo.path);
            event.photo.contentType = files.photo.type;
        }

        event.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};*/}

exports.createEventRn = (req, res) => {
    let fields = {};
    fields.title = req.body.title;
    fields.place = req.body.place;
    fields.description = req.body.description;

    let event = new Event(fields);
    console.log(fields);
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    event.postedBy = req.profile;
    event.photo.data = Buffer.from(req.body.base64Data, 'base64');
    event.photo.contentType = req.body.imageType;

    console.log(event);

    event.save((err, result) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        res.json(result);
    });
};


exports.getEventPhotoRn = (req,res) => {
    var base64 = 'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAAAAACPAi4CAAAAB3RJTUUH1QEHDxEhOnxCRgAAAAlwSFlzAAAK8AAACvABQqw0mAAAAXBJREFUeNrtV0FywzAIxJ3+K/pZyctKXqamji0htEik9qEHc3JkWC2LRPCS6Zh9HIy/AP4FwKf75iHEr6eU6Mt1WzIOFjFL7IFkYBx3zWBVkkeXAUCXwl1tvz2qdBLfJrzK7ixNUmVdTIAB8PMtxHgAsFNNkoExRKA+HocriOQAiC+1kShhACwSRGAEwPP96zYIoE8Pmph9qEWWKcCWRAfA/mkfJ0F6dSoA8KW3CRhn3ZHcW2is9VOsAgoqHblncAsyaCgcbqpUZQnWoGTcp/AnuwCoOUjhIvCvN59UBeoPZ/AYyLm3cWVAjxhpqREVaP0974iVwH51d4AVNaSC8TRNNYDQEFdlzDW9ob10YlvGQm0mQ+elSpcCCBtDgQD7cDFojdx7NIeHJkqi96cOGNkfZOroZsHtlPYoR7TOp3Vmfa5+49uoSSRyjfvc0A1kLx4KC6sNSeDieD1AWhrJLe0y+uy7b9GjP83l+m68AJ72AwSRPN5g7uwUAAAAAElFTkSuQmCC';
    var img = Buffer.from(base64, 'base64');

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
    });
    res.end(img); 
}

exports.eventsByUser = (req, res) => {
    Event.find({postedBy: req.profile._id})
    .populate("postedBy", "_id name")
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name')
    .select('_id title place description created likes comments updated')
    .sort({created: -1})
    .exec((err, events) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        res.json(events)
    });
};

exports.isPoster = (req, res, next) => {
    let isPoster = req.event && req.auth && req.event.postedBy._id == req.auth._id
    if(!isPoster){
        return res.status(403).json({
            error: "User is not authorized !"
        });
    }
    next();
};

exports.updateEvent = (req,res,next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Photo could not be uploaded"
            })
        }
        //save post
        let event = req.event;
        event = _.extend(event, fields);
        event.updated = Date.now();
        
        if(files.photo){
            event.photo.data = fs.readFileSync(files.photo.path);
            event.photo.contentType = files.photo.type;
        }
        event.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: err
                })
            }
            res.json(event);
        });
    });
};

exports.updateEventRn = (req, res) => {
    let event = req.event;
    event = _.extend(event, req.body);

    event.updated = Date.now();

    if(req.body.base64Data && req.body.imageType){
        event.photo.data = Buffer.from(req.body.base64Data, 'base64');
        event.photo.contentType = req.body.imageType;
    }

    console.log("UPDATED EVENT ", event);

    event.save((err, result) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        res.json(result);
    });
}

exports.deleteEvent = (req, res) => {
    let event = req.event;
    event.remove((err, event) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: "Successfully deleted the event"
        });
    });
};


exports.photo = (req, res, next) => {
    res.set("Content-Type", req.event.photo.contentType);
    return res.send(req.event.photo.data);
    next();
};

exports.singleEvent = (req,res) => {
    return res.json(req.event);
}


exports.like = (req, res) => {
    // postId & userId comes from front end
    Event.findByIdAndUpdate(req.body.eventId, { $push: {likes: req.body.userId} }, {new: true})
    .exec((err, result) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        } else {
            res.json(result);
        }
    });
};

exports.unlike = (req, res) => {
    // postId & userId comes from front end
    Event.findByIdAndUpdate(req.body.eventId, { $pull: {likes: req.body.userId} }, {new: true})
    .exec((err, result) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        } else {
            res.json(result);
        }
    });
};


exports.comment = (req, res) => {
    //comment, postId and userId comes from frontend
    let comment = req.body.comment;
    comment.postedBy = req.body.userId
    Event.findByIdAndUpdate(req.body.eventId, { $push: {comments: comment} }, {new: true})
    .populate('comments.postedBy','_id name')
    .populate('postedBy', '_id name')
    .exec((err, result) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        } else {
            res.json(result);
        }
    });
};


exports.uncomment = (req, res) => {
    //comment, postId and userId comes from frontend
    let comment = req.body.comment;
    Event.findByIdAndUpdate(req.body.eventId, { $pull: {comments: {_id: comment._id}} }, {new: true})
    .populate('comments.postedBy','_id name')
    .populate('postedBy', '_id name')
    .exec((err, result) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        } else {
            res.json(result);
        }
    });
};