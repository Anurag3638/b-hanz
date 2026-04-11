import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js"


export const requireSignIn = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).send({
                success: false,
                message: "Authorization header is required"
            });
        }

        const token = authorizationHeader.startsWith('Bearer ')
            ? authorizationHeader.slice(7)
            : authorizationHeader;

        const decode = jwt.verify(token, process.env.jwtsecret);
        req.user = decode;
        next();

    } catch (error) {
        return res.status(401).send({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

//admin access

export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user?._id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        if (user.role !== 1) {
            return res.status(403).send({
                success: false,
                message: "Unauthorized access"
            });
        }

        next();
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Authorization check failed"
        });
    }
};