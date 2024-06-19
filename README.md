## PARTE 1/2

### Consultas de una sola tabla

1. **Recuperar todas las líneas de productos con sus descripciones:**

   ```sql
   select productLine, productDescription from products;
   ```

2. **Encontrar todos los empleados que trabajan en la oficina de 'San Francisco':**

   ```sql
   SELECT employees.firstName, employees.lastName, employees.jobTitle
       -> FROM employees
       -> JOIN offices ON employees.officeCode = offices.officeCode
       -> WHERE offices.city = 'San Francisco';
   ```

3. **Listar todas las órdenes que tienen un estado de 'Enviado':**

   ```sql
   SELECT * FROM orders WHERE status = 'shipped';
   ```

4. **Obtener los detalles de todos los pagos realizados por el cliente con el número de cliente 103:**

   ```sql
   SELECT *
   FROM payments
   WHERE customerNumber = 103;

   ```

5. **Recuperar todos los clientes de 'USA' que tienen un límite de crédito superior a 50000:**

   ```sql
   SELECT *
   FROM customers
   WHERE country = 'USA'
   AND creditLimit > 50000;
   
   ```

### Consultas de múltiples tablas

1. **Listar todos los productos junto con las descripciones de sus líneas de productos:**

   ```sql
   SELECT products.productCode, products.productName, productlines.textDescription
   FROM products
   JOIN productlines ON products.productLine = productlines.productLine;

   ```

2. **Obtener los nombres y direcciones de correo electrónico de los empleados que reportan al empleado con el número de empleado 1143:**

   ```sql
   SELECT employees.firstName, employees.lastName, employees.email
   FROM employees
   WHERE employees.reportsTo = 1143;

   ```

3. **Encontrar todas las órdenes realizadas por clientes de 'Francia':**

   ```sql
   SELECT orders.*
   FROM orders
   JOIN customers ON orders.customerNumber = customers.customerNumber
   WHERE customers.country = 'France';

   ```

4. **Listar el monto total de los pagos recibidos de cada cliente:**

   ```sql
   SELECT payments.customerNumber, SUM(payments.amount) AS totalPayments
   FROM payments
   JOIN (
       SELECT DISTINC customerNumber
       FROM orders
       WHERE status IN ('Shipped', 'Resolved')
   ) newOrders ON payments.customerNumber = newOrders.customerNumber
   GROUP BY payments.customerNumber;

   _________________________________________________________________
   SELECT customerNumber, SUM(amount) AS totalPayments
   FROM payments
   GROUP BY customerNumber;

   ```

5. **Recuperar los detalles de las órdenes, incluyendo los nombres de los productos, para todas las órdenes realizadas por el cliente con el número de cliente 101:**

   ```sql
   SELECT orders.*, orderdetails.*, products.*
       -> FROM orders
       -> JOIN orderdetails ON orders.orderNumber = orderdetails.orderNumber
       -> JOIN products ON orderdetails.productCode = products.productCode
       -> WHERE orders.customerNumber = 101;
   ```

## Parte 2/2

### Consultas de una sola tabla

1. **Obtener el promedio del límite de crédito de todos los clientes:**

   ```
      SELECT AVG(creditLimit) AS promedio_limite_credito
      FROM customers;
   ```

2. **Calcular el total de productos en stock:**

   ```
      SELECT SUM(quantityInStock) AS total_productos_stock
      FROM products;
   ```

3. **Encontrar el precio medio de compra de todos los productos:**

   ```sql
      SELECT AVG(buyPrice) AS precio_medio_compra
      FROM products;
   ```

4. **Contar la cantidad de oficinas en cada país:**

   ```sql
      SELECT country, COUNT(*) AS cantidad_oficinas
      FROM offices
      GROUP BY country;
   ```

5. **Calcular el total de pagos recibidos:**

   ```sql
      SELECT SUM(amount) AS total_pagos
      FROM payments;
   ```

6. **Obtener la cantidad total de empleados:**

   ```sql
      SELECT COUNT(*) AS cantidad_empleados
      FROM employees;
   ```

