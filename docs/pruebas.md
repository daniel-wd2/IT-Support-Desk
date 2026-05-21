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

## Prueba 3: comprobar API

Comando:

```bash
curl http://localhost:3000/tickets
```

Resultado esperado:

Devuelve un listado JSON de incidencias ficticias.

## Prueba 4: crear incidencia

Comando:

```bash
curl -X POST http://localhost:3000/tickets \
  -H "Content-Type: application/json" \
  -d '{"title":"Servidor web no responde","description":"El servicio no responde desde el navegador","category":"Servidor","priority":"Alta","status":"Abierta","assignedTo":"Daniel"}'
```

Resultado esperado:

La API devuelve la incidencia creada con su `id`, `createdAt` y `updatedAt`.

## Prueba 5: revisar logs del backend

Comando:

```bash
docker logs backend-it-support
```

Resultado esperado:

Se ven las peticiones realizadas a la API y el arranque correcto del servidor NestJS.

## Prueba 6: comprobar frontend

URL:

```text
http://localhost:4200
```

Resultado esperado:

Se muestra el dashboard con tarjetas de resumen, filtros y listado de incidencias.

## Prueba 7: comprobar Swagger

URL:

```text
http://localhost:3000/api
```

Resultado esperado:

Se abre la documentacion Swagger con los endpoints de tickets disponibles.

## Prueba 8: comprobar Adminer

URL:

```text
http://localhost:8080
```

Resultado esperado:

Se abre Adminer y permite conectar a PostgreSQL con las credenciales definidas en `.env`.
