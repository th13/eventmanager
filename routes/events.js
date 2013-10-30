/*
 * GET events list
 */
exports.eventslist = function (db) {
    return function (req, res) {
        var eventslist = db.get('eventslist');

        eventslist.find({}, {}, function(err, docs) {
            res.send(JSON.stringify(docs));
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