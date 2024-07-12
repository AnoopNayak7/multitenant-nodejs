require('dotenv').config();
const express = require('express');
const identifyTenant = require('./middleware/tenants');
const connectToDatabase = require('./config/db');
const userRoutes = require('./routes/users');

const app = express();
app.use(express.json());
app.use(identifyTenant);

app.use((req, res, next) => {
    req.dbConnection = connectToDatabase(req.tenantId);
    next();
});

app.use('/users', userRoutes);

app.post('/tenants', async (req, res) => {
    const { tenantId } = req.body;
    try {
        const connection = connectToDatabase(tenantId);
        res.status(201).json({ message: 'Tenant database created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
