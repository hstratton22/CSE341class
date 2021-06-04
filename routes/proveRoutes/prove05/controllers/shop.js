//const products = [];
const fs = require('fs');
const path = require('path');

const PDFDocument = require('pdfkit');

const Product = require('../models/product');
const Order = require('../models/order');
const ITEMS_PER_PAGE = 4;

exports.getProducts = (req, res, next) => {
    // Product.find()
    //     .then(products => {
    //         console.log(products);
    //         res.render('pages/proveAssignments/prove05/shop/product-list', {
    //             prods: products,
    //             pageTitle: 'All Products',
    //             path: '/products',
    //             //isAuthenticated: req.session.isLoggedIn//req.isLoggedIn
    //         });
    //     })const page = +req.query.page || 1;
  let totalItems;

  Product.find()
    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
    })
    .then(products => {
      res.render('pages/proveAssignments/prove05/shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)

      });
    })
    .catch(err => {
      //console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            //console.log(product);
            res.render('pages/proveAssignments/prove05/shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products',
                //isAuthenticated: req.session.isLoggedIn//req.isLoggedIn
            });
        })
        .catch(err => {
            //console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getIndex = (req, res, next) => {
    const page = +req.query.page || 1;
    let totalItems;
    Product.find()
        .countDocuments()
        .then(numProducts => {
            totalItems = numProducts;
            return Product.find()
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
        })

        .then(products => {
            res.render('pages/proveAssignments/prove05/shop/index', {
                prods: products,
                pageTitle: 'E-commerce tutorial Shop Home ',
                path: '/',
                currentPage: page,
                hasNextPage: ITEMS_PER_PAGE * page < totalItems,
                hasPreviousPage: page > 1,
                nextPage: page + 1,
                previousPage: page - 1,
                lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
                ///isAuthenticated: req.session.isLoggedIn//req.isLoggedIn
            });
        })
        .catch(err => {
            //console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getCart = (req, res, next) => {
    req.user
        //req.session.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            //console.log(user.cart.items);
            const products = user.cart.items;
            res.render('pages/proveAssignments/prove05/shop/cart', {
                path: '/cart',
                pageTitle: 'Your cart',
                products: products,
                //isAuthenticated: req.session.isLoggedIn//req.isLoggedIn
            });
        })
        .catch(err => {
            //console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    //console.log(prodId);
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            console.log(result);
            res.redirect('./cart');
        })
        .catch(err => {
            //console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user//req.session.user//
        .removeFromCart(prodId)
        .then(result => {
            res.redirect('/proveAssignments/prove05/cart');//pages/  need shop?
        })
        .catch(err => {
            //console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};
exports.postOrder = (req, res, next) => {
    req.user//req.session.user//req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            console.log()
            const products = user.cart.items.map(i => {
                return { quantity: i.quantity, product: { ...i.productId._doc } };
            });
            const order = new Order({
                user: {
                    email: req.user.email,
                    userId: req.user
                },
                products: products

            });
            return order.save();
        })
        .then(result => {
            return req.user.clearCart();
        })
        .then(() => {
            res.redirect('orders');//check path ?proveAssignments/prove04/shop/orders
        })
        .catch(err => {
            //console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};


exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user._id })
        .then(orders => {
            res.render('pages/proveAssignments/prove05/shop/orders', {//pages  //pages/proveAssignments/prove04/shop/ or shop/orders
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders,
                //isAuthenticated: req.session.isLoggedIn//req.isLoggedIn
            });
        })
        .catch(err => {
            //console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });

};
exports.getInvoice = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId)
        .then(order => {
            if (!order) {
                return next(new Error('No order found'));
            }
            if (order.user.userId.toString() !== req.user._id.toString()) {
                return next(new Error('Unauthorized'));
            }

            const invoiceName = 'invoice-' + orderId + '.pdf';
            const invoicePath = path.join('routes', 'proveRoutes', 'prove05', 'data', 'invoices', invoiceName);

            const pdfDoc = new PDFDocument();
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
            pdfDoc.pipe(fs.createWriteStream(invoicePath));
            pdfDoc.pipe(res);
            //pdfDoc.text('Hello World');
            pdfDoc.fontSize(26).text('Invoice', {
                underline: true
            });
            pdfDoc.text('---------------------');
            let totalPrice = 0;
            order.products.forEach(prod => {
                totalPrice += prod.quantity * prod.product.price;
                pdfDoc
                    .fontSize(14)
                    .text(
                        prod.product.title +
                        ' - ' + prod.quantity +
                        ' x ' + '$' +
                        prod.product.price
                    );
            });
            pdfDoc.text('=======================');
            pdfDoc
                .fontSize(20)
                .text('Total Price = ' + totalPrice);
            pdfDoc.end();
            // fs.readFile(invoicePath, (err, data)=> {
            // if (err) {
            //   return next(err);
            // }
            // res.setHeader('Content-Type', 'application/pdf');
            // res.setHeader('Content-Disposition', 'inline:filename="' +  invoiceName + '"');// inline can be attachment instead
            // res.send(data);
            // });
            //.....................streamresponse
            // const file = fs.createReadStream(invoicePath);
            // res.setHeader('Content-Type', 'application/pdf');
            // res.setHeader('Content-Disposition', 'inline:filename="' +  invoiceName + '"');
            // file.pipe(res);
        })
        .catch(err => next(err));
}
// exports.postCounter = (req, res, next) => {
//     const prodId = req.body.productId;
//     const counterChange = Number(req.body.constant);
//     console.log(prodId, counterChange);
//     Product.findById(prodId)
//         .then(product => {
//             return req.user.updateCartQuantity(product, counterChange);
//         })
//     // req.user
//     //     .updateCartQuantity(prodId, counterChange)
//         .then(result => {
//             res.redirect('./cart');
//         })
//         .catch(err => //console.log(err));
//         {
//             const error = new Error(err);
//             error.httpStatusCode = 500;
//             return next(error);
//         })



// }
    //const products = Product.fetchAll();
    //console.log('another in the middleware');
    //res.send('<h1>Hello from Express!</h1>');
    //console.log(adminData.products);
    //res.sendFile(path.join(__dirname, '../', 'views', 'shop.html')); 
    //res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    //const products = adminData.products;
    //res.render('shop', {prods: products, pageTitle: 'Shop', path:'/'});
