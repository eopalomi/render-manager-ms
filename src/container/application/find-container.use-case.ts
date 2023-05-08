import { ContainerRepository } from "../domain/repositories/container-repository";

export class FindContainerUseCase {
    constructor(private containerRepository: ContainerRepository){}

    findContainer = async (id_container: number) => {
        return await this.containerRepository.find(id_container);
    };

}