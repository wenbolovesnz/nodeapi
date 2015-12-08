var mongoose = require('mongoose');

var ProductSchema = {
	name: String,
	price: Number,
	id: String
};

var Product = mongoose.model('Product', ProductSchema, 'products');

module.exports = Product;

