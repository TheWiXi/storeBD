import mysql from 'mysql2/promise';

export const connection = await mysql.createConnection({
    host: 'monorail.proxy.rlwy.net',
    port: '23406',
    user: 'root',
    password: 'UfhkeLeeEjatNtakubUjcXzChDAPlVCI',
    database: 'railway',
});
