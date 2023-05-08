import express from 'express';
import dotenv from 'dotenv'
import { containerAdpater } from './container/infrastructure/adapters/container.adapter';

const app = express();

dotenv.config({path:'.env.'+process.env.NODE_ENV});

const port = process.env.PORT || 4242;

app.use(express.json())

//Adaptadores
containerAdpater(app);

app.listen(port,()=>{
    console.log('servidor corriendo en el puerto ' + port);
});