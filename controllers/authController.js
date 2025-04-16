import { comparePass, hashPass } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";


export const registerController = async (req, res) => {
    try {
        console.log("Received Request:", req.body);

        // Check if Mongoose is connected before querying
        if (!userModel.db.readyState) {
            return res.status(500).send("Database not connected!");
        }

        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).send({
                success:false,
                message: "Fields cannot be empty",
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send({
                success:false,
                message: "Already registered",
            });
        }

        // Hash password and save user
        const hashedPassword = await hashPass(password);
        const user = await new userModel({
            name,
            email,
            phone,
            password: hashedPassword,
        }).save();

        console.log("User Registered:", user);
        res.status(201).send({
            success: true,
            message: "user registered successfully",
            user,
        })
    } catch (error) {
        console.error("Error in Register Controller:", error);
        res.status(500).send("Internal Server Error");
    }
};

// for login
export const loginController = async (req, res)=>{
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.send({message:"Not matched"})
        }
        const user = await userModel.findOne({email});
        if (!user) {
            return res.send({message:"email not found"})
        }
        const match = await comparePass(password,user.password);
        if (!match) {
            return res.send({message:"Invalid password"})
        }



        // token


        const token = await jwt.sign({_id:user._id},process.env.jwtsecret, {expiresIn:"7d"});
        return res.status(200).send({
            success: true,
            message: "Logged in successfully",
            user: {
              name: user.name,
              email: user.email,
              phone: user.phone,
              role: user.role,
            },
            token,
          });
    } catch (error) {
        console.log(error);
    }
};

//test controller

export const testController = (req,res)=>{
    res.send("protected route");
};


