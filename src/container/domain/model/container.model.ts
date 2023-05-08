export class Container {
    public readonly container_id ?: number | undefined;
    public readonly container_name: string;
    public readonly container_rows: number;
    public readonly container_columns: number;
    public readonly container_pages ?: object[];

    constructor(
        container_id: number | undefined,
        container_name: string,
        container_rows: number,
        container_columns: number,
        container_pages: object[] | undefined
    ) {
        this.container_id = container_id;
        this.container_name = container_name;
        this.container_rows = container_rows;
        this.container_columns = container_columns;
        this.container_pages = container_pages;
    }
};