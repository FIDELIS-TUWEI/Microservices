const express = require("express");
const communicator = require("../communicator/");
const app = express();
const PORT = process.env.PORT || 5002;

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await communicator.getOrders();
        const users = await communicator.getUsers();
        const products = await communicator.getProducts();

        const detailedOrders = orders.orders.map(order => {
            const user = users.users.find(user => user.id === order.user._id);
            const product = products.products.map(product => product.id === order.product._id);

            return { ...order, user, product }
        })
        res.json({ orders: detailedOrders });
    } catch (error) {
        res.status(500).json({ error: 'Internal server Error' })
    }
});

app.listen(PORT, () => {
    console.log(`Order service is running on port: ${PORT}`);
});