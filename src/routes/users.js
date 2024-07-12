const express = require('express');
const createUserModel = require('../models/user');

const router = express.Router();

router.use((req, res, next) => {
    req.User = createUserModel(req.dbConnection);
    next();
});

router.get('/', async (req, res) => {
    try {
        const users = await req.User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
