var mongoose = require('mongoose');
var Product = require('./models/product.js');



mongoose.connect('mongodb://localhost/db', function(){
	console.log('connected');
});


