import express from "express";
import { PagePostgresRepository } from "../repositories/page-postgres.repository";
import { CreatePageUseCase } from "../../application/create-page.use-case";
import { PageController } from "../controllers/page.controller";
import { FindPageUseCase } from "../../application/find-page.use-case";
import { UpdatePageUseCase } from "../../application/update-page.use-case";


export const pageRoutes = (app: express.Application) => {
    const routes = express.Router();

    const pageRepository = new PagePostgresRepository();
    const pageCreateuseCase = new CreatePageUseCase(pageRepository);
    const pageFindUseCase = new FindPageUseCase(pageRepository);
    const updatePageUseCase = new UpdatePageUseCase(pageRepository);
    const pageController = new PageController(pageCreateuseCase, pageFindUseCase, updatePageUseCase);

    routes.get('/page/:idPage', pageController.findPage);
    routes.post('/page', pageController.createPage);
    routes.patch('/page', pageController.updatePage);

    app.use(routes);
}