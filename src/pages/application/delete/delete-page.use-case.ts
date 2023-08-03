import { PagePostgresRepository } from "../../infrastructure/adapters/page.adapter";

export class DeletePageUseCase {
    constructor(private pagePostgresRepository: PagePostgresRepository){}

    deletePage = async (idRow: number) =>{
        await this.pagePostgresRepository.delete(idRow);
    };
};