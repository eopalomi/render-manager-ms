import { PageRows } from "./page-rows.model";

export class Page {
    public readonly idPage: number;
    public readonly containerId: number;
    public readonly pageName: string;
    public readonly pageType: number;
    public readonly orderPosition: number;
    public readonly headerHeight: string;
    public readonly fieldType: string;
    public readonly fieldStyle: string;
    public readonly numberOfGrid: number;
    public readonly widthSize: string;
    public readonly headerColor: string;
    public readonly tableHeaderColor: string;
    public readonly fontHeaderColor: string;
    public readonly fonttableHeaderColor: string;
    public readonly paginator: boolean;
    public readonly showHeaderTable: boolean;
    public readonly search: boolean;
    public readonly devMode: boolean;
    public readonly tableCheck: boolean;
    public readonly pageTitle: boolean;
    public readonly tableSort: boolean;
    public readonly rows: PageRows | null;

    constructor(constructor: {
        idPage: number,
        containerId: number,
        pageName: string,
        pageType: number,
        orderPosition: number,
        headerHeight: string,
        fieldType: string,
        fieldStyle: string,
        numberOfGrid: number,
        widthSize: string,
        headerColor: string,
        tableHeaderColor: string,
        fontHeaderColor: string,
        fonttableHeaderColor: string,
        paginator: boolean,
        showHeaderTable: boolean,
        search: boolean,
        devMode: boolean,
        tableCheck: boolean,
        pageTitle: boolean,
        tableSort: boolean,
        rows: PageRows | null
    }){
        this.idPage = constructor.idPage;
        this.containerId = constructor.containerId;
        this.pageName = constructor.pageName;
        this.pageType = constructor.pageType;
        this.orderPosition = constructor.orderPosition;
        this.headerHeight = constructor.headerHeight;
        this.fieldType = constructor.fieldType;
        this.fieldStyle = constructor.fieldStyle;
        this.numberOfGrid = constructor.numberOfGrid;
        this.widthSize = constructor.widthSize;
        this.headerColor = constructor.headerColor;
        this.tableHeaderColor = constructor.tableHeaderColor;
        this.fontHeaderColor = constructor.fontHeaderColor;
        this.fonttableHeaderColor = constructor.fonttableHeaderColor;
        this.paginator = constructor.paginator;
        this.showHeaderTable = constructor.showHeaderTable;
        this.search = constructor.search;
        this.devMode = constructor.devMode;
        this.tableCheck = constructor.tableCheck;
        this.pageTitle = constructor.pageTitle;
        this.tableSort = constructor.tableSort;
        this.rows = constructor.rows;
    }
}


// async find(container_id: number): Promise<Container> {
//     const client = await this.pool.connect();

//     try {
//        const queryFindContainer = `select * from frame.tbcontai where id_contai = $1`;
//        const queryFindContainerGrid = `select * from frame.tbgridco where id_contai = $1`;
//        const queryFindPages = `select * from frame.tbpagina t where id_conten =  $1`;

//        const {rows: containerResult} = await client.query(queryFindContainer, [container_id]);

//        const {rows: gridResult} = await client.query(queryFindContainerGrid, [container_id]);
//        const {rows: pagesResult} = await client.query(queryFindPages, [container_id]);

//        const gridContainer = gridResult.map( grid => new GridContainer({
//           containerId: grid.id_contai,
//           numberOfGrid: grid.nu_gridco,
//           gridColumn: grid.va_colgri,
//           gridRow: grid.va_rowgri,
//           FlexDirection: grid.va_flexdi,
//           FlexJustifyContent: grid.va_juscon,
//           FlexAlignItems: grid.va_aligit,
//           FlexGap: grid.va_gapfle,
//        }));

//        const containerPages = pagesResult.map( page => new Page({
//           idPage: page.id_pagina,
//           containerId: page.id_conten,
//           pageName: page.no_pagina,
//           pageType: page.ti_pagina,
//           orderPosition: page.nu_ordpag,
//           headerHeight: page.va_titheight,
//           fieldType: page.ti_fieldgrid,
//           fieldStyle: page.va_inputstyl,
//           numberOfGrid: page.nu_gridco,
//           widthSize: page.va_widtpa,
//           headerColor: page.va_colhea,
//           tableHeaderColor:page.va_colhea,
//           fontHeaderColor: page.va_coltit,
//           fonttableHeaderColor: page.va_foncolhea,
//           paginator: page.il_pagtor,
//           showHeaderTable: page.il_cabtab,
//           search: page.il_search,
//           devMode: page.il_devmod,
//           tableCheck: page.il_checkb,
//           pageTitle: page.il_titpag,
//           tableSort: page.il_sortmo
//        })).sort((a, b) => a.orderPosition - b.orderPosition);;

//        return new Container({
//           id: containerResult[0].id_contai,
//           name: containerResult[0].no_contai,
//           justifyContentValue: containerResult[0].va_juscon,
//           gapValue: containerResult[0].va_grigap,
//           columns: containerResult[0].va_gricol,
//           rows: containerResult[0].va_grirow,
//           gridList: gridContainer,
//           pages: containerPages
//        })
//     } catch (error) {
//        throw new Error('No se encontro container');
//     } finally {
//        client.release();
//     }
//  };