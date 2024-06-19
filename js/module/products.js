import {bdConnection} from "../../db/connection.js"

//CUT 1.Recuperar todas las líneas de productos con sus descripciones:
export const allLinesandDescriptions = async() => {
    let connection=bdConnection();
    try {
        const [results, fields] = await connection.query(
            'SELECT productLine, productDescription FROM products'
        );
        return results;
    } 
    catch (error) {
        console.log("Error en la consulta: ",error);
    }
}
