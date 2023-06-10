export class Page {
    public readonly idPage: number;
    public readonly pageType: number;
    public readonly numberOfGrid: number;

    constructor(constructor: {idPage: number, pageType: number, numberOfGrid: number}){
        this.idPage = constructor.idPage;
        this.pageType = constructor.pageType;
        this.numberOfGrid = constructor.numberOfGrid;
    }
}