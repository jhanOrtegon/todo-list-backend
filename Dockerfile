FROM node:20

# Instala dependencias del sistema necesarias
RUN apt-get update && apt-get install -y openssl ca-certificates

# Establece el directorio de trabajo
WORKDIR /app

# Copia primero los archivos que menos cambian
COPY package.json ./

# Instala dependencias
RUN yarn install --frozen-lockfile

# Copia el resto del proyecto (incluye wait-for-it.sh y entrypoint.sh)
COPY . .

# Genera Prisma Client
RUN npx prisma generate

# Da permisos de ejecución a los scripts
RUN chmod +x /app/entrypoint.sh /app/wait-for-it.sh

# Usa el script de entrada al iniciar
CMD ["sh", "/app/entrypoint.sh"]
