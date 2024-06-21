import {connection} from "../../db/connection.js"

//5.**Recuperar todos los clientes de 'USA' que tienen un límite de crédito superior a 50000:**
export const customersByUSA = async()=>{
    let [result] = await connection.query(`SELECT *
    FROM customers
    WHERE country = 'USA'
    AND creditLimit > 50000`);
    return result;
}

//Obtener el promedio del límite de crédito de todos los clientes
export const getAverageCreditLimitOfAllCustomers = async()=>{
    let [result] = await connection.query(`SELECT AVG(creditLimit) AS averageCreditLimit FROM customers;`);
    return result;
}

//Obtener el promedio del límite de crédito de los clientes por país
export const getAverageCreditLimitOfCustomersByCountry = async()=>{
    let [result] = await connection.query(`SELECT country, AVG(customers.creditLimit) AS averageCreditLimit FROM customers GROUP BY country;`);
    return result;
}

//Obtener el promedio del límite de crédito de los clientes atendidos por cada vendedor
export const getAverageCreditLimitOfCustomerForEachSeller = async()=>{
    let [result] = await connection.query(`SELECT  employees.employeeNumber,  employees.firstName, AVG(customers.creditLimit) AS averageCreditLimit FROM  employees JOIN  customers ON employees.employeeNumber = customers.salesRepEmployeeNumber GROUP BY  employees.employeeNumber,  employees.firstName;`);
    return result;
}