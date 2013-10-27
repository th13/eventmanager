/*
 * GET users listing.
 */

exports.list = function(db) {
    return function (req, res) {

        var userlist = db.get('userlist');

        userlist.find({}, {}, function (e, users) {
            res.render('userlist', {
                "userlist": users,
                active: 'userlist' 
            });

        });
    
    };

};


/*
 * GET new user form
 */
exports.newuser = function (req, res) {
    res.render('newuser', { 
        title: 'Add New User',
        message: '',  // Empty message/errors when page first loads
        errors: {},
        active: 'newuser'
    });
};


/*
 * POST add user 
 */

exports.adduser = function (db) {
    return function (req, res) {
        // Validate input
        req.assert('username', 'A user name is required.').notEmpty();
        req.assert('username', 'User name must be shorter than %2 characters.').len(1, 40);
        req.assert('email', 'Plese enter a valid email.').isEmail();

        var valErrors = req.validationErrors();

        if (!valErrors) {
            // Get form values
            var username = req.body.username;
            var email = req.body.email;

            // Get userlist db
            var userlist = db.get('userlist');

            // Add to the database
            userlist.insert({
                "username": username,
                "email": email
            }, function (err, doc) {
                if (err) {
                    // If it fails, send an error
                    res.send("There was a problem adding the information to the database");
                }
                else {
                    res.redirect('users');
                }
            });
        }
        else {

            // Rerender the add user page with error messages
            res.location('/users/new');

            res.render('newuser', {
                title: 'Add New User',
                username: req.body.username,
                email: req.body.email,
                message: '',
                errors: valErrors
            });
        }
    };
};


/*
 * DELETE user by id
 */

exports.deluser = function (db) {
    return function (req, res) {
        var id       = req.params.id;
        var userlist = db.get('userlist');

        userlist.remove({ 
            "_id": userlist.id(id)
        }, function (err, doc) {
            if (err) {
                res.send("There was a problem deleting the user.");
            }
            else {
                res.redirect('users');
            }
        });
    };
};