7. **Calcular la cantidad media de productos pedidos en las órdenes:**

   ```sql
      SELECT AVG(quantityOrdered) AS promedio_cantidad_productos
      FROM orderdetails;
   ```

8. **Encontrar el precio total de todos los productos:**

   ```sql
      SELECT SUM(MSRP * quantityInStock) AS precio_total_productos
      FROM products;
   ```

9. **Calcular el promedio del precio sugerido (MSRP) de los productos:**

   ```sql
      SELECT AVG(MSRP) AS promedio_precio_sugerido
      FROM products;
   ```

10. **Contar la cantidad de empleados por título de trabajo:**

```sql
      SELECT jobTitle, COUNT(*) AS cantidad_empleados
      FROM employees
      GROUP BY jobTitle;
```

### Consultas de múltiples tablas

1.  **Calcular el total de pagos recibidos por cada cliente:**

```sql
      SELECT c.customerNumber, c.customerName, SUM(p.amount) AS total_pagos
      FROM customers c
      JOIN payments p ON c.customerNumber = p.customerNumber
      GROUP BY c.customerNumber, c.customerName;
```

2.  **Obtener el promedio del límite de crédito de los clientes por país:**

```sql
      SELECT c.country, AVG(c.creditLimit) AS promedio_limite_credito
      FROM customers c
      GROUP BY c.country;
```

3.  **Calcular el total de órdenes realizadas por cada cliente:**

```sql
      SELECT c.customerNumber, c.customerName, COUNT(o.orderNumber) AS total_ordenes
      FROM customers c
      JOIN orders o ON c.customerNumber = o.customerNumber
      GROUP BY c.customerNumber, c.customerName;
```

4.  **Encontrar la cantidad total de productos pedidos por cada cliente:**

```sql
      SELECT c.customerNumber, c.customerName, SUM(od.quantityOrdered) AS total_productos_pedidos
      FROM customers c
      JOIN orders o ON c.customerNumber = o.customerNumber
      JOIN orderdetails od ON o.orderNumber = od.orderNumber
      GROUP BY c.customerNumber, c.customerName;
```

5.  **Calcular el total de ventas (cantidad ordenada por precio cada uno) por cada cliente:**

```sql
      SELECT c.customerNumber, c.customerName, SUM(od.quantityOrdered * od.priceEach) AS total_ventas
      FROM customers c
      JOIN orders o ON c.customerNumber = o.customerNumber
      JOIN orderdetails od ON o.orderNumber = od.orderNumber
      GROUP BY c.customerNumber, c.customerName;
```

6.  **Obtener el promedio de la cantidad de productos en stock por línea de productos:**

```sql
      SELECT productLine, AVG(quantityInStock) AS promedio_stock
      FROM products
      GROUP BY productLine;
```

7.  **Calcular el total de pagos recibidos por cada país:**

```sql
      SELECT c.country, SUM(p.amount) AS total_pagos
      FROM customers c
      JOIN payments p ON c.customerNumber = p.customerNumber
      GROUP BY c.country;
```

8.  **Encontrar el promedio de ventas (cantidad ordenada por precio cada uno) por cada empleado:**

```sql
      SELECT e.employeeNumber, e.firstName, e.lastName,
         AVG(od.quantityOrdered * od.priceEach) AS promedio_ventas
      FROM employees e
      JOIN customers c ON e.employeeNumber = c.salesRepEmployeeNumber
      JOIN orders o ON c.customerNumber = o.customerNumber
      JOIN orderdetails od ON o.orderNumber = od.orderNumber
      GROUP BY e.employeeNumber, e.firstName, e.lastName;
```

9.  **Calcular el total de órdenes gestionadas por cada empleado:**

```sql
      SELECT e.employeeNumber, e.firstName, e.lastName,
         COUNT(o.orderNumber) AS total_ordenes
      FROM employees e
      JOIN customers c ON e.employeeNumber = c.salesRepEmployeeNumber
      JOIN orders o ON c.customerNumber = o.customerNumber
      GROUP BY e.employeeNumber, e.firstName, e.lastName;
```

10. **Obtener la cantidad total de productos vendidos por cada línea de productos:**

