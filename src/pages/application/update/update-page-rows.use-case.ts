import { PageRows } from "../../domain/models/page-rows.model";
import { PageRowAdapter } from "../../infrastructure/adapters/page-row.adapter";

export class UpdatePageRowsUseCase {
    constructor(private pageRowsPostgresRepository: PageRowAdapter){}

    updatePage = async (pageRows: Partial<PageRows>) =>{
        await this.pageRowsPostgresRepository.update(pageRows);
    };
};