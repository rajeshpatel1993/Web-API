const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = "aifsf";

exports.signup = (req,res, next) => {
    const { username, password } = req.body;
    let result = {};
    let status = 200;
    const user = new User({ username, password }); // document = instance of a model
    user.save((err, user) => {
        // console.log(err);
        if (!err) {
          exports.login();

        } else {
          status = 500;
          result.status = status;
          result.error = err;
        }
        res.status(status).send(result);
      });
};


exports.login = (req,res, next) => {
    const { username, password } = req.body;
    let result = {};
    let status = 200;


    User.findOne({username}, (err, user) => {
        if (!err && user) {
          bcrypt.compare(password, user.password).then(match => {
            if (match) {

                const payload = { user: user.username };
                const options = { expiresIn: '8h', issuer: 'http://localhost:3100' };
                const token = jwt.sign(payload, secret, options);
                
                result.token = token;
                result.status = status;
                result.result = user;
            } else {
              status = 400;
              result.status = status;
              result.error = 'Authentication error';
            }
            res.status(status).send(result);
          }).catch(err => {
            status = 500;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
          });
        } else {
          status = 404;
          result.status = status;
          result.error = err;
          res.status(status).send(result);
        }
      });
};

// exports.getAddProduct = (req, res, next) => {
//   res.render('admin/edit-product', {
//     pageTitle: 'Add Product',
//     path: '/admin/add-product',
//     formsCSS: true,
//     productCSS: true,
//     activeAddProduct: true,
//     editing : false
//   });
// };

// exports.postAddProduct = (req, res, next) => {
//   const title = req.body.title;
//   const imageUrl = req.body.imageUrl;
//   const price = req.body.price;
//   const description = req.body.description;
//   const product = new Product(null, title, imageUrl, description, price);
//   product.save();
//   res.redirect('/');
// };


// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if(!editMode) {
//     res.redirect('/');
//   }

//   const prodId = req.params.productId;
//   Product.findById(prodId, product => {
//     if(!product){
//       return res.redirect('/');
//     }
//     res.render('admin/edit-product', {
//       pageTitle: 'Edit Product',
//       path: '/admin/edit-product',
//       formsCSS: true,
//       productCSS: true,
//       activeAddProduct: true,
//       editing: editMode,
//       product: product
//     });

//   });

// };

// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedPrice = req.body.price;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedDesc = req.body.description;
//   const updatedProduct = new Product(
//     prodId,
//     updatedTitle,
//     updatedImageUrl,
//     updatedDesc,
//     updatedPrice
//   );
//   updatedProduct.save();
//   res.redirect('/admin/products');
// };

// exports.getProducts = (req, res, next) => {
//   Product.fetchAll(products => {
//     res.render('admin/products', {
//       prods: products,
//       pageTitle: 'Admin Products',
//       path: '/admin/products'
//     });
//   });
// };


// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.deleteById(prodId);
//   res.redirect('/admin/products');
// };


