//const products = [];
const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
    Product.find()
    .then(products => {
        console.log(products);
        res.render('pages/proveAssignments/prove04/shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
        });
    })
    .catch(err => {
        console.log(err);
    });
}; 
 
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(product => {
        //console.log(product);
        res.render('pages/proveAssignments/prove04/shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        });
    })
    .catch(err => console.log(err));
};
 
exports.getIndex = (req, res, next) => {
    Product.find()
    .then(products => {
        res.render('pages/proveAssignments/prove04/shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    })
    .catch(err => {
        console.log(err);
      });
};

exports.getCart = (req, res, next) => {
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      //console.log(user.cart.items);
      const products = user.cart.items;
            res.render('pages/proveAssignments/prove04/shop/cart', {
                path: '/cart',
                pageTitle: 'Your cart',
                products: products
            });
    })
    .catch(err => console.log(err));
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
    res.redirect('./cart');//pages/prove03
    })
    .catch(err => {
        console.log(err);
      });
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
    .removeFromCart(prodId)
    .then(result => {
        res.redirect('/proveAssignments/prove04/cart');//pages/  need shop?
    })
    .catch(err => console.log(err));
};
exports.postOrder = (req, res, next) => {
    req.user
      .populate('cart.items.productId')
      .execPopulate()
      .then(user => {
        console.log()
        const products = user.cart.items.map(i => {
          return { quantity: i.quantity, product: { ...i.productId._doc } };
        });
        const order = new Order({
          user: {
            name: req.user.name,
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
      .catch(err => console.log(err));
  }; 


exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user._id })
    .then(orders => {
    res.render('pages/proveAssignments/prove04/shop/orders', {//pages  //pages/proveAssignments/prove04/shop/ or shop/orders
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
    });
})
.catch(err => console.log(err));

}; 
    //const products = Product.fetchAll();
    //console.log('another in the middleware');
    //res.send('<h1>Hello from Express!</h1>');
    //console.log(adminData.products);
    //res.sendFile(path.join(__dirname, '../', 'views', 'shop.html')); 
    //res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    //const products = adminData.products;
    //res.render('shop', {prods: products, pageTitle: 'Shop', path:'/'});
