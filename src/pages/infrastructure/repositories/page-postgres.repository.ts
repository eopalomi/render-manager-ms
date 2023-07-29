import { Pool } from "pg";
import { Page } from "../../domain/models/page.model";
import { PageRepository } from "../../domain/repositories/page.repository";
import { PostgresDatabase } from "../../../common/database/postgres-config";

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
        console.log("pagesResult", pagesResult)
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
          headerColor: page.va_colhea,
          tableHeaderColor:page.va_colhea,
          fontHeaderColor: page.va_coltit,
          fonttableHeaderColor: page.va_foncolhea,
          paginator: page.il_pagtor,
          showHeaderTable: page.il_cabtab,
          search: page.il_search,
          devMode: page.il_devmod,
          tableCheck: page.il_checkb,
          pageTitle: page.il_titpag,
          tableSort: page.il_sortmo
         })).sort((a, b) => a.orderPosition - b.orderPosition);;

         return page[0];
      } catch (error) {
         throw new Error('No se encontro pagina');
      } finally {
         client.release();
      }
    }

    create(page: Partial<Page>): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(idPage: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}