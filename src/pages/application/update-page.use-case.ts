import { Page } from "../domain/models/page.model";
import { PagePostgresRepository } from "../infrastructure/repositories/page-postgres.repository";

export class UpdatePageUseCase {
    constructor(private pagePostgresRepository: PagePostgresRepository){}

    updatePage = async (page: Partial<Page>) =>{
        await this.pagePostgresRepository.update(page);
    }
}