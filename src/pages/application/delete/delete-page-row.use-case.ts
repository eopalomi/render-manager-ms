import { PageRows } from "../../domain/models/page-rows.model";
import { PageRowAdapter } from "../../infrastructure/adapters/page-row.adapter";

export class DeletePageRowUseCase {
    constructor(private pageRowAdapter: PageRowAdapter){}

    deletePageRow = async (idRow: number, idPage: number) =>{
        await this.pageRowAdapter.delete(idRow, idPage);
    };
};