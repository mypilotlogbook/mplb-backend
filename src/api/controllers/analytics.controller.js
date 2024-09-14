const mongoose = require('mongoose');
const Flight = require('../models/Flight');
const SuccessResponse = require('../../utils/SuccessResponse');
const ErrorResponse = require('../../utils/ErrorResponse');
const logger = require('../../utils/logger');

const MONTHS = [
    { name: 'Jan', value: 0 },
    { name: 'Feb', value: 0 },
    { name: 'Mar', value: 0 },
    { name: 'Apr', value: 0 },
    { name: 'May', value: 0 },
    { name: 'Jun', value: 0 },
    { name: 'Jul', value: 0 },
    { name: 'Aug', value: 0 },
    { name: 'Sep', value: 0 },
    { name: 'Oct', value: 0 },
    { name: 'Nov', value: 0 },
    { name: 'Dec', value: 0 }
];

// async function getMonthlyFlightData(req, res) {
//     try {
      
//         const januaryflights = await Flight.find({
//             date: {
//                 $gte: '2024-01-01T00:00:00.000Z',
//                 $lt: '2024-01-01T00:00:00.000Z'
//             },
//             userId: req.params.userId
//         });
//         const februaryflights = await Flight.find({
//             date: {
//                 $gte: '2024-02-01T00:00:00.000Z',
//                 $lt: '2024-03-01T00:00:00.000Z'
//             },
//             userId: req.params.userId
//         });
//         const marchflights = await Flight.find({
//             date: {
//                 $gte: '2024-03-01T00:00:00.000Z',
//                 $lt: '2024-04-01T00:00:00.000Z'
//             },
//             userId: req.params.userId
//         });
//         const aprilflights = await Flight.find({
//             date: {
//                 $gte: '2024-04-01T00:00:00.000Z',
//                 $lt: '2024-05-01T00:00:00.000Z'
//             },
//             userId: req.params.userId
//         });
//         const mayflights = await Flight.find({
//             date: {
//                 $gte: '2024-05-01T00:00:00.000Z',
//                 $lt: '2024-06-01T00:00:00.000Z'
//             },
//             userId: req.params.userId
//         });
//         const juneflights = await Flight.find({
//             date: {
//                 $gte: '2024-06-01T00:00:00.000Z',
//                 $lt: '2024-07-01T00:00:00.000Z'
//             },
//             userId: req.params.userId
//         });
//         const julyflights = await Flight.find({
//             date: {
//                 $gte: '2024-07-01T00:00:00.000Z',
//                 $lt: '2024-08-01T00:00:00.000Z'
//             },
//             userId: req.params.userId
//         });
//         const augustflights = await Flight.find({
//             date: {
//                 $gte: '2024-08-01T00:00:00.000Z',
//                 $lt: '2024-09-01T00:00:00.000Z'
//             },
//             userId: req.params.userId
//         });
//         const septemberflights = await Flight.find({
//             date: {
//                 $gte: '2024-09-01T00:00:00.000Z',
//                 $lt: '2024-10-01T00:00:00.000Z'
//             },
//             userId: req.params.userId
//         });
//         const octoberflights = await Flight.find({
//             date: {
//                 $gte: '2024-10-01T00:00:00.000Z',
//                 $lt: '2024-11-01T00:00:00.000Z'
//             },
//             userId: req.params.userId
//         });
//         const novemberflights = await Flight.find({
//             date: {
//                 $gte: '2024-11-01T00:00:00.000Z',
//                 $lt: '2024-12-01T00:00:00.000Z'
//             },
//             userId: req.params.userId
//         });
//         const decemberflights = await Flight.find({
//             date: {
//                 $gte: '2024-12-01T00:00:00.000Z',
//                 $lt: '2025-01-01T00:00:00.000Z'
//             },
//             userId: req.params.userId
//         });

//         const monthlyFlightData = [
//             { name: "Jan", value: januaryflights.length },
//             { name: "Feb", value: februaryflights.length },
//             { name: "Mar", value: marchflights.length },
//             { name: "Apr", value: aprilflights.length },
//             { name: "May", value: mayflights.length },
//             { name: "Jun", value: juneflights.length },
//             { name: "Jul", value: julyflights.length },
//             { name: "Aug", value: augustflights.length },
//             { name: "Sep", value: septemberflights.length },
//             { name: "Oct", value: octoberflights.length },
//             { name: "Nov", value: novemberflights.length },
//             { name: "Dec", value: decemberflights.length },
//         ];

//         console.log(monthlyFlightData);

//         logger.info("Get flight monthly analytics data query was successful");
//         return res.status(200).json(
//             new SuccessResponse(
//                 200,
//                 "Get flight monthly analytics data query was successful",
//                 monthlyFlightData
//             )
//         );

//     } catch (error) {
//       console.error('Error aggregating flight data:', error);
//       throw error;
//     }
// }
  
// async function getMonthlyFlightData(req, res) {
//     try {
//         const userId = req.params.userId;

//         // Fetch all flights for the year 2024 for the given user
//         const flights = await Flight.find({
//             date: {
//                 $gte: '2024-01-01T00:00:00.000Z',
//                 $lt: '2025-01-01T00:00:00.000Z'
//             },
//             userId: userId
//         });

//         // Create an array to hold counts for each month
//         const monthlyFlightData = Array.from({ length: 12 }, (_, i) => ({
//             name: new Date(0, i).toLocaleString('en-US', { month: 'short' }),
//             value: 0
//         }));

//         // Populate the monthlyFlightData array with flight counts
//         flights.forEach(flight => {
//             const month = new Date(flight.date).getMonth();
//             monthlyFlightData[month].value += 1;
//         });

//         console.log(monthlyFlightData);

//         logger.info("Get flight monthly analytics data query was successful");
//         return res.status(200).json(
//             new SuccessResponse(
//                 200,
//                 "Get flight monthly analytics data query was successful",
//                 monthlyFlightData
//             )
//         );

//     } catch (error) {
//         console.error('Error aggregating flight data:', error);
//         return res.status(500).json({
//             status: 500,
//             message: "Internal server error"
//         });
//     }
// }

async function getMonthlyFlightData(req, res) {
    try {
        const userId = req.params.userId;
        const now = new Date();
        const currentYear = now.getFullYear();

        // Calculate the start and end dates for the current year
        const startOfYear = new Date(Date.UTC(currentYear, 0, 1)); // January 1 of the current year
        const endOfYear = new Date(Date.UTC(currentYear + 1, 0, 1)); // January 1 of the next year

        // Fetch all flights for the current year for the given user
        const flights = await Flight.find({
            date: {
                $gte: startOfYear.toISOString(),
                $lt: endOfYear.toISOString()
            },
            userId: userId
        });

        // Create an array to hold counts for each month
        const monthlyFlightData = Array.from({ length: 12 }, (_, i) => ({
            name: new Date(Date.UTC(currentYear, i)).toLocaleString('en-US', { month: 'short' }),
            value: 0
        }));

        // Populate the monthlyFlightData array with flight counts
        flights.forEach(flight => {
            const month = new Date(flight.date).getMonth();
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
