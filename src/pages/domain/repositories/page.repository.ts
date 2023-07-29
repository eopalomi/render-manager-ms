import { Page } from "../models/page.model";

export interface PageRepository {
    find(idPage: number): Promise<Page>;
    create(page: Page): Promise<void>;
    update(Page: Partial<Page>): Promise<void>;
};