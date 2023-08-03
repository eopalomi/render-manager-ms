import { Pool } from "pg";
import { Page } from "../../domain/models/page.model";
import { PageRepository } from "../../domain/repositories/page.repository";
import { PostgresDatabase } from "../../../common/database/postgres-config";
import { query } from "express";
import { PageRowsRepository } from "../../domain/repositories/page-rows.repository";
import { PageRows } from "../../domain/models/page-rows.model";

export class PageRowAdapter implements PageRowsRepository {
    private readonly pool: Pool

    constructor( ){
        this.pool = PostgresDatabase.getConnection();
    }


    async delete(idPage: number, idRow: number): Promise<void> {
        const client = await this.pool.connect();

        try {
            await client.query('BEGIN');

            const queryInsert = `
                delete from frame.tbrowpag where id_pagina = $1 and id_rowpag = $2;
            `;
            
            const {rows: rowPage} = await client.query(queryInsert, [
                idPage,
                idRow,
            ]);

            await client.query('COMMIT');
            
            console.log("Fila eliminada: ", rowPage);
        } catch (error) {
            console.log("error",error)
            throw new Error('error al eliminar la fila');
        } finally {
            client.release();
        };
    };

    async find(idPage: number): Promise<PageRows[]> {
         const client = await this.pool.connect();

      try {
         const queryFindPageRows = `select * from frame.tbrowpag t where id_pagina = $1`;

         const {rows: pagesRowsResult} = await client.query(queryFindPageRows, [idPage]);
        
         const pageRows = pagesRowsResult.map(pageRows => new PageRows({
            rowID: pageRows.id_rowpag,
            idPage: pageRows.id_pagina,
            rowName: pageRows.no_rowpag,
            rowType: pageRows.ti_rowpag,
            rowLabelSize: pageRows.va_labelsize,
            rowFieldSize: pageRows.va_fieldsize,
            rowOrder: pageRows.nu_ordrow,
         })).sort((a, b) => a.rowOrder - b.rowOrder);;

         return pageRows;
      } catch (error) {
         throw new Error('No se encontro filas de la pagina');
      } finally {
         client.release();
      }
    }

    async create(pageRows: Partial<PageRows>): Promise<void> {
        const client = await this.pool.connect();

        try {
            await client.query('BEGIN');

            const queryInsert = `
                insert into frame.tbrowpag (id_rowpag, id_pagina, no_rowpag, ti_rowpag, va_labelsize, va_fieldsize, nu_ordrow) 
                values ($1, $2, $3, $4, $5, $6, $7) returning *
            `;
            
            const {rows: rowPage} = await client.query(queryInsert, [
                pageRows.rowID,
                pageRows.idPage,
                pageRows.rowName,
                pageRows.rowType,
                pageRows.rowLabelSize,
                pageRows.rowFieldSize,
                pageRows.rowOrder
            ]);

            await client.query('COMMIT');
            
            console.log("Fila Registrada: ", rowPage[0]);
        } catch (error) {
            console.log("error",error)
            throw new Error('error al registrar la pagina');
        } finally {
            client.release();
        };
    }

    async update(pageRows: Partial<PageRows>): Promise<void> {
        const client = await this.pool.connect();

        client.query('BEGIN');
        let queryUpdate = 'update frame.tbrowpag set ';
        let paramsUpdate = [];
        let pageParams: number = 1;

        const fieldsUpdate = [
            {sqlField: 'no_rowpag', value: pageRows.rowName},
            {sqlField: 'ti_rowpag', value: pageRows.rowType},
            {sqlField: 'va_labelsize', value: pageRows.rowLabelSize},
            {sqlField: 'va_fieldsize', value: pageRows.rowFieldSize},
            {sqlField: 'nu_ordrow', value: pageRows.rowOrder},
        ];

        fieldsUpdate.forEach(field => {
            if (field.value !== null && field.value !== undefined ){
                queryUpdate += `${field.sqlField} = $${pageParams}, `;
                paramsUpdate.push(field.value);
                pageParams++;
            }
        });

        queryUpdate = queryUpdate.slice(0, -2);

        queryUpdate += ` where id_rowpag = $${pageParams}`;
        paramsUpdate.push(pageRows.rowID);
        
        await client.query(queryUpdate, paramsUpdate);
        await client.query('COMMIT');
    };

}