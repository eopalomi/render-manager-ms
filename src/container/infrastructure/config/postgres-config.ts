import {Pool} from 'pg';

export class PostgresDatabase {
    private static connection: Pool;

    static getConnection(){
        if (!PostgresDatabase.connection){
            return  new Pool({
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT!),
                database: process.env.DB_NAME,
                log: (log) => console.log("ejecutando postgres: ", log)
            });
        };
        
        return this.connection;
    }
}