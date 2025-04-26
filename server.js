import express from 'express';
const app = express();
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDb from './config/db.js';
import authRoutes from './routes/authRout.js';
import dataRoutes from './routes/dataRoutes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./client/dist')))

dotenv.config();

app.use(cors({ origin: "http://localhost:5173" }));

const PORT = process.env.PORT;

connectDb();
app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,'./client/dist/index.html'));
})
app.get("/" , (req, res) =>{
    res.send('<h1>Hello</h1>')
});


// Api Routes

app.use('/api/v1/auth',authRoutes);
app.use('/api/data',dataRoutes);



app.listen(PORT, () => {
  console.log("Server started on port : 8080");
});
