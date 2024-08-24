const logger = require('../../utils/logger');
const ErrorResponse = require('../../utils/ErrorResponse');
const SuccessResponse = require('../../utils/SuccessResponse');
const Aircraft = require('../models/Aircraft');
const validator = require('validator');

const getAircrafts = async (req, res) => {
    try {
        const aircrafts = await Aircraft.find();      

        logger.info("Get aircrafts query was successful");
        res.status(200).json(
            new SuccessResponse(
                200,
                "Get aircrafts query was successful",
                aircrafts
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Get aircrafts internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Get aircrafts internal server error",
                error
            )
        );
    }
}

const getAircraft = async (req, res) => {
    try {

        const { aircraftId } = req.params;

        if(!aircraftId) {
            logger.info("Get aircraft query was failed");
            return res.status(423).json(
                new ErrorResponse(
                    423,
                    "Get aircraft query was failed",
                    "Aircraft Id not found",
                )
            );
        }

        const aircraft = await Aircraft.findById(aircraftId).populate('userId').exec();   
        
        if(!aircraft) {
            logger.info("Get aircraft query was failed");
            return res.status(404).json(
                new ErrorResponse(
                    404,
                    "Get aircraft query was failed",
                    "Aircraft not found",
                )
            );
        }

        logger.info("Get aircraft query was successful");
        res.status(200).json(
            new SuccessResponse(
                200,
                "Get aircraft query was successful",
                aircraft
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Get aircraft internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Get aircraft internal server error",
                error
            )
        );
    }
}

const deleteAircraft = async (req, res) => {
    try {

        const { aircraftId } = req.params;

        if(!aircraftId) {
            logger.info("Delete aircraft query was failed");
            return res.status(423).json(
                new ErrorResponse(
                    423,
                    "Delete aircraft query was failed",
                    "Aircraft Id not found",
                )
            );
        }

        const aircraft = await Aircraft.findById(aircraftId);   
        
        if(!aircraft) {
            logger.info("Delete aircraft query was failed");
            return res.status(404).json(
                new ErrorResponse(
                    404,
                    "Delete aircraft query was failed",
                    "Aircraft not found",
                )
            );
        }

        await Aircraft.findByIdAndDelete(aircraftId);

        logger.info("Delete aircraft query was successful");
        res.status(204).json(
            new SuccessResponse(
                204,
                "Delete aircraft query was successful",
                "Aircraft deleted successful",
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Delete aircraft internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Delete aircraft internal server error",
                error
            )
        );
    }
}

const createAircraft = async (req, res) => {
    try {

        const {
            type,
            image,
            company,
            fin,
            registration_no,
            model,
            variant,
            manufacturer,
            type_rating,
            passenger,
            aircraft_class,
            sub_class,
            category,
            power,
            device,
            aerobatic,
            complex,
            tm_glider,
            tailwheel,
            high_performance,
            efis,
            more_than_weight,
            cross_country,
            relief_pilot,
            ifr,
            actual_instrument,
            sim_instrument,
            default_operation,
            default_approach,
            default_launch,
            auto_load_hours,
            userId
        } = req.body;

        const aircraft = new Aircraft({
            type,
            image,
            company,
            fin,
            registration_no,
            model,
            variant,
            manufacturer,
            type_rating,
            passenger,
            aircraft_class,
            sub_class,
            category,
            power,
            device,
            aerobatic,
            complex,
            tm_glider,
            tailwheel,
            high_performance,
            efis,
            more_than_weight,
            cross_country,
            relief_pilot,
            ifr,
            actual_instrument,
            sim_instrument,
            default_operation,
            default_approach,
            default_launch,
            auto_load_hours,
            userId
        });      

        const savedAircraft = await aircraft.save();

        logger.info("Create aircraft query was successful");
        res.status(201).json(
            new SuccessResponse(
                201,
                "Create aircraft query was successful",
                savedAircraft
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Create aircraft internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Create aircraft internal server error",
                error
            )
        );
    }
}

const updateAircraft = async (req, res) => {
    try {

        const { aircraftId } = req.params;

        if(!aircraftId) {
            logger.info("Update aircraft query was failed");
            return res.status(423).json(
                new ErrorResponse(
                    423,
                    "Update aircraft query was failed",
                    "Aircraft Id not found",
                )
            );
        }

        const aircraft = await Aircraft.findById(aircraftId);   
        
        if(!aircraft) {
            logger.info("Update aircraft query was failed");
            return res.status(404).json(
                new ErrorResponse(
                    404,
                    "Update aircraft query was failed",
                    "Aircraft not found",
                )
            );
        }

        const updatedAircraft = await Aircraft.findByIdAndUpdate(aircraftId, req.body, { new: true });

        logger.info("Update aircraft query was successful");
        res.status(201).json(
            new SuccessResponse(
                201,
                "Update aircraft query was successful",
                updatedAircraft
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Update aircraft internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Update aircraft internal server error",
                error
            )
        );
    }
}

const getAircraftsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        if(!userId) {
            logger.info("Get aircrafts by userId query was failed");
            return res.status(423).json(
                new ErrorResponse(
                    423,
                    "Get aircrafts by userId query was failed",
                    "User Id not found",
                )
            );
        }

        const aircrafts = await Aircraft.find({ userId: userId });      

        logger.info("Get aircrafts by userId query was successful");
        res.status(200).json(
            new SuccessResponse(
                200,
                "Get aircrafts by userId query was successful",
                aircrafts
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Get aircrafts by userId internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Get aircrafts by userId internal server error",
                error
            )
        );
    }
}

const deleteAircraftsByUserId = async (req, res) => {
    try {

        const { userId } = req.params;

        if(!userId) {
            logger.info("Delete Aircrafts by userId query was failed");
            return res.status(423).json(
                new ErrorResponse(
                    423,
                    "Delete Aircrafts by userId query was failed",
                    "User Id not found",
                )
            );
        }

        await Aircraft.deleteMany({ userId: userId });   

        logger.info("Delete Aircrafts by userId query was successful");
        res.status(204).json(
            new SuccessResponse(
                204,
                "Delete Aircrafts by userId query was successful",
                "Aircrafts Data deleted successfully",
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Delete Aircrafts by userId internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Delete Aircrafts by userId internal server error",
                error
            )
        );
    }
}

module.exports = {
    getAircrafts,
    getAircraft,
    deleteAircraft,
    createAircraft,
    updateAircraft,
    getAircraftsByUserId,
    deleteAircraftsByUserId
}