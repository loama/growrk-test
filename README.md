## GroWrk Test

### Instructions:

Para este challenge vamos a utilizar una lista de productos y una lista de clientes en dos archivos CSV. Cada producto y cada cliente tiene una locación específica. El objetivo es asignar los productos cada uno de los clientes con base en su locación.

Si el producto tiene locación <any> puede ser asignado a cualquier cliente.

Instrucciones:
- Todos los clientes deben tener 10 productos.
- Todos los productos tienen que estar asignados.
- Los clientes no deben tener productos que no pertenezcan a su locación.
- Utiliza el lenguaje que prefieras.

Pasos:
1. Leer ambos CSV.
2. Implementar el algoritmo para hacer el match con los clientes.
3. Regresar una nueva estructura de datos con los matches.

### Implementation
* The entry file is `functions/index.js` routes and app configuration is there.
* All the challenge code is in `functions/endpoints.js`
* Could be optimized by changing libraries or other things, but seems beyond point, it already takes < 10ms to run an is written in less than 50 lines.
* It was deployed to a Google Cloud Function, so it also can handle millions requests without any trouble (and will basically be free).

----
* Also built another function that returns all the possible products for a user. `/allProductsAvailableForAUser`

Also deployed to a Cloud Function https://us-central1-growrk-test.cloudfunctions.net/api/v1/allProductsAvailableForAUser

### Run locally
1. `cd functions`
2. `npm install`
2. `npm run serve`
3. Hit `http://localhost:5001/growrk-test/us-central1/usersWithProducts` with a GET request, you can use [Postman](https://www.postman.com/) or any other tool you prefer.

### Having trouble or prefer to just do step 3?
1. Hit https://us-central1-growrk-test.cloudfunctions.net/api/v1/usersWithProducts with a GET request, you can use [Postman](https://www.postman.com/) or any other tool you prefer, even your browser.

It already has CORS configured, so you can use it in any front end project you want.
