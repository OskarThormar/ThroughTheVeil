import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

app.use(express.static("client"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

import cors from 'cors';
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));



import weaponRouter from './routers/weaponsRouter.js';
app.use('/api', weaponRouter);       
import armorRouter from './routers/armorRouter.js';
app.use('/api', armorRouter);       

import professionMaterialsBotanicalRouter from './routers/professions/professionMaterialsBotanicalRouter.js';
app.use('/api', professionMaterialsBotanicalRouter);
import professionMaterialsSkinningRouter from './routers/professions/professionMaterialsSkinningRouter.js';
app.use('/api', professionMaterialsSkinningRouter);
import professionMaterialsDropRouter from './routers/professions/professionMaterialsDropRouter.js';
app.use ('/api', professionMaterialsDropRouter);
import professionMaterialsVendorRouter from './routers/professions/professionMaterialsVendorRouter.js';
app.use ('/api', professionMaterialsVendorRouter);

import classesRouter from './routers/classesRouter.js';
app.use('/api', classesRouter);
import specializationsRouter from './routers/specializationsRouter.js';
app.use('/api', specializationsRouter);

import druidStatsRouter from './routers/services/druid/druidStatsRouter.js';
app.use('/api', druidStatsRouter);
import druidDamageRouter from './routers/services/druid/druidDamageRouter.js';
app.use('/api', druidDamageRouter);




const PORT = Number(process.env.PORT) || 8080;
const server = app.listen(PORT, () => {
    console.log("Server is running on port", server.address().port);
});