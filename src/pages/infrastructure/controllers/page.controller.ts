import { Request, Response } from "express";
import { CreatePageUseCase } from "../../application/create/create-page.use-case";
import { FindPageUseCase } from "../../application/find/find-page.use-case";
import { Page } from "../../domain/models/page.model";
import { UpdatePageUseCase } from "../../application/update/update-page.use-case";
import { DeletePageUseCase } from "../../application/delete/delete-page.use-case";

export class PageController {
    constructor(
        private createPageUseCase: CreatePageUseCase, 
        private findPageUseCase: FindPageUseCase,
        private updatePageUseCase: UpdatePageUseCase,
        private deletePageUseCase: DeletePageUseCase,
        ){}

    findPage = async (req: Request, res: Response) => {
        const {idPage} = req.params;
        
        try {
            const page = await this.findPageUseCase.findPage(parseInt(idPage));

            res.status(200).json({
                statusCode:'00',
                data: page
            })
        } catch (error) {
            throw new Error("pagina no encontrada");
        }
    };

    createPage = async (req: Request, res: Response) => {
        try {
            const {
                idPage,
                containerId,
                pageName,
                pageType,
                orderPosition,
                headerHeight,
                fieldType,
                fieldStyle,
                numberOfGrid,
                widthSize,
                headerColor,
                tableHeaderColor,
                fontHeaderColor,
                fonttableHeaderColor,
                paginator,
                showHeaderTable,
                search,
                devMode,
                tableCheck,
                pageTitle,
                tableSort
            } = req.body;
            
            const page = new Page({
                idPage,
                containerId,
                pageName,
                pageType,
                orderPosition,
                headerHeight,
                fieldType,
                fieldStyle,
                numberOfGrid,
                widthSize,
                headerColor,
                tableHeaderColor,
                fontHeaderColor,
                fonttableHeaderColor,
                paginator,
                showHeaderTable,
                search,
                devMode,
                tableCheck,
                pageTitle,
                tableSort,
                rows: null
            });

            const pageID = await this.createPageUseCase.createPage(page);

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

            throw new Error("pagina no creada");
        }
    };

    updatePage = async (req: Request, res: Response) => {
        try {
            const {
                idPage,
                containerId,
                pageName,
                pageType,
                orderPosition,
                headerHeight,
                fieldType,
                fieldStyle,
                numberOfGrid,
                widthSize,
                headerColor,
                tableHeaderColor,
                fontHeaderColor,
                fonttableHeaderColor,
                paginator,
                showHeaderTable,
                search,
                devMode,
                tableCheck,
                pageTitle,
                tableSort,
                rows
            } = req.body;

            const page = new Page({
                idPage,
                containerId,
                pageName,
                pageType,
                orderPosition,
                headerHeight,
                fieldType,
                fieldStyle,
                numberOfGrid,
                widthSize,
                headerColor,
                tableHeaderColor,
                fontHeaderColor,
                fonttableHeaderColor,
                paginator,
                showHeaderTable,
                search,
                devMode,
                tableCheck,
                pageTitle,
                tableSort,
                rows: null
            });

            this.updatePageUseCase.updatePage(page);

            res.status(200).json({
                statusCode:'00',
                data: page
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

    deletePage = async (req: Request, res: Response) => {
        try {
            const {idPage} = req.params;

            this.deletePageUseCase.deletePage(+idPage);

            res.status(200).json({
                statusCode:'00'
            })
        } catch (error) {
            console.log(error);
            
            res.status(400).json({
                statusCode:'00',
                error
            });

            throw new Error("Error delete page");
        }
    };

}