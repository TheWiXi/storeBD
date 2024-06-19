import mysql from 'mysql2/promise';

export const bdConnection = async() => {
    try {
        // Create the connection to database
        const connection = await mysql.createConnection({
        host: 'monorail.proxy.rlwy.net',
        port: '23406',
        user: 'root',
        password: 'UfhkeLeeEjatNtakubUjcXzChDAPlVCI',
        database: 'railway',
        });
        console.log("Conexion exitosa.")
        return connection;
    } 
    catch (error) {
        console.error("Error de conexion.")
    }
}