```sql
      SELECT p.productLine, SUM(od.quantityOrdered) AS total_productos_vendidos
      FROM products p
      JOIN orderdetails od ON p.productCode = od.productCode
      GROUP BY p.productLine;
```

11. **Encontrar el promedio de la cantidad de productos ordenados por cada cliente:**

```sql
      SELECT c.customerNumber, c.customerName,
         AVG(od.quantityOrdered) AS promedio_productos_ordenados
      FROM customers c
      JOIN orders o ON c.customerNumber = o.customerNumber
      JOIN orderdetails od ON o.orderNumber = od.orderNumber
      GROUP BY c.customerNumber, c.customerName;
```

12. **Calcular el total de ventas realizadas en cada país:**

```sql
      SELECT c.country, SUM(od.quantityOrdered * od.priceEach) AS total_ventas
      FROM customers c
      JOIN orders o ON c.customerNumber = o.customerNumber
      JOIN orderdetails od ON o.orderNumber = od.orderNumber
      GROUP BY c.country;
```

13. **Obtener el promedio del precio de compra de los productos por línea de productos:**

```sql
      SELECT productLine, AVG(buyPrice) AS promedio_precio_compra
      FROM products
      GROUP BY productLine;
```

14. **Encontrar la cantidad total de productos vendidos por cada vendedor:**

```sql
      SELECT e.employeeNumber, e.firstName, e.lastName,
         SUM(od.quantityOrdered) AS total_productos_vendidos
      FROM employees e
      JOIN customers c ON e.employeeNumber = c.salesRepEmployeeNumber
      JOIN orders o ON c.customerNumber = o.customerNumber
      JOIN orderdetails od ON o.orderNumber = od.orderNumber
      GROUP BY e.employeeNumber, e.firstName, e.lastName;
```

15. **Calcular el total de pagos recibidos por cada vendedor:**

```sql
      SELECT e.employeeNumber, e.firstName, e.lastName,
         SUM(p.amount) AS total_pagos_recibidos
      FROM employees e
      JOIN customers c ON e.employeeNumber = c.salesRepEmployeeNumber
      JOIN payments p ON c.customerNumber = p.customerNumber
      GROUP BY e.employeeNumber, e.firstName, e.lastName;
```

16. **Obtener el promedio del límite de crédito de los clientes atendidos por cada vendedor:**

```sql
      SELECT e.employeeNumber, e.firstName, e.lastName,
         AVG(c.creditLimit) AS promedio_limite_credito
      FROM employees e
      JOIN customers c ON e.employeeNumber = c.salesRepEmployeeNumber
      GROUP BY e.employeeNumber, e.firstName, e.lastName;
```

17. **Encontrar el total de ventas realizadas por cada oficina:**

```sql
      SELECT o.officeCode, o.city, o.country,
         SUM(od.quantityOrdered * od.priceEach) AS total_ventas
      FROM offices o
      JOIN employees e ON o.officeCode = e.officeCode
      JOIN customers c ON e.employeeNumber = c.salesRepEmployeeNumber
      JOIN orders ord ON c.customerNumber = ord.customerNumber
      JOIN orderdetails od ON ord.orderNumber = od.orderNumber
      GROUP BY o.officeCode, o.city, o.country;
```

18. **Calcular la cantidad media de productos pedidos por cada cliente:**

```sql
      SELECT c.customerNumber, c.customerName,
         AVG(od.quantityOrdered) AS promedio_productos_pedidos
      FROM customers c
      JOIN orders o ON c.customerNumber = o.customerNumber
      JOIN orderdetails od ON o.orderNumber = od.orderNumber
      GROUP BY c.customerNumber, c.customerName;
```

19. **Obtener el total de pagos realizados en cada año:**

```sql
      SELECT YEAR(paymentDate) AS anio, SUM(amount) AS total_pagos
      FROM payments
      GROUP BY YEAR(paymentDate);
```

20. **Encontrar el promedio del precio de venta (priceEach) de los productos por línea de productos:**

```sql
      SELECT p.productLine, AVG(od.priceEach) AS promedio_precio_venta
      FROM products p
      JOIN orderdetails od ON p.productCode = od.productCode
      GROUP BY p.productLine;
```
