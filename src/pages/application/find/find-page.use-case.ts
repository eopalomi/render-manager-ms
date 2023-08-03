import { PagePostgresRepository } from "../../infrastructure/adapters/page.adapter";

export class FindPageUseCase {
    constructor(private pagePostgresRepository: PagePostgresRepository){}

     findPage = async (idPage: number) =>{
        return await this.pagePostgresRepository.find(idPage);
     }
}