import { Page } from "../models/page.model";

export interface PageRepository {
    find(idPage: number): Promise<Page>;
    create(page: Page): Promise<number>;
    update(Page: Partial<Page>): Promise<void>;
    delete(idPage: number): Promise<void>;
};