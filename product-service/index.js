const express = require("express");
const app = express();
const PORT = process.env.PORT || 5003;

app.get('/api/products', (req, res) => {
    res.json({ products: [{ id: 1, name: 'Product A' }] });
});

app.listen(PORT, () => {
    console.log(`Product service is running on port: ${PORT}`);
});