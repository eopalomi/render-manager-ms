import { Page } from "../domain/models/page.model";
import { PageRepository } from "../domain/repositories/page.repository";

export class CreatePageUseCase {
    constructor(private pageRepository: PageRepository){}

    createPage = async (page: Page) => {
        return await this.pageRepository.create(page);
    }
}