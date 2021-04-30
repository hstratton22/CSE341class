const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    //console.log('another in middleware');
    //res.send('<h1>The add product page</h1>');
    //res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
    //res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('pages/prove03/admin/edit-product', {
        pageTitle: "Add Product",
        path: '/admin/add-product',
        editing: false

    });
};
exports.postAddProduct = (req, res, next) => {
    //console.log(req.body);
    //products.push({title: req.body.title})
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    res.redirect('/');

};
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('pages/prove03/admin/edit-product', {
            pageTitle: "Edit Product",
            path: '/admin/edit-product',
            editing: editMode,
            product: product

        });

    });
};
exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(
        prodId,
        updatedTitle,
        updatedImageUrl,
        updatedDesc,
        updatedPrice
    );
    updatedProduct.save();
    res.redirect('pages/prove03/admin/products');

};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('pages/prove03/admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'

        });

    });
}
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('pages/prove03/admin/products');
}