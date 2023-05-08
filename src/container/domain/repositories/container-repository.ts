import { Container } from "../model/container.model";

interface containerUpdate {
    container_id: number,
    container_name?: string,
    container_rows?: number,
    container_columns?: number
};

export interface ContainerRepository {
    find(container_id: number):Promise<Container>;
    create(container: Container):Promise<Container>;
    update(container: containerUpdate):Promise<void>;
};