import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

app.use(express.static("public"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

import cors from 'cors';
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));



import weaponRouter from './routers/weaponsRouter.js';
app.use('/weapons', weaponRouter);       
import armorRouter from './routers/armorsRouter.js';
app.use('/armors', armorRouter);       

import classesRouter from './routers/classesRouter.js';
app.use('/classes', classesRouter);
import specializationsRouter from './routers/specializationsRouter.js';
app.use('/specializations', specializationsRouter);



const PORT = Number(process.env.PORT) || 8080;
const server = app.listen(PORT, () => {
    console.log("Server is running on port", server.address().port);
});