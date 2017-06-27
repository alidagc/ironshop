// SSED FILE - A JS file that saves things to your database when you run it
//(makes onboarding easier and it allows you to recreate old data in your DB after you delete things (by accident or on purpose).)

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ironshop');

// We have to connect the DB again here because seed.js is SEPARATE from app.js

const Product = require('../models/product-model.js');
// ^^ connecting the Product schema to the actual creation of objects
const productInfoArray = [
  {
    name: 'Phone Case',
    price: 9.99,
    imageUrl: 'https://media.giphy.com/media/63I6FXZTXks2A/giphy.gif',
    description: 'Protects your phone'
  },
  {
    name: 'Bean Bag',
    price: 25,
    imageUrl: 'https://media.giphy.com/media/FCACuwkULerp6/giphy.gif',
    description: 'You can literally sleep on it!'
  },
  {
    name: 'Tissues',
    price: 10,
    imageUrl: 'https://media.giphy.com/media/3o7TKsrfldgW9UXx60/giphy.gif',
    description: 'Capture all debris from any nostril'
  },
    {
    name: 'Yoga Mat',
    price: 29.99,
    imageUrl: 'http://i.imgur.com/XtpFrW7.jpg',
    description: 'Keeps your knees safe, slip proof, sweat proof. Top of the line',
  },
  {
    name: '20" monitor',
    price: 249.99,
    imageUrl: 'http://i.imgur.com/5ICGeY0.jpg',
    description: 'Large enough for even the heaviest gamer. Crisp, fresh, no dead pixels guarantee',
  },
  {
    name: 'Soylent',
    price: 54.99,
    imageUrl: 'http://media.gq.com/photos/57c6f39209f7003c4afd2c4d/3:2/w_800/drink_gallery5.546e2142f4c6.jpg',
    description: 'You never have to leave your computer! All you can eat nutrition!',
  }
];

Product.create(
  productInfoArray,               // 1st argument -> array of product info objects
  (err, productResults) => {      // 2nd argument -> callback!
    if (err){
      console.log("OMG! Database error.");
      return;
    }
    productResults.forEach((oneProd) => {
      console.log("New Product! " + oneProd.name);
    });
  }
);