import { Container } from "../model/container.model";

export interface ContainerRepository {
    find(container_id: number): Promise<Container>;
    create(container: Container): Promise<number>;
    update(container: Partial<Container>): Promise<void>;
};