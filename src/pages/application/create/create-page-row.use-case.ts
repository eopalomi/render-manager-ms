import { PageRows } from "../../domain/models/page-rows.model";
import { PageRowsRepository } from "../../domain/repositories/page-rows.repository";

export class CreatePageRowUseCase {
    constructor(private pageRowsRepository: PageRowsRepository){}

    createPage = async (pageRows: PageRows): Promise<void> => {
        await this.pageRowsRepository.create(pageRows);
    };
};