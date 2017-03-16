var express = require('express'),
    app = express(),
    engines = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


MongoClient.connect('mongodb://mongo1:27017/video', function(err, db){

	assert.equal(null, err);

	console.log('Successfully connected to Mongodb');

	app.get('/', function(req, res){
		db.collection('movies').find({}).toArray(function(err, docs){
			res.render('movies', {'movies': docs});
		});
	});

	app.get('/health', function(req, res){
		res.status(503).send('Error');
	});

	app.use(function(req, res){
	    res.sendStatus(404); 
	});

	var server = app.listen(3000, function() {
	    var port = server.address().port;
	    console.log('Express server listening on port %s', port);
	});

});


