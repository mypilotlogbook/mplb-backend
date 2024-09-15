const mongoose = require('mongoose');
const Flight = require('../models/Flight');
const SuccessResponse = require('../../utils/SuccessResponse');
const ErrorResponse = require('../../utils/ErrorResponse');
const logger = require('../../utils/logger');

async function getMonthlyFlightData(req, res) {
    try {
        const now = new Date();
        const currentYear = now.getFullYear();

        // Calculate the start and end dates for the current year
        const startOfYear = new Date(Date.UTC(currentYear, 0, 1)); // January 1 of the current year
        const endOfYear = new Date(Date.UTC(currentYear + 1, 0, 1)); // January 1 of the next year

        // Fetch all flights for the current year for the given user
        const flights = await Flight.find({
            createdAt: {
                $gte: startOfYear.toISOString(),
                $lt: endOfYear.toISOString()
            },
            userId: req.params.userId
        });

        // Create an array to hold counts for each month
        const monthlyFlightData = Array.from({ length: 12 }, (_, i) => ({
            name: new Date(Date.UTC(currentYear, i)).toLocaleString('en-US', { month: 'short' }),
            value: 0
        }));

        // Populate the monthlyFlightData array with flight counts
        flights.forEach(flight => {
            const month = new Date(flight.createdAt).getMonth();
            monthlyFlightData[month].value += 1;
        });

        console.log(monthlyFlightData);

        logger.info("Get flight monthly analytics data query was successful");
        return res.status(200).json(
            new SuccessResponse(
                200,
                "Get flight monthly analytics data query was successful",
                monthlyFlightData
            )
        );

    } catch (error) {
        console.error('Error aggregating flight data:', error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
}

module.exports = { getMonthlyFlightData };
