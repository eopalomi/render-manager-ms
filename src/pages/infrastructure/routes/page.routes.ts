import express from "express";
import { PagePostgresRepository } from "../repositories/page-postgres.repository";
import { CreatePageUseCase } from "../../application/create-page.use-case";
import { PageController } from "../controllers/page.controller";


export const pageRoutes = (app: express.Application) => {
    const routes = express.Router();

    const pageRepository = new PagePostgresRepository();
    const pageCreateuseCase = new CreatePageUseCase(pageRepository);
    const pageController = new PageController(pageCreateuseCase);

    routes.get('/page/:idPage', pageController.getPage);

    app.use(routes);
}