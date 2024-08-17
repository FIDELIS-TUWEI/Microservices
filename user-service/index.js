const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/api/users', (req, res) => {
    res.json({ users: [{ id: 1, name: 'John Doe' }] });
});

app.listen(PORT, () => {
    console.log(`User service is running on port: ${PORT}`);
});