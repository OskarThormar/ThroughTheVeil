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

import session from 'express-session';

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
});

app.use(sessionMiddleware);

import http from 'http';

const server = http.createServer(app);

import { Server } from 'socket.io';

const io = new Server(server);

io.on("connection", (socket) => {
    console.log("A client connected", socket.id);

    socket.on("client-sends-color", (data) => {

        console.log(data);
        // emits to all sockets in the io namespace
        io.emit("server-sends-color", data);

        // broadcasts to all other sockets but itself
        // socket.broadcast.emit("server-sends-color", data);

        // emits to the socket itself
        // socket.emit("server-sends-color", data);
    });

    
    socket.on("disconnect", () => {
        console.log("A client disconnected", socket.id);
    });
});

import authRouter from './routers/authRouter.js';
app.use('/api', authRouter); 

import authMiddleware from './middleware/authMiddleware.js';
import weaponRouter from './routers/weaponsRouter.js';
app.use('/api', authMiddleware, weaponRouter);        

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
server.listen(PORT, () => {
    console.log("Server is running on port", server.address().port);
});