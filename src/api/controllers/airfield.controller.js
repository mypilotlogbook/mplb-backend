const logger = require('../../utils/logger');
const ErrorResponse = require('../../utils/ErrorResponse');
const SuccessResponse = require('../../utils/SuccessResponse');
const Airfield = require('../models/Airfield');

const getAirfields = async (req, res) => {
    try {
        const airfields = await Airfield.find().populate('timezone').exec();        

        logger.info("Get airfields query was successful");
        res.status(200).json(
            new SuccessResponse(
                200,
                "Get airfields query was successful",
                airfields
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Get airfields internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Get airfields internal server error",
                error
            )
        );
    }
}

const getAirfield = async (req, res) => {
    try {

        const { airfieldId } = req.params;

        if(!airfieldId) {
            logger.info("Get airfield query was failed");
            return res.status(423).json(
                new ErrorResponse(
                    423,
                    "Get airfield query was failed",
                    "Airfield Id not found",
                )
            );
        }

        const airfield = await Airfield.findById(airfieldId).populate('timezone').exec();   
        
        if(!airfield) {
            logger.info("Get airfield query was failed");
            return res.status(404).json(
                new ErrorResponse(
                    404,
                    "Get airfield query was failed",
                    "Airfield not found",
                )
            );
        }

        logger.info("Get airfield query was successful");
        res.status(200).json(
            new SuccessResponse(
                200,
                "Get airfield query was successful",
                airfield
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Get airfield internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Get airfield internal server error",
                error
            )
        );
    }
}

const deleteAirfield = async (req, res) => {
    try {

        const { airfieldId } = req.params;

        if(!airfieldId) {
            logger.info("Delete airfield query was failed");
            return res.status(423).json(
                new ErrorResponse(
                    423,
                    "Delete airfield query was failed",
                    "Airfield Id not found",
                )
            );
        }

        const airfield = await Airfield.findById(airfieldId);   
        
        if(!airfield) {
            logger.info("Delete airfield query was failed");
            return res.status(404).json(
                new ErrorResponse(
                    404,
                    "Delete airfield query was failed",
                    "Airfield not found",
                )
            );
        }

        await Airfield.findByIdAndDelete(airfieldId);

        logger.info("Delete airfield query was successful");
        res.status(204).json(
            new SuccessResponse(
                204,
                "Delete airfield query was successful",
                "Airfield deleted successful",
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Delete airfield internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Delete airfield internal server error",
                error
            )
        );
    }
}

const createAirfield = async (req, res) => {
    try {

        const {
            airfield_code,
            country,
            airfield_category,
            icao,
            iata,
            airport_name,
            elevation,
            timezone,
            nearByCity,
            notes,
            latitude,
            longitude
        } = req.body;

        const existingAirfield = await Airfield.findOne({ airfield_code: airfield_code });
        if(existingAirfield) {
            logger.info("Create airfield query was failed");
            return res.status(423).json(
                new ErrorResponse(
                    423,
                    "Create airfield query was failed",
                    "Airfield already exists",
                )
            );
        }

        const airfield = new Airfield({
            airfield_code,
            country,
            airfield_category,
            icao,
            iata,
            airport_name,
            elevation,
            timezone,
            nearByCity,
            notes,
            latitude,
            longitude,
        });      

        const savedAirfield = await airfield.save();

        logger.info("Create airfield query was successful");
        res.status(201).json(
            new SuccessResponse(
                201,
                "Create airfield query was successful",
                savedAirfield
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Create airfield internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Create airfield internal server error",
                error
            )
        );
    }
}

const updateAirfield = async (req, res) => {
    try {

        const { airfieldId } = req.params;

        if(!airfieldId) {
            logger.info("Update airfield query was failed");
            return res.status(423).json(
                new ErrorResponse(
                    423,
                    "Update airfield query was failed",
                    "Airfield Id not found",
                )
            );
        }

        const airfield = await Airfield.findById(airfieldId);   
        
        if(!airfield) {
            logger.info("Update airfield query was failed");
            return res.status(404).json(
                new ErrorResponse(
                    404,
                    "Update airfield query was failed",
                    "Airfield not found",
                )
            );
        }

        const updatedAirfield = await Airfield.findByIdAndUpdate(airfieldId, req.body, { new: true });

        logger.info("Update airfield query was successful");
        res.status(201).json(
            new SuccessResponse(
                201,
                "Update airfield query was successful",
                updatedAirfield
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Update airfield internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Update airfield internal server error",
                error
            )
        );
    }
}

module.exports = {
    getAirfields,
    getAirfield,
    deleteAirfield,
    createAirfield,
    updateAirfield
}