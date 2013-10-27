/*
 * GET events list
 */
exports.eventslist = function (db) {
    return function (req, res) {
        var eventslist = db.get('eventslist');

        userlist.find({}, {}, function(err, docs) {
            res.send(JSON.stringify(docs));
        });
    };
};

/*
 * POST add event
 */
exports.addevent = function (db) {
    return function (req, res) {
        var eventslist = db.get('eventslist');

        eventslist.insert({
            'date': req.body.date,
            'time': req.body.time,
            'location': req.body.location,
            'contact': req.body.contact,
            'food': req.body.food,
            'notes': req.body.notes,
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