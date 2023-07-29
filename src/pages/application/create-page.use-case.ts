import { PageRepository } from "../domain/repositories/page.repository";

export class CreatePageUseCase {
    constructor(private pageRepository: PageRepository){}

    findPage = async (idPage: number) => {
        return this.pageRepository.find(idPage);
    }
}