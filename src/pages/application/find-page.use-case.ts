import { PagePostgresRepository } from "../infrastructure/repositories/page-postgres.repository";

export class FindPageUseCase {
    constructor(private pagePostgresRepository: PagePostgresRepository){}

     findPage = async (idPage: number) =>{
        return await this.pagePostgresRepository.find(idPage);
     }
}