import { GridContainer } from "./grid-container.model";
import { Page } from "./pages.model";

export class Container {
    public readonly id ?: number | undefined;
    public readonly name: string;
    public readonly justifyContentValue: string;
    public readonly gapValue: string;
    public readonly gridColumnsNumber: string[];
    public readonly gridRowsNumber: string[];
    public readonly gridList: any[] | null;
    public readonly pages : Page[] | null;

    constructor(constructor : {
        id: number | undefined,
        name: string,
        justifyContentValue: string,
        gapValue: string,
        gridColumnsNumber: string[],
        gridRowsNumber: string[],
        gridList: GridContainer[] | null
        pages: Page[] | null,
    }) {
        this.id = constructor.id;
        this.name = constructor.name;
        this.justifyContentValue = constructor.justifyContentValue;
        this.gapValue = constructor.gapValue;
        this.gridColumnsNumber = constructor.gridColumnsNumber;
        this.gridRowsNumber = constructor.gridRowsNumber;
        this.gridList = constructor.gridList;
        this.pages = constructor.pages;
    }
};