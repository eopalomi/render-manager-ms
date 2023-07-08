import { Request, Response } from "express";
import { CreateContainerUseCase } from "../../application/create-container.use-case";
import { FindContainerUseCase } from "../../application/find-container.use-case";
import { UpdateContainerUseCase } from "../../application/update-container.use-case";

export class ContainerController {

    constructor(
        private createContainerUseCase: CreateContainerUseCase, 
        private findContainerUseCase: FindContainerUseCase, 
        private updateContaineruseCase: UpdateContainerUseCase
    ) { }

    createContainer = async ({ body }: Request, res: Response) => {
        try {
            const newContainer = await this.createContainerUseCase.createContainer({
                name: body.name,
                justifyContentValue: body.justifyContentValue,
                gapValue: body.gapValue,
                columns: body.gridColumns,
                rows: body.gridRows,
                gridList: body.gridList
            });

            res.status(200).json({
                status: '00',
                message: 'ok',
                container: newContainer
            })
        } catch (error) {
            console.log("error", error)
            res.status(400).json({
                status: '99',
                message: 'error'
            })
        }
    }

    findContainer = async (req: Request, res: Response) => {
        const idContainer = parseInt(req.params.id);

        try {
            const container = await this.findContainerUseCase.findContainer(idContainer);

            res.status(200).json({
                status: '00',
                message: 'ok',
                container: container
            })
        } catch (error) {
            console.log('error', error)
            res.status(400).json({
                status: '99',
                message: 'error'
            })
        };
    }

    updateContainer = async ({ body }: Request, res: Response) => {
        try {
            // await this.updateContaineruseCase.updateContainer({
            //     container_id: body.container_id,
            //     container_name: body.container_name,
            //     container_rows: body.container_rows,
            //     container_columns: body.container_columns
            // })

            res.status(200).json({
                status: '00',
                message: 'ok'
            })
        } catch (error) {
            res.status(400).json({
                status: '99',
                message: 'error'
            })
        }

    }
}