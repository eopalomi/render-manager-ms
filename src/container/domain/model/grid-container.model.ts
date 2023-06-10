export class GridContainer {
    public readonly containerId: number;
    public readonly numberOfGrid: number;
    public readonly gridColumn: string;
    public readonly gridRow: string;
    public readonly FlexDirection: string;
    public readonly FlexJustifyContent: string;
    public readonly FlexAlignItems: string;
    public readonly FlexGap: string;
    
     constructor(constructor: {
        containerId:number,
        numberOfGrid:number,
        gridColumn:string,
        gridRow:string,
        FlexDirection:string,
        FlexJustifyContent:string,
        FlexAlignItems:string,
        FlexGap:string,
    }){
        this.containerId = constructor.containerId;
        this.numberOfGrid = constructor.numberOfGrid;
        this.gridColumn = constructor.gridColumn;
        this.gridRow = constructor.gridRow;
        this.FlexDirection = constructor.FlexDirection;
        this.FlexJustifyContent = constructor.FlexJustifyContent;
        this.FlexAlignItems = constructor.FlexAlignItems;
        this.FlexGap = constructor.FlexGap;
     }
}