import { GridContainer } from "./grid-container.model";
import { Page } from "./pages.model";

export class Container {
    public readonly id ?: number | undefined;
    public readonly name: string;
    public readonly justifyContentValue: string;
    public readonly gapValue: string;
    public readonly columns: number;
    public readonly rows: number;
    public readonly gridList: GridContainer[] | null;
    public readonly pages ?: Page[] | null;

    constructor(constructor : {
        id?: number | undefined,
        name: string,
        justifyContentValue: string,
        gapValue: string,
        columns: number,
        rows: number,
        gridList: GridContainer[] | null
        pages?: Page[] | null,
    }) {
        this.id = constructor.id;
        this.name = constructor.name;
        this.justifyContentValue = constructor.justifyContentValue;
        this.gapValue = constructor.gapValue;
        this.columns = constructor.columns;
        this.rows = constructor.rows;
        this.gridList = constructor.gridList;
        this.pages = constructor.pages;
    }
};