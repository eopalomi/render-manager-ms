import { ContainerRepository } from "../domain/repositories/container-repository";



export class UpdateContainerUseCase {
    constructor(private containerRepository: ContainerRepository){}

    // updateContainer = async (
    //     {container_id, container_name, container_rows, container_columns}: 
    //     {container_id:number, container_name: string, container_rows: number, container_columns: number} 
    // ) => {
    //     await this.containerRepository.update({container_id, container_name, container_rows, container_columns});

    //     return;
    // };

}