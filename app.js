
/**
 * Module dependencies.
 */

var express   = require('express');
var routes    = require('./routes');
var user      = require('./routes/user');
var events    = require('./routes/events');
var http      = require('http');
var path      = require('path');
var mongo     = require('mongodb');
var monk      = require('monk');
var db        = monk('localhost:27017/eventdata');
var objID     = mongo.ObjectID;
var validator = require('express-validator');

var app = express();

// All environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(validator());  // Use Express-Validator
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// Dvelopment only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.locals.pretty = true;
}

app.locals.hasParam = function(json, param) {
    for (var i = 0; i < json.length; i++) {
        // If any of the JSON objects in the array have the right param...
        if (json[i].param === param) {
            return true;
        }
    }

    // ...otherwise return false
    return false;
};

app.locals.getErrorMessage = function(errors, param) {
    for (var i = 0; i < errors.length; i++) {
        if (errors[i].param === param) {
            return errors[i].msg;
        }
    }

    return "Could not find error message.";
};

app.get('/', routes.index);
app.get('/users', user.list(db));
app.get('/users/new', user.newuser);
app.get('/events', events.eventslist(db));
app.get('/events/new', events.newevent);

app.post('/users/new', user.adduser(db));
app.post('/events/new', events.addevent(db));

app.delete('/users/delete/:id', user.deluser(db));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
