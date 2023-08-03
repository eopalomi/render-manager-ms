export class PageRows {
    public readonly rowID: number;
    public readonly idPage: number;
    public readonly rowName: string; 
    public readonly rowType: number; 
    public readonly rowLabelSize: string; 
    public readonly rowFieldSize: string; 
    public readonly rowOrder: number;

    constructor(constructor:{
        rowID: number,
        idPage: number,
        rowName: string,
        rowType: number,
        rowLabelSize: string,
        rowFieldSize: string,
        rowOrder: number,
    }){
        this.rowID = constructor.rowID;
        this.idPage = constructor.idPage;
        this.rowName = constructor.rowName;
        this.rowType = constructor.rowType;
        this.rowLabelSize = constructor.rowLabelSize;
        this.rowFieldSize = constructor.rowFieldSize;
        this.rowOrder = constructor.rowOrder;
    }
}