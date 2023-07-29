import { Request, Response } from "express";
import { CreatePageUseCase } from "../../application/create-page.use-case";

export class PageController {
    constructor(private createPageUseCase: CreatePageUseCase){}

    getPage = async (req: Request, res: Response) => {
        const {idPage} = req.params;
        
        try {
            const page = await this.createPageUseCase.findPage(parseInt(idPage));

            res.status(200).json({
                statusCode:'00',
                data: page
            })
        } catch (error) {
            throw new Error("pagina no encontrada");
        }
    }
}