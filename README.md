# NestJS + AWS Lambda + Prisma + MySQL + Serverless + JWT

Proyecto base para aplicaciones **serverless** con **NestJS**, desplegadas en **AWS Lambda**, usando **Prisma ORM** con **MySQL**, autenticación con **JWT** y empaquetado con **Serverless Framework**. Incluye soporte para **Docker** y gestión con **Yarn**.

---

## 🚀 Tecnologías

- [NestJS](https://nestjs.com/)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [Prisma ORM](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)
- [JWT Authentication](https://jwt.io/)
- [Serverless Framework](https://www.serverless.com/)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)

---

## 🔧 Instalación

```bash
# Clona el repositorio
git clone https://github.com/jhanOrtegon/todo-list-backend
cd todo-list-backend

# Instala dependencias
yarn

# Genera el cliente de Prisma
yarn prisma:generate
```

---

## ⚙️ Docker

```bash
# Levanta la app y MySQL
docker-compose up --build
```

Accede a la app en `http://localhost:3000`.

---

## 🗃 Configuración de base de datos

Edita el archivo `.env`:

```
DATABASE_URL="mysql://root:rootpassword@localhost:3306/db_name"
```

---

## 🛡 Autenticación

Rutas disponibles:

- `POST /auth/register` → Registro de usuario
- `POST /auth/login` → Login y generación de token

---

## 🧪 Scripts

```bash
# Desarrollo local (Nest + Express)
yarn start:dev

# Despliegue a AWS Lambda
yarn deploy

# Migraciones y cliente Prisma
yarn prisma:migrate
yarn prisma:generate
```

---

## 📁 Estructura del proyecto

```
src/
├── auth/           → Módulo de autenticación (JWT)
├── list/           → Módulo para gestionar listas de tareas (crear, obtener, eliminar)
├── task/           → Módulo para gestionar tareas individuales dentro de una lista
├── user/           → Controlador básico de usuario
├── prisma/         → Servicio de acceso a Prisma
├── main.ts         → Arranque local
└── main.lambda.ts  → Handler para AWS Lambda
```
