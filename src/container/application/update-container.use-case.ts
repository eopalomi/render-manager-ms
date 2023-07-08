import { Container } from "../domain/model/container.model";
import { ContainerRepository } from "../domain/repositories/container-repository";

export class UpdateContainerUseCase {
    constructor(private containerRepository: ContainerRepository){}

    updateContainer = async (container: Container) => {
        return await this.containerRepository.update(container);
    };
}