const mongoose = require('mongoose');
const Flight = require('../models/Flight');
const SuccessResponse = require('../../utils/SuccessResponse');
const ErrorResponse = require('../../utils/ErrorResponse');
const logger = require('../../utils/logger');

async function getMonthlyFlightData(req, res) {
    try {
      
        const januaryflights = await Flight.find({
            createdAt: {
                $gte: '2024-01-01T00:00:00.000Z',
                $lt: '2024-01-01T00:00:00.000Z'
            },
            userId: req.params.userId
        });
        const februaryflights = await Flight.find({
            createdAt: {
                $gte: '2024-02-01T00:00:00.000Z',
                $lt: '2024-03-01T00:00:00.000Z'
            },
            userId: req.params.userId
        });
        const marchflights = await Flight.find({
            createdAt: {
                $gte: '2024-03-01T00:00:00.000Z',
                $lt: '2024-04-01T00:00:00.000Z'
            },
            userId: req.params.userId
        });
        const aprilflights = await Flight.find({
            createdAt: {
                $gte: '2024-04-01T00:00:00.000Z',
                $lt: '2024-05-01T00:00:00.000Z'
            },
            userId: req.params.userId
        });
        const mayflights = await Flight.find({
            createdAt: {
                $gte: '2024-05-01T00:00:00.000Z',
                $lt: '2024-06-01T00:00:00.000Z'
            },
            userId: req.params.userId
        });
        const juneflights = await Flight.find({
            createdAt: {
                $gte: '2024-06-01T00:00:00.000Z',
                $lt: '2024-07-01T00:00:00.000Z'
            },
            userId: req.params.userId
        });
        const julyflights = await Flight.find({
            createdAt: {
                $gte: '2024-07-01T00:00:00.000Z',
                $lt: '2024-08-01T00:00:00.000Z'
            },
            userId: req.params.userId
        });
        const augustflights = await Flight.find({
            createdAt: {
                $gte: '2024-08-01T00:00:00.000Z',
                $lt: '2024-09-01T00:00:00.000Z'
            },
            userId: req.params.userId
        });
        const septemberflights = await Flight.find({
            createdAt: {
                $gte: '2024-09-01T00:00:00.000Z',
                $lt: '2024-10-01T00:00:00.000Z'
            },
            userId: req.params.userId
        });
        const octoberflights = await Flight.find({
            createdAt: {
                $gte: '2024-10-01T00:00:00.000Z',
                $lt: '2024-11-01T00:00:00.000Z'
            },
            userId: req.params.userId
        });
        const novemberflights = await Flight.find({
            createdAt: {
                $gte: '2024-11-01T00:00:00.000Z',
                $lt: '2024-12-01T00:00:00.000Z'
            },
            userId: req.params.userId
        });
        const decemberflights = await Flight.find({
            createdAt: {
                $gte: '2024-12-01T00:00:00.000Z',
                $lt: '2025-01-01T00:00:00.000Z'
            },
            userId: req.params.userId
        });

        const monthlyFlightData = [
            { name: "Jan", value: januaryflights.length },
            { name: "Feb", value: februaryflights.length },
            { name: "Mar", value: marchflights.length },
            { name: "Apr", value: aprilflights.length },
            { name: "May", value: mayflights.length },
            { name: "Jun", value: juneflights.length },
            { name: "Jul", value: julyflights.length },
            { name: "Aug", value: augustflights.length },
            { name: "Sep", value: septemberflights.length },
            { name: "Oct", value: octoberflights.length },
            { name: "Nov", value: novemberflights.length },
            { name: "Dec", value: decemberflights.length },
        ];

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
      throw error;
    }
}

module.exports = { getMonthlyFlightData };
