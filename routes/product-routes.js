const express = require('express');

const ProductModel = require('../models/product-model.js');

const router  = express.Router();

router.get('/products', (req, res, next) => {
  ProductModel.find((err, productResults) =>{
    if (err) {
      // use next() to skip to the ERROR PAGE
      next(err);
      return;
    }
    res.render('product-views/products-list-view', {
      productsForView: productResults
    });
  });
});


// ADDING AN ITEM ------------------------------

// STEP #1 of form submission for a new product
router.get('/products/new', (req, res, next) => {
  res.render('product-views/new-product-view');
});

//STEP #2 of form submission for a new product
router.post('/products',(req, res, next)=>{
  const newProduct = new ProductModel ({
    name: req.body.productName,
    price: req.body.productPrice,
    imageUrl: req.body.productImageUrl,
    description: req.body.productDescription
  });

  newProduct.save((err)=>{
      if (err) {
        // use next() to skip to the ERROR PAGE
        next(err);
        return;
      }
      // if new prodcut saved succesfully, redirect to a URL
      // (redirect is STEP #3 of form submission for a
      // new product - takes you to a page that already knows how to render,
      //  instead of rendering a new page)
      //if you do not redirect away from a succesful post, then your form will re-submit the content all over again.
      res.redirect('/products/details?myID='+ newProduct._id);
  });
});

router.get('/products/:myID', (req, res, next) => {
                      //^^ req.params.myID
  ProductModel.findById(
    req.params.myID,       //1st arguemnt is the id to find in the db
    (err, productFromDB) => { // 2nd argument -> callback
      if (err) {
        // use next() to skip to the ERROR PAGE
        next(err);
        return;
      }
        res.render('product-views/product-details-view', {
          productDetails: productFromDB
        });
      }
  );
});

// EDITING AN ITEM ------------------------------

//Step 1 of form submission for updating a product
router.get('/products/:myID/edit', (req, res, next) => {
  ProductModel.findById(
    req.params.myID,
    (err, productFromDb) => {
      if(err) {
        next(err);
        return;
      }

      res.render('product-views/edit-product-view',{
        productDetails : productFromDb
      });
    }
  );
});

//STEP #2 of form submission for an edit product
router.post('/products/:myID/update',(req, res, next)=>{
// The parameters that findByIdandUpdate needs:
    ProductModel.findByIdAndUpdate(
      req.params.myID,       // 1: the ID
      {                      //2: object fields to update
        name: req.body.productName,
        price: req.body.productPrice,
        imageUrl: req.body.productImageUrl,
        description: req.body.productDescription
      },
      (err, productFromDb) => {  //3: callback
        if(err) {
          next(err);
          return;
        }
        res.redirect('/products/' + req.params.myID);
      }
    );
});

// REMOVING AN ITEM --------------

router.post('/products/:myID/remove',(req, res, next)=>{
// The parameters that findByIdandRemoveneeds:
    ProductModel.findByIdAndRemove(
      req.params.myID,             // 1: the ID
      (err, productFromDb) => {   //2: callback
        if(err) {
          next(err);
          return;
        }
        res.redirect('/products');
      }
    );
});

module.exports = router;
