/*
 * GET events list
 */
exports.eventslist = function (db) {
    return function (req, res) {
        var eventslist = db.get('eventslist');

        eventslist.find({}, {}, function(err, docs) {
            res.render('eventlist', {
                "eventslist": docs,
                title: "Events List",
                active: "eventslist"
            });
        });
    };
};

/*
 * GET new event form
 */
exports.newevent = function(req, res) {
    res.render('newevent', {
        title: "Add New Event",
        message: '',
        errors: {},
        active: 'newevent'
    });
};

/*
 * POST add event
 */
exports.addevent = function (db) {
    return function (req, res) {
        var eventslist = db.get('eventslist');

        eventslist.insert({
            'name': req.body.eventname,
            'date': req.body.date,
            'time': req.body.time,
            'location': req.body.location,
            'contact': req.body.contact,
            'notes': req.body.notes
        }, function (err, doc) {
            if (err) {
                res.send("There was a problem adding to the db: " + err);
            }
            else {
                res.redirect('events');
            }
        });
    };
};


/*
 * DELETE event by id
 */

exports.delevent = function (db) {
    return function (req, res) {
        var id       = req.params.id;
        var eventslist = db.get('eventslist');

        eventslist.remove({ 
            "_id": eventslist.id(id)
        }, function (err, doc) {
            if (err) {
                res.send("There was a problem deleting the user.");
            }
            else {
                res.redirect('events');
            }
        });
    };
};