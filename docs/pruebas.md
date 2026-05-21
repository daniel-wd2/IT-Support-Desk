# Pruebas basicas

## Prueba 1: levantar contenedores

Comando:

```bash
docker compose up -d --build
```

Resultado esperado:

Los contenedores de frontend, backend, PostgreSQL y Adminer quedan activos.

## Prueba 2: comprobar contenedores

Comando:

```bash
docker ps
```

Resultado esperado:

Aparecen los servicios `frontend-it-support`, `backend-it-support`, `postgres-it-support` y `adminer-it-support`.

## Prueba 3: comprobar healthcheck del backend

Comando:

```bash
curl http://localhost:3000/health
```

Resultado esperado:

Devuelve un JSON con `status: ok`.

## Prueba 4: comprobar API

Comando:

```bash
curl http://localhost:3000/tickets
```

Resultado esperado:

Devuelve un listado JSON de incidencias ficticias.

## Prueba 5: crear incidencia

Comando:

```bash
curl -X POST http://localhost:3000/tickets \
  -H "Content-Type: application/json" \
  -d '{"title":"Servidor web no responde","description":"El servicio no responde desde el navegador","category":"Servidor","priority":"Alta","status":"Abierta","assignedTo":"Daniel"}'
```

Resultado esperado:

La API devuelve la incidencia creada con su `id`, `createdAt` y `updatedAt`.

## Prueba 6: revisar logs del backend

Comando:

```bash
docker logs backend-it-support
```

Resultado esperado:

Se ven las peticiones realizadas a la API y el arranque correcto del servidor NestJS.

## Prueba 7: comprobar frontend

URL:

```text
http://localhost:4200
```

Resultado esperado:

Se muestra el dashboard con tarjetas de resumen, filtros y listado de incidencias.

## Prueba 8: comprobar Swagger

URL:

```text
http://localhost:3000/api
```

Resultado esperado:

Se abre la documentacion Swagger con los endpoints de tickets disponibles.

## Prueba 9: comprobar Adminer

URL:

```text
http://localhost:8080
```

Resultado esperado:

Se abre Adminer y permite conectar a PostgreSQL con las credenciales definidas en `.env`.

## Prueba 10: ejecutar tests automatizados

Comandos:

```bash
cd backend && npm run test:ci && npm run test:e2e
cd ../frontend && npm run test:ci
```

Resultado esperado:

Todas las suites terminan en verde.
