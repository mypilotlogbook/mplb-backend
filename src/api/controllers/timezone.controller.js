const logger = require('../../utils/logger');
const ErrorResponse = require('../../utils/ErrorResponse');
const SuccessResponse = require('../../utils/SuccessResponse');
const Timezone = require('../models/Timezone');
const validator = require('validator');

const createTimezone = async (req, res) => {
    try {
        const { timezone } = req.body;

        // Validate that timezone is a non-empty string
        if (typeof timezone !== 'string' || validator.isEmpty(timezone)) {
            return res.status(400).json({ message: 'Invalid timezone code' });
        }

        // Optionally, sanitize the timezone (escaping potential harmful characters)
        const sanitizedTimezone = validator.escape(timezone);

        const existingTimezone = await Timezone.findOne({ timezone: sanitizedTimezone });

        if(existingTimezone) {
            logger.info("Create timezone query was failed");
            return res.status(400).json(
                new ErrorResponse(
                    400,
                    "Create timezone query was failed",
                    "Created timezone already exists",
                )
            );
        }

        const newTimezone = new Timezone({
            timezone: timezone
        });

        const savedTimezone = await newTimezone.save();

        logger.info("Create timezone query was successful");
        res.status(201).json(
            new SuccessResponse(
                201,
                "Create timezone query was successful",
                savedTimezone
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Create timezone internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Create timezone internal server error",
                error
            )
        );
    }
}

const getAllTimezones = async (req, res) => {
    try {
        const timezones = await Timezone.find();

        logger.info("Get all timezones query was successful");
        res.status(200).json(
            new SuccessResponse(
                200,
                "Get all timezones query was successful",
                timezones
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Get all timezones internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Get all timezones internal server error",
                error
            )
        );
    }
}

const getTimezone = async (req, res) => {
    try {

        const { timezoneId } = req.params;

        if(!timezoneId) {
            logger.info("Get timezone query was failed");
            return res.status(423).json(
                new ErrorResponse(
                    423,
                    "Get timezone query was failed",
                    "Timezone Id not found",
                )
            );
        }

        const timezone = await Timezone.findById(timezoneId);

        if(!timezone) {
            logger.info("Get timezone query was failed");
            return res.status(404).json(
                new ErrorResponse(
                    404,
                    "Get timezone query was failed",
                    "Timezone not found",
                )
            );
        }

        logger.info("Get timezone query was successful");
        res.status(200).json(
            new SuccessResponse(
                200,
                "Get timezone query was successful",
                timezone
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Get timezone internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Get timezone internal server error",
                error
            )
        );
    }
}

const updateTimezone = async (req, res) => {
    try {

        const { timezoneId } = req.params;

        if(!timezoneId) {
            logger.info("Update timezone query was failed");
            return res.status(423).json(
                new ErrorResponse(
                    423,
                    "Update timezone query was failed",
                    "Timezone Id not found",
                )
            );
        }

        const updatedTimezone = await Timezone.findByIdAndUpdate(timezoneId, req.body, { new: true });

        if(!updatedTimezone) {
            logger.info("Update timezone query was failed");
            return res.status(404).json(
                new ErrorResponse(
                    404,
                    "Update timezone query was failed",
                    "Timezone not found",
                )
            );
        }

        logger.info("Update timezone query was successful");
        res.status(200).json(
            new SuccessResponse(
                200,
                "Update timezone query was successful",
                updatedTimezone
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Update timezone internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Update timezone internal server error",
                error
            )
        );
    }
}

const deleteTimezone = async (req, res) => {
    try {

        const { timezoneId } = req.params;

        if(!timezoneId) {
            logger.info("Delete timezone query was failed");
            return res.status(423).json(
                new ErrorResponse(
                    423,
                    "Delete timezone query was failed",
                    "Timezone Id not found",
                )
            );
        }

        const timezone = await Timezone.findById(timezoneId);
        if(!timezone) {
            logger.info("Delete timezone query was failed");
            return res.status(404).json(
                new ErrorResponse(
                    404,
                    "Delete timezone query was failed",
                    "Timezone not found",
                )
            );
        }

        await Timezone.findByIdAndDelete(timezoneId);

        logger.info("Delete timezone query was successful");
        res.status(204).json(
            new SuccessResponse(
                204,
                "Delete timezone query was successful",
                "Delete timezone query was successful",
            )
        );
    } catch (error) {
        logger.error(error);
        console.log(error);
        res.status(500).json(
            new ErrorResponse(
                500,
                "Delete timezone internal server error",
                error
            )
        );
    }
}

module.exports = {
    createTimezone,
    getAllTimezones,
    getTimezone,
    updateTimezone,
    deleteTimezone
}