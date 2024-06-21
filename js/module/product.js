import {connection} from "../../db/connection.js"

//1.Recuperar todas las líneas de productos con sus descripciones:
export const getAllProductLineAndDescription = async()=>{
    let [result] = await connection.query(`SELECT productLine, productDescription FROM products`);
    return result;
}

//Listar todos los productos junto con las descripciones de sus líneas de productos
export const getAllProductsWithDescription = async()=>{
    let [result] = await connection.query(`SELECT products.productName, productlines.textDescription FROM products INNER JOIN productlines ON products.productLine = productlines.productLine;`);
    return result;
}

//Calcular el total de productos en stock
export const getTotalProductsInStock = async()=>{
    let [result] = await connection.query(`SELECT SUM(quantityInStock) AS totalProductsInStock FROM products;`);
    return result;
}

//Encontrar el precio medio de compra de todos los productos
export const getAverageBuyPriceOfAllProducts = async()=>{
    let [result] = await connection.query(`SELECT AVG(buyPrice) AS averageBuyPrice FROM products;`);
    return result;
}

//Calcular la cantidad media de productos pedidos en las órdenes
export const getAverageQuantityProductsOrederedByOrders = async()=>{
    let [result] = await connection.query(`SELECT AVG(orderdetails.quantityOrdered) AS averageQuantityOrdered FROM orderdetails;`);
    return result;
}

//Encontrar el precio total de todos los productos
export const getTotalPriceOfAllProducts = async()=>{
    let [result] = await connection.query(`SELECT SUM(products.buyPrice) AS totalPriceProducts FROM products;`);
    return result;
}

//Calcular el promedio del precio sugerido (MSRP) de los productos
export const getAverageSuggestedPriceOfProducts= async()=>{
    let [result] = await connection.query(`SELECT AVG(products.MSRP) AS averagePriceMSRP FROM products;`);
    return result;
}

//Encontrar la cantidad total de productos pedidos por cada cliente
export const getTotalOrderedProductsForEachCustomer= async()=>{
    let [result] = await connection.query(`SELECT customers.customerName, COUNT(*) AS totalProducts FROM orderdetails JOIN orders ON orders.orderNumber  = orderdetails.orderNumber JOIN customers ON customers.customerNumber = orders.customerNumber GROUP BY customers.customerName;`);
    return result;
}

//Obtener la cantidad total de productos vendidos por cada línea de productos
export const getTotalQuantityProductsSalesForEachProductLine= async()=>{
    let [result] = await connection.query(`SELECT products.productLine,  SUM(orderdetails.quantityOrdered) AS quantityProductsSold FROM products JOIN orderdetails ON orderdetails.productCode = products.productCode GROUP BY products.productLine;`);
    return result;
}

//Encontrar el promedio de la cantidad de productos ordenados por cada cliente
export const getAverageQuantityProductsForEachCustomer= async()=>{
    let [result] = await connection.query(`SELECT customers.customerName, AVG(orderdetails.quantityOrdered) AS averageQuantityProducts FROM orderdetails JOIN orders ON orders.orderNumber = orderdetails.orderNumber JOIN customers ON customers.customerNumber = orders.customerNumber GROUP BY customers.customerName;`);
    return result;
}

//Encontrar la cantidad total de productos vendidos por cada vendedor
export const getTotalQuantityProductsSalesForEahSeller= async()=>{
    let [result] = await connection.query(`SELECT  employees.employeeNumber, employees.firstName, SUM(orderdetails.quantityOrdered) AS totalQuantitySold FROM  employees JOIN  customers ON employees.employeeNumber = customers.salesRepEmployeeNumber JOIN  orders ON customers.customerNumber = orders.customerNumber JOIN  orderdetails ON orders.orderNumber = orderdetails.orderNumber GROUP BY  employees.employeeNumber, employees.firstName;`);
    return result;
}