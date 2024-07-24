require('dotenv').config();
const express = require('express');
const cors = require('cors');

require('./config/db');
const logger = require('./utils/logger');

const timezoneRoutes = require('./api/routes/timezone.route');
const airfieldRoutes = require('./api/routes/airfield.route');
const userRoutes = require('./api/routes/user.route');

const app = express();

app.use(cors());
app.use(express.json({ limit: '20mb' }));

const PORT = process.env.PORT || 5050;

app.get('/', (req, res, next) => { 
    res.send("<h1>This is MYPILOTLOGBOOK API</h1>");
    next();
});

app.use('/api/v1/timezone', timezoneRoutes);
app.use('/api/v1/airfield', airfieldRoutes);
app.use('/api/v1/user', userRoutes);

app.listen(PORT, () => {
    logger.info(`Server is listening on port ${PORT}`);
});