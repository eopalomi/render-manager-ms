import { Pool } from 'pg';
import { Container } from "../../domain/model/container.model";
import { ContainerRepository } from "../../domain/repositories/container-repository";
import { PostgresDatabase } from "../config/postgres-config";

export class ContainerPostgresRepository implements ContainerRepository {
    private readonly pool: Pool;

    constructor() {
        this.pool = PostgresDatabase.getConnection();
    };

    async find(container_id: number): Promise<Container> {
        const client = await this.pool.connect();

        try {
            const query = `select * from frame.tbcontai where id_contai = $1`

            const queryResult = await client.query(query, [container_id]);

            return new Container(
                queryResult.rows[0].id_contai,
                queryResult.rows[0].no_contai,
                queryResult.rows[0].nu_rowcon,
                queryResult.rows[0].nu_colcon,
                undefined
            )
        } catch (error) {
            throw new Error('No se encontro container');
        } finally {
            client.release();
        }
    };

    async create(container: Container): Promise<Container> {
        const client = await this.pool.connect();

        try {
            const query = `insert into frame.tbcontai (id_contai, no_contai, nu_rowcon, nu_colcon) values (default, $1, $2, $3) returning *`;

            await client.query('BEGIN');
            const queryResult = await client.query(query, [container.container_name, container.container_rows, container.container_columns]);
            await client.query('COMMIT');

            return new Container(
                queryResult.rows[0].id_contai,
                queryResult.rows[0].no_contai,
                queryResult.rows[0].nu_rowcon,
                queryResult.rows[0].nu_colcon,
                undefined
            )
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

            query = query.slice(0,-2);

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