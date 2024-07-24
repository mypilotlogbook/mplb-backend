const logger = require('../../utils/logger');
const ErrorResponse = require('../../utils/ErrorResponse');
const SuccessResponse = require('../../utils/SuccessResponse');
const validator = require('validator');
const UserScheama = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate that email is a non-empty string
        if (typeof email !== 'string' || validator.isEmpty(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }
        // Validate that password is a non-empty string
        if (typeof password !== 'string' || validator.isEmpty(password)) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Optionally, sanitize the email (escaping potential harmful characters)
        const sanitizedEmail = validator.escape(email);
        // Optionally, sanitize the password (escaping potential harmful characters)
        const sanitizedPassword = validator.escape(password);

        const existingUser = await UserScheama.findOne({ email: sanitizedEmail });

        if(existingUser) {
            logger.info("Register user query was failed");
            return res.status(400).json(
                new ErrorResponse(
                    400,
                    "Register user query was failed",
                    "User already exists",
                )
            );
        }

        const salt = await  bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(sanitizedPassword, salt);

        const newUser = new UserScheama({
            email: sanitizedEmail,
            password: hashPassword,
        });

        const savedUser = await newUser.save();  

        logger.info("Register user query was successful");
        res.status(201).json(
            new SuccessResponse(
                201,
                "Register user query was successful",
                savedUser
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Rregister user internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Rregister user internal server error",
                error
            )
        );
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await UserScheama.find();

        logger.info("Get all users query was successful");
        res.status(200).json(
            new SuccessResponse(
                200,
                "Get all users query was successful",
                users
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Get all users internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Get all users internal server error",
                error
            )
        );
    }
}

const getUser = async (req, res) => {
    try {

        const { userId } = req.params;

        if(!userId) {
            logger.info("Get user query was failed");
            return res.status(423).json(
                new ErrorResponse(
                    423,
                    "Get user query was failed",
                    "User Id not found",
                )
            );
        }

        const user = await UserScheama.findById(userId);

        if(!user) {
            logger.info("Get user query was failed");
            return res.status(404).json(
                new ErrorResponse(
                    404,
                    "Get user query was failed",
                    "User not found",
                )
            );
        }

        logger.info("Get user query was successful");
        res.status(200).json(
            new SuccessResponse(
                200,
                "Get user query was successful",
                user
            )
        );
    } catch (error) {
        logger.error(error);
        logger.error("Get user internal server error");
        res.status(500).json(
            new ErrorResponse(
                500,
                "Get user internal server error",
                error
            )
        );
    }
}

const deleteUser = async (req, res) => {
    try {

        const { userId } = req.params;

        if(!userId) {
            logger.info("Delete user query was failed");
            return res.status(423).json(
                new ErrorResponse(
                    423,
                    "Delete user query was failed",
                    "User Id not found",
                )
            );
        }

        const user = await UserScheama.findById(userId);
        if(!user) {
            logger.info("Delete user query was failed");
            return res.status(404).json(
                new ErrorResponse(
                    404,
                    "Delete user query was failed",
                    "User not found",
                )
            );
        }

        await UserScheama.findByIdAndDelete(userId);

        logger.info("Delete user query was successful");
        res.status(204).json(
            new SuccessResponse(
                204,
                "Delete user query was successful",
                "Delete user query was successful",
            )
        );
    } catch (error) {
        logger.error(error);
        console.log(error);
        res.status(500).json(
            new ErrorResponse(
                500,
                "Delete user internal server error",
                error
            )
        );
    }
}

const updateUser = async (req, res) => {
    try {

        const { userId } = req.params;

        if(!userId) {
            logger.info("Update user query was failed");
            return res.status(423).json(
                new ErrorResponse(
                    423,
                    "Update user query was failed",
                    "User Id not found",
                )
            );
        }

        const user = await UserScheama.findById(userId);
        if(!user) {
            logger.info("Update user query was failed");
            return res.status(404).json(
                new ErrorResponse(
                    404,
                    "Update user query was failed",
                    "User not found",
                )
            );
        }

        const updatedUser = await UserScheama.findByIdAndUpdate(userId, req.body, { new: true });

        logger.info("Update user query was successful");
        res.status(201).json(
            new SuccessResponse(
                201,
                "Update user query was successful",
                updatedUser
            )
        );
    } catch (error) {
        logger.error(error);
        console.log(error);
        res.status(500).json(
            new ErrorResponse(
                500,
                "Update user internal server error",
                error
            )
        );
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate that email is a non-empty string
        if (typeof email !== 'string' || validator.isEmpty(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }
        // Validate that password is a non-empty string
        if (typeof password !== 'string' || validator.isEmpty(password)) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Optionally, sanitize the email (escaping potential harmful characters)
        const sanitizedEmail = validator.escape(email);
        // Optionally, sanitize the password (escaping potential harmful characters)
        const sanitizedPassword = validator.escape(password);

        const salt = await  bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(sanitizedPassword, salt);

        const updatedUser = await UserScheama.updateOne({ email: sanitizedEmail }, { $set: { password: hashPassword }}, { new: true });

        logger.info("Forgot password query was successful");
        res.status(201).json(
            new SuccessResponse(
                201,
                "Forgot password query was successful",
                updatedUser
            )
        );
    } catch (error) {
        logger.error(error);
        console.log(error);
        res.status(500).json(
            new ErrorResponse(
                500,
                "Forgot password internal server error",
                error
            )
        );
    }
}

const loginUser = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate that email is a non-empty string
        if (typeof email !== 'string' || validator.isEmpty(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        // Optionally, sanitize the email (escaping potential harmful characters)
        const sanitizedEmail = validator.escape(email);

        const user = await UserScheama.findOne({ email: sanitizedEmail });
        if (!user){ 
            logger.error("Email not found"); 
            return res.status(404).json(
                new ErrorResponse(
                    400,
                    "User login query was failed",
                    "Email not found"
                )
            );
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword){
            return res.status(400).json(
                new ErrorResponse(
                    400,
                    "User login query was failed",
                    "Password not found"
                )
            );
        }

        const { password, ...others } = user._doc;

        const token = jwt.sign({ id: user._id }, 'privateKey');

        return res.status(200).json(
            new SuccessResponse(
                200,
                "User login query was successful",
                {
                    ...others,
                    token
                }
            )
        ); 

    } catch (error) {
        logger.error(error);
        console.log(error);
        res.status(500).json(
            new ErrorResponse(
                500,
                "Login user internal server error",
                error
            )
        );
    }
}

module.exports = {
    registerUser,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    forgotPassword,
    loginUser
}