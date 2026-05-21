# Endpoints de la API

Base URL:

```text
http://localhost:3000
```

Swagger:

```text
http://localhost:3000/api
```

## 1. Listar incidencias

```http
GET /tickets
```

Filtros opcionales:

- `status`
- `priority`
- `category`

Ejemplo:

```http
GET /tickets?status=Abierta&priority=Alta
```

## 2. Obtener detalle de una incidencia

```http
GET /tickets/:id
```

Ejemplo:

```http
GET /tickets/1
```

## 3. Crear incidencia

```http
POST /tickets
Content-Type: application/json
```

Payload de ejemplo:

```json
{
  "title": "Servidor web no responde",
  "description": "El servicio no responde desde el navegador",
  "category": "Servidor",
  "priority": "Alta",
  "status": "Abierta",
  "assignedTo": "Daniel"
}
```

## 4. Editar incidencia

```http
PATCH /tickets/:id
Content-Type: application/json
```

Payload de ejemplo:

```json
{
  "status": "En proceso",
  "assignedTo": "Laura"
}
```

## 5. Eliminar incidencia

```http
DELETE /tickets/:id
```

Ejemplo:

```http
DELETE /tickets/3
```

## 6. Resumen del dashboard

```http
GET /tickets/stats/summary
```

Respuesta esperada:

```json
{
  "total": 5,
  "open": 2,
  "inProgress": 1,
  "resolved": 1,
  "critical": 1
}
```

## Valores validos

Categorias:

- `Hardware`
- `Software`
- `Red`
- `Servidor`
- `Docker`
- `Linux`
- `Otro`

Prioridades:

- `Baja`
- `Media`
- `Alta`
- `Crítica`

Estados:

- `Abierta`
- `En proceso`
- `Resuelta`
- `Cerrada`
