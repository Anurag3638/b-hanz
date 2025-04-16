import express from 'express';
const app = express();
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDb from './config/db.js';
import authRoutes from './routes/authRout.js';
import dataRoutes from './routes/dataRoutes.js';
import cors from 'cors';


// const product = require("./model/model.js");
// const user = require("./model/user.js");
// const { findOne } = require("./model/user.js");
app.use(express.json());
app.use(morgan('dev'));

dotenv.config();

app.use(cors({ origin: "http://localhost:5173" }));

const PORT = process.env.PORT;

connectDb();

app.get("/" , (req, res) =>{
    res.send('<h1>Hello</h1>')
});


// Api Routes

app.use('/api/v1/auth',authRoutes);
app.use('/api/data',dataRoutes);


// app.use(express.urlencoded({ extended: false }));

// app.get("/", async (req, res) => {
//   const data = await product.find().limit(10).lean();
//   res.render("index", { data });
// });

// app.get("/api/v/products", (req, res) => {
//   res.sendFile(join(staticWebsiteFolder, "addproduct.html"));
// });

// app.post("/api/v/products", async (req, res) => {
//   try {
//     console.log(req.body);
//     const newProduct = new product({
//       name: req.body.name,
//       image: req.body.image,
//       countInStock: req.body.countInStock,
//       price: req.body.price,
//     });
//     const postData = await newProduct.save();
//     console.log(postData);
//     res.sendFile(join(staticWebsiteFolder, "addproduct.html"));
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred while saving the user data.");
//   }
// });

// app.get("/next", async (req, res) => {
//   try {
//     const page = Number(req.query.page) || 1;
//     const nextData = await product
//       .find()
//       .skip((page - 1) * 10)
//       .limit(10)
//       .lean();
//     let nextPage = page + 1;
//     let prevPage = page - 1;
//     res.render("pages", { nextData, nextPage, prevPage });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred while fetching the data.");
//   }
// });

// app.get("/signup", (req, res) => {
//   res.sendFile(join(staticWebsiteFolder, "signup.html"));
// });

// app.post("/signup", async (req, res) => {
//   try {
//     // Create a new user document
//     const newUser = new user({
//       username: req.body.username,
//       email: req.body.email,
//       phone: req.body.phone,
//       password: req.body.password,
//     });

//     // Save the new user document to the database
//     const userData = await newUser.save();

//     console.log(userData);
//     res.render("index"); // or any other response as needed
//   } catch (error) {
//     // Check if the error is due to duplicate key
//     if (error.code === 11000 && error.keyPattern.name === 1) {
//       console.error("Duplicate key error: Name already exists.");
//       res.status(400).send(error);
//     } else {
//       console.error(error);
//       res.status(500).send("An error occurred while saving the user data.");
//     }
//   }
// });

// app.get("/login", (req, res) => {
//   res.sendFile(join(staticWebsiteFolder, "login.html"));
// });

// app.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Check if a user with the provided email and password exists
//     const checkuser = await user.findOne({ username, password });
//     if (!checkuser) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }
//     const data = await product.find().limit(10).lean();
//     // If the email and password are correct, send a success response
//     res.render("userlogged", { username, data });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });



app.listen(PORT, () => {
  console.log("Server started on port : 8080");
});
