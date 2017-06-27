const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myProductSchema = new Schema ({
  name: {type:String},
  price: {type:Number, default:1},
  imageUrl: {type:String, default: '/images/product.gif'},
  description: {type: String}
});

const ProductModel = mongoose.model ('Product', myProductSchema);
//Collection name is automatically determined by Mongoose

module.exports = ProductModel;
