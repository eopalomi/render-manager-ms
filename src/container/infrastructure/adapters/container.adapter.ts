import { CreateContainerUseCase } from "../../application/create-container.use-case";
import { FindContainerUseCase } from "../../application/find-container.use-case";
import { ContainerController } from "../controller/container.controller";
import { ContainerPostgresRepository } from "../repositories/container-postgres.repository";
import express from 'express'

export const containerAdpater = (app: express.Application) => {
    const routes = express.Router();

    const postgresRepository = new ContainerPostgresRepository();

    const containerUseCase = new CreateContainerUseCase(postgresRepository);
    const findContainerUseCase = new FindContainerUseCase(postgresRepository);
    
    const containerController = new ContainerController(containerUseCase, findContainerUseCase);

    routes.post('/v1/container', containerController.createContainer);
    routes.get('/v1/container/:id', containerController.findController);
    
    app.use('/render-manager', routes);
};