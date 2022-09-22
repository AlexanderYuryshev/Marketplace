const { Router } = require("express");
const models = require("../models");

const router = Router();

// Endpoints: \

// `-` POST /my-orders \
router.post("/my-orders", async (req, res) => {
    try {
        const order = await models.Order.create({
            orderDate: req.body.orderDate,
            status: "In progress",
            deliveryDate: req.body.deliveryDate,
            deliveryAddress: req.body.deliveryAddress
        });
        const cart = await models.Cart.findOne({
            where: {
                UserId: req.body.UserId,
            },
            include: [models.User, models.Purchase],
        });
        await order.setUser(req.body.UserId);
        await order.addPurchases(cart.Purchases);
        await cart.setPurchases([]);
        res.json("Order was added");
    } catch (error) {
        console.log(error.message);
    }
});

// `-` GET /my-orders \
router.get("/my-orders", async (req, res) => {
    try {
        const orders = await models.Order.findAll({
            where: {
                UserId: req.headers.userid,
            },
            include: [models.User, models.Purchase],
        });
        res.json(orders);
    } catch (error) {
        console.log(error.message);
    }
});

// `-` GET /products \
router.get("/products", async (req, res) => {
    try {
        const products = await models.Product.findAll();
        res.json(products);
    } catch (error) {
        console.log(error.message);
    }
});

// `-` GET /products/id \
router.get("/products/:id", async (req, res) => {
    try {
        const product = await models.Product.findAll({
            where: {
                id: req.params.id,
            },
            include: "Users",
        });
        res.json(product);
    } catch (error) {
        console.log(error.message);
    }
});

// `-` POST /products \
router.post("/products", async (req, res) => {
    try {
        const newProduct = await models.Product.create({
            title: req.body.title,
            description: req.body.description,
            cost: req.body.cost,
            vendorInfo: req.body.vendorInfo,
        });
        await newProduct.addUser([req.body.UserId]);
        res.json(newProduct);
    } catch (error) {
        console.log(error.message);
    }
});

// `-` DELETE /products \
router.delete("/products/:id", async (req, res) => {
    try {
        await models.Product.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.json("Product was deleted");
    } catch (error) {
        console.log(error.message);
    }
});

// `-` PUT /products \
router.put("/products/:id", async (req, res) => {
    try {
        await models.Product.update(
            {
                title: req.body.title || this.title,
                description: req.body.description || this.description,
                cost: req.body.cost || this.cost,
                vendorInfo: req.body.vendorInfo || this.vendorInfo,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        if (req.body.UserId) {
            const product = await models.Product.findByPk(req.params.id);
            await product.addUser([req.body.UserId]);
        }
        res.json("Product was changed");
    } catch (error) {
        console.log(error.message);
    }
});

// `-` GET /cart \
router.get("/cart", async (req, res) => {
    try {
        const cart = await models.Cart.findOne({
            where: {
                UserId: req.headers.userid,
            },
            include: [models.Purchase],
        });
        res.json(cart);
    } catch (error) {
        console.log(error.message);
    }
});

router.get("/purchases", async (req, res) => {
    try {
        const purhases = await models.Purchase.findAll({ include: "Product" });
        res.json(purhases);
    } catch (error) {
        console.log(error.message);
    }
});

// `-` POST /cart \
router.post("/cart", async (req, res) => {
    try {
        const cart = await models.Cart.create();
        let purchases = [];
        await cart.setUser(req.body.UserId);
        for (let i of req.body.products) {
            let purchase = await models.Purchase.create({ ProductId: i.id, amount: i.amount });
            await purchase.setProduct(req.body.product.id);
            purchases.push(purchase);
        }
        await cart.setPurchases(purchases);
        res.json("Cart was created");
    } catch (error) {
        console.log(error.message);
    }
});

// `-` PUT /cart
router.put("/cart", async (req, res) => {
    let cart = await models.Cart.findOne({
        where: {
            UserId: req.body.UserId,
        },
        include: [models.User, models.Purchase],
    });
    if (!cart) {
        cart = await models.Cart.create();
        await cart.setUser(req.body.UserId);
    }
    let purchase = await models.Purchase.findOne({
        where: {
            ProductId: req.body.productId,
        },
    });
    if (purchase) {
        purchase.amount = req.body.productAmount;
        await purchase.save();
    } else {
        purchase = await models.Purchase.create({
            ProductId: req.body.productId,
            amount: req.body.productAmount,
        });
        await purchase.setProduct(req.body.productId);
        await cart.addPurchase(purchase);
    }
    res.json(purchase);
});

// `-` DELETE /cart
router.delete("/cart", async (req, res) => {
    let cart = await models.Cart.findOne({
        where: {
            UserId: req.body.UserId,
        },
        include: [models.User, models.Purchase],
    });
    await cart.setProducts([...req.body.products]);
    res.json(cart);
});

module.exports = router;
