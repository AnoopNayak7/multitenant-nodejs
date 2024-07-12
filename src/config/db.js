const mongoose = require('mongoose');

const connectToDatabase = (tenantId) => {
    const dbUri = `${process.env.MONGODB_URI}/${tenantId}`;
    return mongoose.createConnection(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectToDatabase;
