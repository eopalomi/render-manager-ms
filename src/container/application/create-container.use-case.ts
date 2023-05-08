import { Container } from "../domain/model/container.model";
import { ContainerRepository } from "../domain/repositories/container-repository";

interface ContainerDTO  {
    container_id?: number,
    container_name: string,
    container_rows: number,
    container_columns: number,
    container_pages: object[]
};

export class CreateContainerUseCase {
    constructor(private containerRepository: ContainerRepository){};

    createContainer = async (containerParams: ContainerDTO) => {
         const container = new Container(
            containerParams.container_id,
            containerParams.container_name,
            containerParams.container_rows,
            containerParams.container_columns,
            containerParams.container_pages
        );

        return await this.containerRepository.create(container);
    };


}