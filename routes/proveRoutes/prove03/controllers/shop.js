//const products = [];
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('pages/proveAssignments/prove03/shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
        });
    });
};
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        //console.log(product);
        res.render('pages/proveAssignments/prove03/shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        });
    });
};
exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('pages/proveAssignments/prove03/shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    });
};
exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                } 
            }
            res.render('pages/proveAssignments/prove03/shop/cart', {
                path: '/cart',
                pageTitle: 'Your cart',
                products: cartProducts
            });
        });
    });
};
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    //console.log(prodId);
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price)
    });
    res.redirect('./cart');//pages/prove03
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/proveAssignments/prove03/cart');//pages/
    });
};
exports.getCheckout = (req, res, next) => {
    res.render('pages/proveAssignments/prove03/shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });

}
exports.getOrders = (req, res, next) => {
    res.render('pages/proveAssignments/prove03/shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
}
    //const products = Product.fetchAll();
    //console.log('another in the middleware');
    //res.send('<h1>Hello from Express!</h1>');
    //console.log(adminData.products);
    //res.sendFile(path.join(__dirname, '../', 'views', 'shop.html')); 
    //res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    //const products = adminData.products;
    //res.render('shop', {prods: products, pageTitle: 'Shop', path:'/'});
