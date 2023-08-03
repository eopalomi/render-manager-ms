import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import { containerAdpater } from './container/infrastructure/adapters/container.adapter';
import { pageRoutes } from './pages/infrastructure/routes/page.routes';
import { pageRowsRoutes } from './pages/infrastructure/routes/page-row.routes';

const app = express();

dotenv.config({path:'.env.'+process.env.NODE_ENV});

const port = process.env.PORT;

app.use(express.json())
app.use(cors())

//Adaptadores
containerAdpater(app);
pageRoutes(app);
pageRowsRoutes(app);

app.listen(port,()=>{
    console.log('servidor corriendo en el puerto ' + port);
});