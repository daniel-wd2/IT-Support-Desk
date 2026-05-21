# IT Support Desk

Aplicacion demo fullstack para gestionar incidencias tecnicas con datos ficticios. El proyecto esta pensado como caso practico de portfolio para un perfil junior orientado a soporte IT, sistemas, Linux, Docker y desarrollo web.

## Objetivo del caso practico

Construir una aplicacion pequena, funcional y facil de entender que permita demostrar:

- desarrollo frontend con Angular
- desarrollo backend con NestJS
- modelado de datos con PostgreSQL y Prisma
- uso de Docker Compose para levantar el entorno completo
- documentacion tecnica clara y presentable en GitHub

## Tecnologias usadas

- Angular 21
- NestJS 11
- PostgreSQL 16
- Prisma ORM
- Docker Compose
- Swagger
- Adminer

## Funcionalidades

- Dashboard con resumen de incidencias
- Listado de tickets
- Filtros por estado, prioridad y categoria
- Alta de incidencias
- Edicion de incidencias
- Vista detalle
- Eliminacion de incidencias
- Endpoint de healthcheck
- Seed inicial con datos ficticios

## Arquitectura basica

```text
Frontend Angular (puerto 4200)
        |
        v
Backend NestJS REST API (puerto 3000)
        |
        v
PostgreSQL (puerto 5432)
```

Estructura principal:

```text
it-support-desk/
|-- frontend/
|-- backend/
|-- docker-compose.yml
|-- README.md
`-- docs/
    |-- pruebas.md
    |-- endpoints.md
    `-- capturas.md
```

## Como ejecutar el proyecto

1. Entra en la carpeta raiz:

```bash
cd it-support-desk
```

2. Copia las variables de entorno de ejemplo si quieres personalizarlas:

```bash
cp .env.example .env
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

3. Levanta el entorno completo:

```bash
docker compose up -d --build
```

4. Accesos disponibles:

- Frontend: http://localhost:4200
- Backend: http://localhost:3000
- Swagger: http://localhost:3000/api
- Health: http://localhost:3000/health
- Adminer: http://localhost:8080

## Variables de entorno

Variables del `docker-compose.yml`:

| Variable | Descripcion | Valor por defecto |
| --- | --- | --- |
| `POSTGRES_DB` | Nombre de la base de datos | `it_support_desk` |
| `POSTGRES_USER` | Usuario PostgreSQL | `postgres` |
| `POSTGRES_PASSWORD` | Password PostgreSQL | `postgres` |
| `DATABASE_URL` | Cadena de conexion Prisma | `postgresql://postgres:postgres@db:5432/it_support_desk?schema=public` |
| `CORS_ORIGIN` | Origen permitido para Angular | `http://localhost:4200` |

Variables utiles para el backend fuera de Docker en [backend/.env.example](backend/.env.example).

## Endpoints principales

- `GET /health`
- `GET /tickets`
- `GET /tickets/:id`
- `POST /tickets`
- `PATCH /tickets/:id`
- `DELETE /tickets/:id`
- `GET /tickets/stats/summary`

Documentacion ampliada en [docs/endpoints.md](docs/endpoints.md).

## Datos ficticios incluidos

El seed inicial crea incidencias de ejemplo como:

- No funciona el acceso a la VPN
- Error al iniciar sesion en equipo Windows
- Contenedor Docker se reinicia constantemente
- Servidor web no responde
- Problema de permisos en carpeta compartida

## Pruebas realizadas

Pruebas manuales:

- arranque de contenedores
- revision de servicios activos
- consulta de la API
- creacion de incidencias
- revision de logs
- validacion visual del frontend
- comprobacion del endpoint de healthcheck

Pruebas automatizadas ejecutables:

```bash
cd backend && npm run test:ci && npm run test:e2e
cd ../frontend && npm run test:ci
```

## Mejoras de mantenimiento aplicadas

- el dashboard evita recargar el resumen en cada filtro
- componentes Angular con `OnPush` y limpieza automatica de suscripciones
- helper compartido para clases visuales de tickets
- endpoint `GET /health` para comprobaciones operativas
- healthchecks en `docker-compose.yml` para backend y frontend
- arranque Docker del backend mas limpio con script dedicado
- imagen runtime del backend mas pequena al instalar solo dependencias necesarias
- tests basicos de backend y frontend

## Buenas practicas aplicadas

- frontend y backend separados
- DTOs y validaciones con `class-validator`
- documentacion Swagger
- credenciales fuera del codigo
- seed inicial con datos ficticios
- proyecto preparado para Docker Compose
- codigo orientado a lectura sencilla

## Mejoras futuras

- Login con JWT
- Roles: usuario, tecnico y admin
- Comentarios en incidencias
- Adjuntar capturas o archivos
- Notificaciones por email o Telegram
- Historial de cambios
- Paginacion y busqueda
- Despliegue en VPS con Docker

## Conclusion

`it-support-desk` es una demo compacta pero completa para ensenar una combinacion muy util de desarrollo web y operacion de sistemas. Sirve como base clara para portfolio y tambien como punto de partida para seguir anadiendo funcionalidades reales.
