const logger = require('../../utils/logger');
const ErrorResponse = require('../../utils/ErrorResponse');
const SuccessResponse = require('../../utils/SuccessResponse');
const FlightScheama = require('../models/Flight');

const getAllFlights = async (req, res) => {
    try {
        const flights = await FlightScheama.find();

        logger.info("Get all flights query was successful");
        res.status(200).json(
            new SuccessResponse(
                200,
                "Get all flights query was successful",
                flights
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Get all flights internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Get all flights internal server error",
                error
            )
        );
    }
}

const getFlight = async (req, res) => {
    try {

        const { flightId } = req.params;

        if(!flightId) {
            logger.info("Get flight query was failed");
            return res.status(423).json(
                new ErrorResponse(
                    423,
                    "Get flight query was failed",
                    "Flight Id not found",
                )
            );
        }

        const flight = await FlightScheama.findById(flightId)
            .populate('userId')
            .populate('pilotOne')
            .populate('pilotTwo')
            .populate('pilotThree')
            .populate('departure')
            .populate('arrival')
            .populate('aircraft')
            .exec();

        if(!flight) {
            logger.info("Get flight query was failed");
            return res.status(404).json(
                new ErrorResponse(
                    404,
                    "Get flight query was failed",
                    "Flight not found",
                )
            );
        }

        logger.info("Get flight query was successful");
        res.status(200).json(
            new SuccessResponse(
                200,
                "Get flight query was successful",
                flight
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Get flight internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Get flight internal server error",
                error
            )
        );
    }
}

const deleteFlight = async (req, res) => {
    try {

        const { flightId } = req.params;

        if(!flightId) {
            logger.info("Delete flight query was failed");
            return res.status(423).json(
                new ErrorResponse(
                    423,
                    "Delete flight query was failed",
                    "Flight Id not found",
                )
            );
        }

        const flight = await FlightScheama.findByIdAndDelete(flightId);

        if(!flight) {
            logger.info("Delete flight query was failed");
            return res.status(404).json(
                new ErrorResponse(
                    404,
                    "Delete flight query was failed",
                    "Flight not found",
                )
            );
        }

        logger.info("Delete flight query was successful");
        res.status(204).json(
            new SuccessResponse(
                204,
                "Delete flight query was successful",
                "Delete flight query was successful",
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Delete flight internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Delete flight internal server error",
                error
            )
        );
    }
}

const getAllFlightsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        if(!userId) {
            logger.info("Get flights by userId query was failed");
            return res.status(423).json(
                new ErrorResponse(
                    423,
                    "Get flights by userId query was failed",
                    "User Id not found",
                )
            );
        }

        const flights = await FlightScheama.find({ userId: userId });

        logger.info("Get all flights by userId query was successful");
        res.status(200).json(
            new SuccessResponse(
                200,
                "Get all flights by userId query was successful",
                flights
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Get all flights by userId internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Get all flights by userId internal server error",
                error
            )
        );
    }
}

const updateFlight = async (req, res) => {
    try {

        const { flightId } = req.params;

        if(!flightId) {
            logger.info("Update flight query was failed");
            return res.status(423).json(
                new ErrorResponse(
                    423,
                    "Update flight query was failed",
                    "Flight Id not found",
                )
            );
        }

        const flight = await FlightScheama.findById(flightId);   
        
        if(!flight) {
            logger.info("Update flight query was failed");
            return res.status(404).json(
                new ErrorResponse(
                    404,
                    "Update flight query was failed",
                    "Flight not found",
                )
            );
        }

        const updatedFlight = await FlightScheama.findByIdAndUpdate(flightId, req.body, { new: true });

        logger.info("Update flight query was successful");
        res.status(201).json(
            new SuccessResponse(
                201,
                "Update flight query was successful",
                updatedFlight
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Update flight internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Update flight internal server error",
                error
            )
        );
    }
}

const createFlight = async (req, res) => {
    try {

        const {
            date,
            aircraft,
            flight_nr,
            departure,
            arrival,
            std,
            out_time,
            takeoff,
            landing,
            in_time,
            sta,
            total_time,
            air,
            pilotOne,
            pilotTwo,
            pilotThree,
            pilotFour,
            crew_list,
            flight_log,
            remarks,
            training,
            delay_code_one,
            delay_code_two,
            delay_code_three,
            approach,
            operation,
            sign,
            pic,
            pic_us,
            sic,
            dual,
            instructor,
            examinar,
            relief,
            TO_day,
            TO_night,
            LDG_night,
            lifts,
            holding,
            night,
            ifr,
            act_instr,
            sim_instr,
            xc,
            pax,
            de_icing,
            fuel_total,
            fuel_plan,
            fuel_used,
            userId
        } = req.body;

        const flight = new FlightScheama({
            date,
            aircraft,
            flight_nr,
            departure,
            arrival,
            std,
            out_time,
            takeoff,
            landing,
            in_time,
            sta,
            total_time,
            air,
            pilotOne,
            pilotTwo,
            pilotThree,
            pilotFour,
            crew_list,
            flight_log,
            remarks,
            training,
            delay_code_one,
            delay_code_two,
            delay_code_three,
            approach,
            operation,
            sign,
            pic,
            pic_us,
            sic,
            dual,
            instructor,
            examinar,
            relief,
            TO_day,
            TO_night,
            LDG_night,
            lifts,
            holding,
            night,
            ifr,
            act_instr,
            sim_instr,
            xc,
            pax,
            de_icing,
            fuel_total,
            fuel_plan,
            fuel_used,
            userId
        });      

        const savedFlight = await flight.save();

        logger.info("Create flight query was successful");
        res.status(201).json(
            new SuccessResponse(
                201,
                "Create flight query was successful",
                savedFlight
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Create flight internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Create flight internal server error",
                error
            )
        );
    }
}

const deleteAircraftsByUserId = async (req, res) => {
    try {

        const { userId } = req.params;

        if(!userId) {
            logger.info("Delete flights by userId query was failed");
            return res.status(423).json(
                new ErrorResponse(
                    423,
                    "Delete flights by userId query was failed",
                    "User Id not found",
                )
            );
        }

        await FlightScheama.deleteMany({ userId: userId });   

        logger.info("Delete flights by userId query was successful");
        res.status(204).json(
            new SuccessResponse(
                204,
                "Delete flights by userId query was successful",
                "Flights Data deleted successfully",
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Delete flights by userId internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Delete flights by userId internal server error",
                error
            )
        );
    }
}

module.exports = {
    getAllFlights,
    getFlight,
    deleteFlight,
    getAllFlightsByUserId,
    updateFlight,
    createFlight,
    deleteAircraftsByUserId
}