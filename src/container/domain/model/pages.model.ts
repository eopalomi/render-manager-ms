export class Page {
    public readonly idPage: number;
    public readonly pageType: number;
    public readonly numberOfGrid: number;
    public readonly pageOrder: number;
    public readonly pageWidth: string;

    constructor(constructor: {idPage: number, pageType: number, numberOfGrid: number, pageOrder: number, pageWidth: string}){
        this.idPage = constructor.idPage;
        this.pageType = constructor.pageType;
        this.numberOfGrid = constructor.numberOfGrid;
        this.pageOrder = constructor.pageOrder;
        this.pageWidth = constructor.pageWidth;
    }
}