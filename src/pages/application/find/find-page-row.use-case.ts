import { PagePostgresRepository } from "../../infrastructure/adapters/page.adapter";
import { PageRowAdapter } from "../../infrastructure/adapters/page-row.adapter";

export class FindPageRowUseCase {
    constructor(private pageRowPostgresRepository: PageRowAdapter){}

     findRowsPage = async (idPage: number) =>{
        return await this.pageRowPostgresRepository.find(idPage);
     }
}