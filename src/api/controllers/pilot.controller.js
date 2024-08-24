const logger = require('../../utils/logger');
const ErrorResponse = require('../../utils/ErrorResponse');
const SuccessResponse = require('../../utils/SuccessResponse');
const PilotScheama = require('../models/Pilot');

const getAllPilots = async (req, res) => {
    try {
        const pilots = await PilotScheama.find();

        logger.info("Get all pilots query was successful");
        res.status(200).json(
            new SuccessResponse(
                200,
                "Get all pilots query was successful",
                pilots
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Get all pilots internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Get all pilots internal server error",
                error
            )
        );
    }
}

const getPilot = async (req, res) => {
    try {

        const { pilotId } = req.params;

        if(!pilotId) {
            logger.info("Get pilot query was failed");
            return res.status(423).json(
                new ErrorResponse(
                    423,
                    "Get pilot query was failed",
                    "Pilot Id not found",
                )
            );
        }

        const pilot = await PilotScheama.findById(pilotId);

        if(!pilot) {
            logger.info("Get pilot query was failed");
            return res.status(404).json(
                new ErrorResponse(
                    404,
                    "Get pilot query was failed",
                    "Pilot not found",
                )
            );
        }

        logger.info("Get pilot query was successful");
        res.status(200).json(
            new SuccessResponse(
                200,
                "Get pilot query was successful",
                pilot
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Get pilot internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Get pilot internal server error",
                error
            )
        );
    }
}

const deletePilot = async (req, res) => {
    try {

        const { pilotId } = req.params;

        if(!pilotId) {
            logger.info("Delete pilot query was failed");
            return res.status(423).json(
                new ErrorResponse(
                    423,
                    "Delete pilot query was failed",
                    "Pilot Id not found",
                )
            );
        }

        const pilot = await PilotScheama.findById(pilotId);
        if(!pilot) {
            logger.info("Delete pilot query was failed");
            return res.status(404).json(
                new ErrorResponse(
                    404,
                    "Delete pilot query was failed",
                    "Pilot not found",
                )
            );
        }

        await PilotScheama.findByIdAndDelete(pilotId);

        logger.info("Delete pilot query was successful");
        res.status(204).json(
            new SuccessResponse(
                204,
                "Delete pilot query was successful",
                "Delete pilot query was successful",
            )
        );
    } catch (error) {
        logger.error(error);
        console.log(error);
        res.status(500).json(
            new ErrorResponse(
                500,
                "Delete pilot internal server error",
                error
            )
        );
    }
}

const getAllPilotsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        if(!userId) {
            logger.info("Get pilots by userId query was failed");
            return res.status(423).json(
                new ErrorResponse(
                    423,
                    "Get pilots by userId query was failed",
                    "User Id not found",
                )
            );
        }

        const pilots = await PilotScheama.find({ userId: userId });

        logger.info("Get all pilots by userId query was successful");
        res.status(200).json(
            new SuccessResponse(
                200,
                "Get all pilots by userId query was successful",
                pilots
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Get all pilots by userId internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Get all pilots by userId internal server error",
                error
            )
        );
    }
}

const createPilot = async (req, res) => {
    try {

        const {
            image,
            fname,
            lname,
            company,
            position,
            employee_id,
            mobile,
            email,
            age,
            address,
            userId
        } = req.body;

        const pilot = new PilotScheama({
            image,
            fname,
            lname,
            company,
            position,
            employee_id,
            mobile,
            email,
            age,
            address,
            userId
        });      

        const savedPilot = await pilot.save();

        logger.info("Create pilot query was successful");
        res.status(201).json(
            new SuccessResponse(
                201,
                "Create pilot query was successful",
                savedPilot
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Create pilot internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Create pilot internal server error",
                error
            )
        );
    }
}

const updatePilot = async (req, res) => {
    try {

        const { pilotId } = req.params;

        if(!pilotId) {
            logger.info("Update pilot query was failed");
            return res.status(423).json(
                new ErrorResponse(
                    423,
                    "Update pilot query was failed",
                    "Pilot Id not found",
                )
            );
        }

        const pilot = await PilotScheama.findById(pilotId);   
        
        if(!pilot) {
            logger.info("Update pilot query was failed");
            return res.status(404).json(
                new ErrorResponse(
                    404,
                    "Update pilot query was failed",
                    "Pilot not found",
                )
            );
        }

        const updatedPilot = await PilotScheama.findByIdAndUpdate(pilotId, req.body, { new: true });

        logger.info("Update pilot query was successful");
        res.status(201).json(
            new SuccessResponse(
                201,
                "Update pilot query was successful",
                updatedPilot
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Update pilot internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Update pilot internal server error",
                error
            )
        );
    }
}

const deletePilotsByUserId = async (req, res) => {
    try {

        const { userId } = req.params;

        if(!userId) {
            logger.info("Delete Pilots by userId query was failed");
            return res.status(423).json(
                new ErrorResponse(
                    423,
                    "Delete Pilots by userId query was failed",
                    "User Id not found",
                )
            );
        }

        await PilotScheama.deleteMany({ userId: userId });   

        logger.info("Delete Pilots by userId query was successful");
        res.status(204).json(
            new SuccessResponse(
                204,
                "Delete Pilots by userId query was successful",
                "Pilots Data deleted successfully",
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Delete Pilots by userId internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Delete Pilots by userId internal server error",
                error
            )
        );
    }
}

module.exports = {
    getAllPilots,
    getPilot,
    deletePilot,
    getAllPilotsByUserId,
    createPilot,
    updatePilot,
    deletePilotsByUserId
}