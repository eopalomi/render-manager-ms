import { CreateContainerUseCase } from "../../application/create-container.use-case";
import { FindContainerUseCase } from "../../application/find-container.use-case";
import { UpdateContainerUseCase } from "../../application/update-container.use-case";
import { ContainerController } from "../controller/container.controller";
import { ContainerPostgresRepository } from "../repositories/container-postgres.repository";
import express from 'express'

export const containerAdpater = (app: express.Application) => {
    const routes = express.Router();

    const postgresRepository = new ContainerPostgresRepository();

    const containerUseCase = new CreateContainerUseCase(postgresRepository);
    const findContainerUseCase = new FindContainerUseCase(postgresRepository);
    const updateContainerUseCase = new UpdateContainerUseCase(postgresRepository);
    
    const containerController = new ContainerController(containerUseCase, findContainerUseCase, updateContainerUseCase);

    routes.post('/v1/container', containerController.createContainer);
    routes.patch('/v1/container', containerController.updateContainer);
    routes.get('/v1/container/:id', containerController.findContainer);
    
    app.use('/render-manager', routes);
};