import {connection} from "../../db/connection.js"

//4.**Obtener los detalles de todos los pagos realizados por el cliente con el número de cliente 103:**
export const paymentsByCustomer103 = async()=>{
    let [result] = await connection.query(`SELECT *
    FROM payments
    WHERE customerNumber = 103`);
    return result;
}

//Listar el monto total de los pagos recibidos de cada cliente
export const getTotalPaymentForEachCustomer = async()=>{
    let [result] = await connection.execute(` SELECT customers.customerName, SUM(payments.amount) AS totalPayments FROM customers JOIN payments  ON customers.customerNumber = payments.customerNumber GROUP BY customers.customerName;`);
    return result;
}

//Calcular el total de pagos recibidos
export const getTotalPayments = async()=>{
    let [result] = await connection.execute(`SELECT SUM(amount) AS totalPayments FROM payments;`);
    return result;
}

//Calcular el total de pagos recibidos por cada cliente
export const getTotalPaymentsForEachCustumer = async()=>{
    let [result] = await connection.execute(`SELECT customers.customerName, SUM(payments.amount) AS totalPayments FROM customers JOIN payments ON payments.customerNumber = customers.customerNumber GROUP BY customers.customerNumber;`);
    return result;
}

//Calcular el total de pagos recibidos por cada país
export const getTotalPaymentsForEachCountry = async()=>{
    let [result] = await connection.execute(`SELECT customers.country, COUNT(*) AS totalPayments FROM payments JOIN customers  ON customers.customerNumber = payments.customerNumber GROUP BY customers.country;`);
    return result;
}

//Calcular el total de pagos recibidos por cada vendedor
export const getTotalPaymentsForEachSeller = async()=>{
    let [result] = await connection.execute(`SELECT employees.employeeNumber, employees.firstName, COUNT(*) AS totalPayments FROM payments JOIN customers ON customers.customerNumber = payments.customerNumber JOIN employees ON employees.employeeNumber = customers.salesRepEmployeeNumber GROUP BY employees.employeeNumber, employees.firstName;`);
    return result;
}

//Obtener el total de pagos realizados en cada año
export const getTotalPaymentsForEachYear = async()=>{
    let [result] = await connection.execute(`SELECT YEAR(paymentDate) AS paymentYear,  SUM(amount) AS totalPayments FROM  payments GROUP BY  YEAR(paymentDate);`);
    return result;
}