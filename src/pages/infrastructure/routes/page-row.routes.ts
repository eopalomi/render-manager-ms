import express from "express";
import { PageRowAdapter } from "../adapters/page-row.adapter";
import { CreatePageRowUseCase } from "../../application/create/create-page-row.use-case";
import { FindPageRowUseCase } from "../../application/find/find-page-row.use-case";
import { UpdatePageRowsUseCase } from "../../application/update/update-page-rows.use-case";
import { PageRowsController } from "../controllers/page-row.controller";
import { DeletePageRowUseCase } from "../../application/delete/delete-page-row.use-case";


export const pageRowsRoutes = (app: express.Application) => {
    const routes = express.Router();

    const pageRowAdapter = new PageRowAdapter();
    const createPageRowUseCase = new CreatePageRowUseCase(pageRowAdapter);
    const findPageRowUseCase = new FindPageRowUseCase(pageRowAdapter);
    const updatePageRowsUseCase = new UpdatePageRowsUseCase(pageRowAdapter);
    const deletePageRowUseCase = new DeletePageRowUseCase(pageRowAdapter);
    const pageRowsController = new PageRowsController(createPageRowUseCase, findPageRowUseCase, updatePageRowsUseCase, deletePageRowUseCase);

    routes.get('/v1/page/rows/:idPage', pageRowsController.findRowsPage);
    routes.post('/v1/page/rows', pageRowsController.createPageRow);
    routes.patch('/v1/page/rows', pageRowsController.updatePageRow);
    routes.delete('/v1/page/rows/:idPage/:idRow', pageRowsController.deletePageRow);

    app.use('/render-manager',routes);
}