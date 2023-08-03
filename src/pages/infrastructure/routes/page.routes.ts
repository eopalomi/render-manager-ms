import express from "express";
import { PagePostgresRepository } from "../adapters/page.adapter";
import { CreatePageUseCase } from "../../application/create/create-page.use-case";
import { PageController } from "../controllers/page.controller";
import { FindPageUseCase } from "../../application/find/find-page.use-case";
import { UpdatePageUseCase } from "../../application/update/update-page.use-case";
import { DeletePageUseCase } from "../../application/delete/delete-page.use-case";


export const pageRoutes = (app: express.Application) => {
    const routes = express.Router();

    const pageRepository = new PagePostgresRepository();
    const pageCreateuseCase = new CreatePageUseCase(pageRepository);
    const pageFindUseCase = new FindPageUseCase(pageRepository);
    const updatePageUseCase = new UpdatePageUseCase(pageRepository);
    const deletePageUseCase = new DeletePageUseCase(pageRepository);
    const pageController = new PageController(pageCreateuseCase, pageFindUseCase, updatePageUseCase, deletePageUseCase);

    routes.get('/v1/page/:idPage', pageController.findPage);
    routes.post('/v1/page', pageController.createPage);
    routes.patch('/v1/page', pageController.updatePage);
    routes.delete('/v1/page/:idPage', pageController.deletePage);

    app.use('/render-manager',routes);
}