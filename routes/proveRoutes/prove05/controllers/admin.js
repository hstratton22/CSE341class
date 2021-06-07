//const mongodb = require('mongodb');
const Product = require('../models/product');
const { validationResult } = require('express-validator');// /check
const fileHelper = require('../util/file');
//const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
    /*if (!req.session.isLoggedIn) {
    return res.redirect('/login');
  }*/
    res.render('pages/proveAssignments/prove05/admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
        hasError: false,
        errorMessage: null,
        validationErrors: []
        //isAuthenticated: req.session.isLoggedIn//req.isLoggedIn
    });
};


exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const image = req.file;
    const price = req.body.price;
    const description = req.body.description;
    console.log(image);
    if (!image) {
        return res.status(422).render('pages/proveAssignments/prove05/admin/edit-product', {
            pageTitle: 'Add Product',
            path: '/admin/edit-product',
            editing: false,
            hasError: true,
            product: {
                title: title,
                price: price,
                description: description
            },
            errorMessage: 'Attached file is not an image',
            validationErrors: []
            //isAuthenticated : req.session.isLoggedIn
        });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('pages/proveAssignments/prove05/admin/edit-product', {
            pageTitle: 'Admin Add Product',
            path: '/admin/edit-product',
            editing: false,
            hasError: true,
            product: {
                title: title,
                imageUrl: imageUrl,
                price: price,
                description: description
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
            //isAuthenticated : req.session.isLoggedIn
        });
    }
    const imageUrl = image.path;

    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: req.user//req.session.user//req.user
    });
    //console.log(req.user);
    product
        .save()
        .then(result => {
            // console.log(result);
            console.log('Created Product');
            res.redirect('products');// admin remove?
        })
        .catch(err => {
            //console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('products');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('products');
            }
            res.render('pages/proveAssignments/prove05/admin/edit-product', {
                pageTitle: "Edit Product",
                path: '/admin/edit-product',
                editing: editMode,
                product: product,
                hasError: false,
                errorMessage: null,
                validationErrors: []
                //isAuthenticated: req.session.isLoggedIn//req.isLoggedIn
            });
        })
        .catch(err => {
            //res.redirect('/500');
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const image = req.file;
    const updatedDesc = req.body.description;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('pages/proveAssignments/prove05/admin/edit-product', {
            pageTitle: 'Admin Edit Product',
            path: '/admin/edit-product',
            editing: true,
            hasError: true,
            product: {
                title: updatedTitle,
                //imageUrl: updatedImageUrl,
                price: updatedPrice,
                description: updatedDesc,
                _id: prodId
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
            //isAuthenticated : req.session.isLoggedIn
        });
    }
    Product.findById(prodId)
        .then(product => {
            if (product.userId.toString() !== req.user._id.toString()
            ) {
                return res.redirect('products');
            }
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDesc;
            if (image) {
                fileHelper.deleteFile(product.imageUrl);
                product.imageUrl = image.path;
            }
            //product.imageUrl = updatedImageUrl;

            return product
                .save()
                .then(result => {
                    console.log('UPDATED PRODUCT!');
                    res.redirect('products');
                });
        })

        .catch(err => //console.log(err));
        {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};



exports.getProducts = (req, res, next) => {
    Product.find({ userId: req.user._id })
        .then(products => {
            console.log(products);
            res.render('pages/proveAssignments/prove05/admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products',
                //isAuthenticated: req.session.isLoggedIn//req.isLoggedIn
            });
        })
        .catch(err => //console.log(err));
        {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}

//exports.postDeleteProduct = (req, res, next) => {
exports.deleteProduct = (req, res, next) => {
    const prodId = req.params.productId;//body
    Product.findById(prodId)

        .then(product => {
            if (!product) {
                return next(new Error('Product not found'))
            }
            fileHelper.deleteFile(product.imageUrl);
            return Product.deleteOne({ _id: prodId, userId: req.user._id })
        })
        // .catch(err => next(err));


        //Product.findByIdAndRemove(prodId)
        .then(() => {
            console.log('DESTROYED PRODUCT');
            //res.redirect('admin/products');
            res.status(200).json({message:'Success'});

        })
        .catch(err => //console.log(err)
        {
            // const error = new Error(err);
            // error.httpStatusCode = 500;
            // return next(error);
            res.status(500).json({message: 'Deleting product failed'});
        });
};

    //Product.findByIdAndRemove(prodId)

//     Product.deleteOne({ _id: prodId, userId: req.user._id })
//         .then(() => {
//             console.log('DESTROYED PRODUCT');
//             res.redirect('products');
//         })
//         .catch(err => //console.log(err));
//         {
//             const error = new Error(err);
//             error.httpStatusCode = 500;
//             return next(error);
//         });
// };