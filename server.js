var express = require('express');
var app = express();
var path = require('path');
var braintree = require("braintree");
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: false }));


require('./database.js');
var Product = require('./models/product.js');


var gateway = braintree.connect({
	environment: braintree.Environment.Sandbox,
	merchantId: "2v2rrjdgs9km2y76",
	publicKey: "rhg93wmngwyqwvf5",
	privateKey: "c0360b2a78244d038d5110f6cc70185e"
});



app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/payment.html'));
});

app.get('/test', function (req, res) {
	res.send('test');
});

app.get("/client_token", function (req, res) {
	gateway.clientToken.generate({}, function (err, response) {
		res.send(response.clientToken);
	});
});

app.post("/checkout", function (req, res) {
	var nonce = req.body.nonce;
	gateway.transaction.sale({
		amount: '20.00',
		paymentMethodNonce: nonce,
	}, function (err, result) {
		console.log(result);
		res.send(result);
	});

});

var port = process.env.PORT || 1337;
var server = app.listen(port, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('App listening at http://%s:%s', host, port);
});