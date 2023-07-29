import { Page } from "../models/page.model";

export interface PageRepository {
    find(idPage: number): Promise<Page>;
    create(page: Partial<Page>): Promise<void>;
    update(idPage: number): Promise<void>;
};