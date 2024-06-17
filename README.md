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