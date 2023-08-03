import { PageRows } from "../models/page-rows.model";

export interface PageRowsRepository {
    find(idPage: number): Promise<PageRows[]>;
    create(page: PageRows): Promise<void>;
    update(Page: Partial<PageRows>): Promise<void>;
    delete(idPage: number, idRow: number): Promise<void>;
};