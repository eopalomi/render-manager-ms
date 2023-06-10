import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import { containerAdpater } from './container/infrastructure/adapters/container.adapter';

const app = express();

dotenv.config({path:'.env.'+process.env.NODE_ENV});

const port = process.env.PORT || 4242;

app.use(express.json())
app.use(cors())

//Adaptadores
containerAdpater(app);

app.listen(port,()=>{
    console.log('servidor corriendo en el puerto ' + port);
});