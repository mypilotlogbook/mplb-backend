const mongoose = require('mongoose');
const Flight = require('../models/Flight');
const Aircraft = require('../models/Aircraft');
const Pilot = require('../models/Pilot');
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

async function getMonthlyPilotsData(req, res) {
    try {
        const now = new Date();
        const currentYear = now.getFullYear();

        // Calculate the start and end dates for the current year
        const startOfYear = new Date(Date.UTC(currentYear, 0, 1)); // January 1 of the current year
        const endOfYear = new Date(Date.UTC(currentYear + 1, 0, 1)); // January 1 of the next year

        // Fetch all pilots for the current year for the given user
        const pilots = await Pilot.find({
            createdAt: {
                $gte: startOfYear.toISOString(),
                $lt: endOfYear.toISOString()
            },
            userId: req.params.userId
        });

        // Create an array to hold counts for each month
        const monthlyPilotData = Array.from({ length: 12 }, (_, i) => ({
            name: new Date(Date.UTC(currentYear, i)).toLocaleString('en-US', { month: 'short' }),
            value: 0
        }));

        // Populate the monthlyFlightData array with pilots counts
        pilots.forEach(pilot => {
            const month = new Date(pilot.createdAt).getMonth();
            monthlyPilotData[month].value += 1;
        });

        console.log(monthlyPilotData);

        logger.info("Get pilots monthly analytics data query was successful");
        return res.status(200).json(
            new SuccessResponse(
                200,
                "Get pilots monthly analytics data query was successful",
                monthlyPilotData
            )
        );

    } catch (error) {
        console.error('Error aggregating pilots data:', error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
}

async function getMonthlyAicraftData(req, res) {
    try {
        const now = new Date();
        const currentYear = now.getFullYear();

        // Calculate the start and end dates for the current year
        const startOfYear = new Date(Date.UTC(currentYear, 0, 1)); // January 1 of the current year
        const endOfYear = new Date(Date.UTC(currentYear + 1, 0, 1)); // January 1 of the next year

        // Fetch all aircraft for the current year for the given user
        const aircrafts = await Aircraft.find({
            createdAt: {
                $gte: startOfYear.toISOString(),
                $lt: endOfYear.toISOString()
            },
            userId: req.params.userId
        });

        // Create an array to hold counts for each month
        const monthlyAircraftsData = Array.from({ length: 12 }, (_, i) => ({
            name: new Date(Date.UTC(currentYear, i)).toLocaleString('en-US', { month: 'short' }),
            value: 0
        }));

        // Populate the monthlyAircraftData array with aircraft counts
        aircrafts.forEach(aircraft => {
            const month = new Date(aircraft.createdAt).getMonth();
            monthlyAircraftsData[month].value += 1;
        });

        console.log(monthlyAircraftsData);

        logger.info("Get aircrafts monthly analytics data query was successful");
        return res.status(200).json(
            new SuccessResponse(
                200,
                "Get aircrafts monthly analytics data query was successful",
                monthlyAircraftsData
            )
        );

    } catch (error) {
        console.error('Error aggregating aircraft data:', error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
}

module.exports = { getMonthlyFlightData, getMonthlyPilotsData, getMonthlyAicraftData };
