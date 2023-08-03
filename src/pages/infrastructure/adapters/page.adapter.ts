import { Pool } from "pg";
import { Page } from "../../domain/models/page.model";
import { PageRepository } from "../../domain/repositories/page.repository";
import { PostgresDatabase } from "../../../common/database/postgres-config";
import { query } from "express";

export class PagePostgresRepository implements PageRepository {
    private readonly pool: Pool

    constructor( ){
        this.pool = PostgresDatabase.getConnection();
    }

    async find(idPage: number): Promise<Page> {
         const client = await this.pool.connect();

      try {
         const queryFindPages = `select * from frame.tbpagina t where id_pagina = $1`;

         const {rows: pagesResult} = await client.query(queryFindPages, [idPage]);
        
         const page = pagesResult.map( page => new Page({
          idPage: page.id_pagina,
          containerId: page.id_conten,
          pageName: page.no_pagina,
          pageType: page.ti_pagina,
          orderPosition: page.nu_ordpag,
          headerHeight: page.va_titheight,
          fieldType: page.ti_fieldgrid,
          fieldStyle: page.va_inputstyl,
          numberOfGrid: page.nu_gridco,
          widthSize: page.va_widtpa,
          headerColor: page.va_coltit,
          tableHeaderColor:page.va_colhea,
          fontHeaderColor: page.va_foncoltit,
          fonttableHeaderColor: page.va_foncolhea,
          paginator: page.il_pagtor,
          showHeaderTable: page.il_cabtab,
          search: page.il_search,
          devMode: page.il_devmod,
          tableCheck: page.il_checkb,
          pageTitle: page.il_titpag,
          tableSort: page.il_sortmo,
          rows: null
         })).sort((a, b) => a.orderPosition - b.orderPosition);;

         return page[0];
      } catch (error) {
         throw new Error('No se encontro pagina');
      } finally {
         client.release();
      }
    }

    async create(page: Partial<Page>): Promise<number> {
        const client = await this.pool.connect();

        try {
            await client.query('BEGIN');

            const {rows: pageDB } = await client.query(`select (max(id_pagina) + 1) id_page from frame.tbpagina`);

            const queryInsert = `
                insert into frame.tbpagina (
                    id_pagina,
                    id_conten,
                    no_pagina,
                    ti_pagina,
                    nu_ordpag,
                    va_titheight,
                    ti_fieldgrid,
                    va_inputstyl,
                    nu_gridco,
                    va_widtpa,
                    va_coltit,
                    va_colhea,
                    va_foncoltit,
                    va_foncolhea,
                    il_pagtor,
                    il_cabtab,
                    il_search,
                    il_devmod,
                    il_checkb,
                    il_titpag,
                    il_sortmo
                ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) returning *;`
            
            const {rows} = await client.query(queryInsert,[
                pageDB[0].id_page,
                page.containerId,
                page.pageName,
                page.pageType,
                page.orderPosition,
                page.headerHeight,
                page.fieldType,
                page.fieldStyle,
                page.numberOfGrid,
                page.widthSize,
                page.headerColor,
                page.tableHeaderColor,
                page.fontHeaderColor,
                page.fonttableHeaderColor,
                page.paginator,
                page.showHeaderTable,
                page.search,
                page.devMode,
                page.tableCheck,
                page.pageTitle,
                page.tableSort
            ]);

            await client.query('COMMIT');
            
            console.log("Pagina Registrada: ", rows[0].id_pagina);
            return rows[0].id_pagina;
        } catch (error) {
            console.log("error",error)
            throw new Error('error al registrar la pagina');
        } finally {
            client.release();
        };
    }

    async update(page: Partial<Page>): Promise<void> {
        const client = await this.pool.connect();

        client.query('BEGIN');
        let queryUpdate = 'update frame.tbpagina set ';
        let paramsUpdate = [];
        let pageParams: number = 1;

        const fieldsUpdate = [
            {sqlField: 'id_pagina', value: page.idPage},
            {sqlField: 'id_conten', value: page.containerId},
            {sqlField: 'no_pagina', value: page.pageName},
            {sqlField: 'ti_pagina', value: page.pageType},
            {sqlField: 'nu_ordpag', value: page.orderPosition},
            {sqlField: 'va_titheight', value: page.headerHeight},
            {sqlField: 'ti_fieldgrid', value: page.fieldType},
            {sqlField: 'va_inputstyl', value: page.fieldStyle},
            {sqlField: 'nu_gridco', value: page.numberOfGrid},
            {sqlField: 'va_widtpa', value: page.widthSize},
            {sqlField: 'va_coltit', value: page.headerColor},
            {sqlField: 'va_colhea', value: page.tableHeaderColor},
            {sqlField: 'va_foncoltit', value: page.fontHeaderColor},
            {sqlField: 'va_foncolhea', value: page.fonttableHeaderColor},
            {sqlField: 'il_pagtor', value: page.paginator},
            {sqlField: 'il_cabtab', value: page.showHeaderTable},
            {sqlField: 'il_search', value: page.search},
            {sqlField: 'il_devmod', value: page.devMode},
            {sqlField: 'il_checkb', value: page.tableCheck},
            {sqlField: 'il_titpag', value: page.pageTitle},
            {sqlField: 'il_sortmo', value: page.tableSort},
        ];

        console.log("fieldsUpdate", fieldsUpdate)

        fieldsUpdate.forEach(field => {
            if (field.value !== null && field.value !== undefined ){
                queryUpdate += `${field.sqlField} = $${pageParams}, `;
                paramsUpdate.push(field.value);
                pageParams++;
            }
        });

        queryUpdate = queryUpdate.slice(0, -2);

        queryUpdate += ` where id_pagina = $${pageParams}`;
        paramsUpdate.push(page.idPage);
        
        await client.query(queryUpdate, paramsUpdate);
        await client.query('COMMIT');
    };

    async delete(idPage: number): Promise<void> {
        const client = await this.pool.connect();

        try {
            await client.query('BEGIN');

            const queryDeletedPage = `
                delete from frame.tbrowpag where id_pagina = $1;
            `;
            
            const queryDeletedRows = `
                delete from frame.tbpagina where id_pagina = $1;
            `;
            await client.query(queryDeletedPage, [idPage]);
            await client.query(queryDeletedRows, [idPage]);

            await client.query('COMMIT');
        } catch (error) {
            console.log("error",error)
            throw new Error('error al eliminar la fila');
        } finally {
            client.release();
        };
    };

}