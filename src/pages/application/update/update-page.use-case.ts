import { Page } from "../../domain/models/page.model";
import { PagePostgresRepository } from "../../infrastructure/adapters/page.adapter";

export class UpdatePageUseCase {
    constructor(private pagePostgresRepository: PagePostgresRepository){}

    updatePage = async (page: Partial<Page>) =>{
        await this.pagePostgresRepository.update(page);
    }
}