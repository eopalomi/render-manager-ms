import { Pool } from 'pg';
import { Container } from "../../domain/model/container.model";
import { ContainerRepository } from "../../domain/repositories/container-repository";
import { PostgresDatabase } from "../config/postgres-config";
import { GridContainer } from '../../domain/model/grid-container.model';
import { Page } from '../../domain/model/pages.model';

export class ContainerPostgresRepository implements ContainerRepository {
   private readonly pool: Pool;

   constructor() {
      this.pool = PostgresDatabase.getConnection();
   };

   async find(container_id: number): Promise<Container> {
      const client = await this.pool.connect();

      try {
         const queryFindContainer = `select * from frame.tbcontai where id_contai = $1`;
         const queryFindContainerGrid = `select * from frame.tbgridco where id_contai = $1`;
         const queryFindPages = `select id_pagina, ti_pagina, nu_gridco, nu_ordpag, va_widtpa from frame.tbpagina t where id_conten =  $1`;

         const {rows: containerResult} = await client.query(queryFindContainer, [container_id]);

         const {rows: gridResult} = await client.query(queryFindContainerGrid, [container_id]);
         const {rows: pagesResult} = await client.query(queryFindPages, [container_id]);

         const gridContainer = gridResult.map( grid => new GridContainer({
            containerId: grid.id_contai,
            numberOfGrid: grid.nu_gridco,
            gridColumn: grid.va_colgri,
            gridRow: grid.va_rowgri,
            FlexDirection: grid.va_flexdi,
            FlexJustifyContent: grid.va_juscon,
            FlexAlignItems: grid.va_aligit,
            FlexGap: grid.va_gapfle,
         }));

         const containerPages = pagesResult.map( page => new Page({
            idPage: page.id_pagina,
            pageType:  page.ti_pagina,
            numberOfGrid: page.nu_gridco,
            pageWidth: page.va_widtpa,
            pageOrder: page.nu_ordpag
         })).sort((a, b) => a.pageOrder - b.pageOrder);;

         return new Container({
            id: containerResult[0].id_contai,
            name: containerResult[0].no_contai,
            justifyContentValue: containerResult[0].va_juscon,
            gapValue: containerResult[0].va_grigap,
            columns: containerResult[0].va_gricol,
            rows: containerResult[0].va_grirow,
            gridList: gridContainer,
            pages: containerPages
         })
      } catch (error) {
         throw new Error('No se encontro container');
      } finally {
         client.release();
      }
   };

   async create(container: Partial<Container>): Promise<number> {
      const client = await this.pool.connect();

      try {
         const queryReserveID = `select nextval('frame.id_contai')`;
         const queryInsertContainer = `insert into frame.tbcontai (id_contai, no_contai, va_juscon, va_grigap, va_gricol, va_grirow) values ($1,$2,$3,$4,$5,$6) returning *`;
         const queryInsertGridContainer = `insert into frame.tbgridco (id_contai, nu_gridco, va_colgri, va_rowgri, va_flexdi, va_juscon, va_aligit, va_gapfle) VALUES($1,$2,$3,$4,$5,$6,$7,$8)`;

         await client.query('BEGIN');

         const { rows: [idContainer] } =  await client.query(queryReserveID);
         const containerColumns = `{ ${ Array(container.columns).fill('auto').join(',')} }`;
         const containerRows = `{ ${ Array(container.rows).fill('auto').join(',')} }`;

         const result = await client.query(queryInsertContainer, [
            idContainer.nextval, 
            container.name, 
            container.justifyContentValue, 
            container.gapValue, 
            containerColumns, 
            containerRows
         ]);

         container.gridList?.forEach(async (val, idx)=>
            await client.query(queryInsertGridContainer,[
               idContainer.nextval,
               val.numberOfGrid,
               val.gridColumn,
               val.gridRow,
               val.FlexDirection,
               val.FlexJustifyContent,
               val.FlexAlignItems,
               val.FlexGap
            ])
         )
         
         await client.query('COMMIT');

         return parseInt(result.rows[0].id_contai);
      } catch (error: any) {
         await client.query('ROLLBACK');
         throw new Error(error);
      }
      finally {
         client.release();
      }
   };

   async update(container: Partial<Container>): Promise<void> {
      const { id, name, justifyContentValue, gapValue, columns, rows, gridList } = container
      const client = await this.pool.connect();

      try {
         await client.query('BEGIN');

         /* UPDATE CONTAINER */
         let queryUpdateContainer = `update frame.tbcontai set `;
         let paramsUpdateContainer = [];
         let containerParams: number = 1;

         const containerSQLProperties = [
            { name: 'no_contai', value: name},
            { name: 'va_juscon', value: justifyContentValue},
            { name: 'va_grigap', value: gapValue},
            { name: 'va_gricol', value:  `{${Array(container.columns).fill('auto').join(',')}}`},
            { name: 'va_grirow', value: `{${Array(container.rows).fill('auto').join(',')}}`},
         ];

         containerSQLProperties.forEach((container)=>{
            if (container.value){
               queryUpdateContainer += `${container.name} = $${containerParams}, `;
               paramsUpdateContainer.push(container.value)
               containerParams++;
            }
         })

         queryUpdateContainer = queryUpdateContainer.slice(0, -2);

         queryUpdateContainer += ` where id_contai = $${containerParams}`;
         paramsUpdateContainer.push(id)

         await client.query(queryUpdateContainer, paramsUpdateContainer);
         
         /* UPDATE GRIDS */
         gridList?.forEach(async (grid)=> {
            let queryUpdateGrid = `update frame.tbgridco set `;
            let paramsUpdateGrid: any = [];
            let paramNumber: number = 1;
            
            const gridSQLProperties = [
               { name: 'va_colgri', value: grid.gridColumn},
               { name: 'va_rowgri', value: grid.gridRow},
               { name: 'va_flexdi', value: grid.FlexDirection},
               { name: 'va_juscon', value: grid.FlexJustifyContent},
               { name: 'va_aligit', value: grid.FlexAlignItems},
               { name: 'va_gapfle', value: grid.FlexGap}
            ];

            gridSQLProperties.forEach((sqlProperties)=>{
               if (sqlProperties.value){
                  queryUpdateGrid += `${sqlProperties.name} = $${paramNumber}, `;
                  paramsUpdateGrid.push(sqlProperties.value)
                  paramNumber++;
               }
            })

            queryUpdateGrid = queryUpdateGrid.slice(0, -2);
            
            queryUpdateGrid += ` where id_contai = $${paramNumber} and nu_gridco = $${paramNumber+1};`;
            paramsUpdateGrid.push(id, grid.numberOfGrid);
            
            await client.query(queryUpdateGrid, paramsUpdateGrid)
         })

         await client.query('COMMIT');
      } catch (error) {
         console.log(error)
         throw new Error("error updating");
      } finally {
         client.release();
      }
   };
}