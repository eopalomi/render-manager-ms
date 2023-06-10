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
         const queryFindPages = `select id_pagina, ti_pagina, nu_gridco from frame.tbpagina t where id_conten =  $1`;

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
            numberOfGrid: page.nu_gridco
         }));

         return new Container({
            id: containerResult[0].id_contai,
            name: containerResult[0].no_contai,
            justifyContentValue: containerResult[0].va_juscon,
            gapValue: containerResult[0].va_grigap,
            gridColumnsNumber: containerResult[0].va_gricol,
            gridRowsNumber: containerResult[0].va_grirow,
            gridList: gridContainer,
            pages: containerPages
         })
      } catch (error) {
         throw new Error('No se encontro container');
      } finally {
         client.release();
      }
   };

   async create(container: Container): Promise<void> {
      const client = await this.pool.connect();

      try {
         const query = `insert into frame.tbcontai (id_contai, no_contai, nu_rowcon, nu_colcon) values (default, $1, $2, $3) returning *`;

         await client.query('BEGIN');
         //const queryResult = await client.query(query, [container.container_name, container.container_rows, container.container_columns]);
         await client.query('COMMIT');
      } catch (error: any) {
         await client.query('ROLLBACK');
         throw new Error(error);
      }
      finally {
         client.release();
      }
   };

   async update(container: any): Promise<void> {
      const client = await this.pool.connect();

      try {
         await client.query('BEGIN');

         let query = `update frame.tbcontai set `;
         let params = [];

         if (container.container_name) {
            query += 'no_contai = $1, ';
            params.push(container.container_name)
         };

         if (container.container_rows) {
            query += 'nu_rowcon = $2, ';
            params.push(container.container_rows)
         };

         if (container.container_columns) {
            query += 'nu_colcon = $3, ';
            params.push(container.container_columns)
         };

         query = query.slice(0, -2);

         query += ' where id_contai = $4;';
         params.push(container.container_id)

         client.query(query, params);

         await client.query('COMMIT');
      } catch (error) {
         console.log(error)
         throw new Error("error updating");
      } finally {
         client.release();
      }
   };
}