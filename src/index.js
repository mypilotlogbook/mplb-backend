require('dotenv').config();
const express = require('express');
const cors = require('cors');

require('./config/db');
const logger = require('./utils/logger');

const app = express();

app.use(cors());
app.use(express.json({ limit: '20mb' }));

const PORT = process.env.PORT || 5050;

app.get('/', (req, res, next) => { 
    res.send("<h1>This is MYPILOTLOGBOOK API</h1>");
    next();
});

app.listen(PORT, () => {
    logger.info(`Server is listening on port ${PORT}`);
});