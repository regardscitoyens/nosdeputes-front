import knex from 'knex';
import config from './knexfile';

const db = knex(config.development);

export async function listTables() {
    try {
        const result = await db.raw("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
        return result.rows.map((row: any) => row.table_name);
    } catch (error) {
        console.error('Error listing tables:', error);
        throw error;
    }
}

export async function getDossiers(limit = 10) {
    try {
        const rows = await db.select('*').from('Dossier').limit(limit);
        return rows;
    } catch (error) {
        console.error('Error fetching rows from Dossier:', error);
        throw error;
    }
}