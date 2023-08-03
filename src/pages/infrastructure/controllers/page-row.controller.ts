import { Request, Response } from "express";
import { CreatePageUseCase } from "../../application/create/create-page.use-case";
import { FindPageUseCase } from "../../application/find/find-page.use-case";
import { Page } from "../../domain/models/page.model";
import { UpdatePageUseCase } from "../../application/update/update-page.use-case";
import { CreatePageRowUseCase } from "../../application/create/create-page-row.use-case";
import { FindPageRowUseCase } from "../../application/find/find-page-row.use-case";
import { UpdatePageRowsUseCase } from "../../application/update/update-page-rows.use-case";
import { PageRows } from "../../domain/models/page-rows.model";
import { DeletePageRowUseCase } from "../../application/delete/delete-page-row.use-case";

export class PageRowsController {
    constructor(
        private createPageRowUseCase: CreatePageRowUseCase, 
        private findPageRowUseCase: FindPageRowUseCase,
        private updatePageRowsUseCase: UpdatePageRowsUseCase,
        private deletePageRowUseCase: DeletePageRowUseCase,
        ){}

    findRowsPage = async (req: Request, res: Response) => {
        const {idPage} = req.params;
        
        try {
            const pageRows = await this.findPageRowUseCase.findRowsPage(parseInt(idPage));

            res.status(200).json({
                statusCode:'00',
                data: pageRows
            })
        } catch (error) {
            throw new Error("filas de pagina no encontrada");
        }
    };

    createPageRow = async (req: Request, res: Response) => {
        try {
            const {
                rowID,
                idPage,
                rowName,
                rowType,
                rowLabelSize,
                rowFieldSize,
                rowOrder,
            } = req.body;
            
            const page = new PageRows({
                rowID,
                idPage,
                rowName,
                rowType,
                rowLabelSize,
                rowFieldSize,
                rowOrder,
            });

            const pageID = await this.createPageRowUseCase.createPage(page);

            res.status(200).json({
                statusCode:'00',
                pageID
            })
        } catch (error: any) {
            console.log(error);
            
            res.status(400).json({
                statusCode:'00',
                error
            });
        }
    };

    updatePageRow = async (req: Request, res: Response) => {
        try {
            const {
                rowID,
                idPage,
                rowName,
                rowType,
                rowLabelSize,
                rowFieldSize,
                rowOrder,
            } = req.body;

            const pageRows = new PageRows({
                rowID,
                idPage,
                rowName,
                rowType,
                rowLabelSize,
                rowFieldSize,
                rowOrder,
            });

            this.updatePageRowsUseCase.updatePage(pageRows);

            res.status(200).json({
                statusCode:'00',
                data: pageRows
            })
        } catch (error) {
            console.log(error);
            
            res.status(400).json({
                statusCode:'00',
                error
            });

            throw new Error("Error update");
        }
    };

    deletePageRow = async (req: Request, res: Response) => {
        try {
            const {idPage, idRow} = req.params;

            this.deletePageRowUseCase.deletePageRow(+idPage, +idRow);

            res.status(200).json({
                statusCode:'00'
            })
        } catch (error) {
            console.log(error);
            
            res.status(400).json({
                statusCode:'00',
                error
            });

            throw new Error("Error update");
        }
    };
    
}