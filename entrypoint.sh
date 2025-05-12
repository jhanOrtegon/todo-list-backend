#!/bin/sh

echo "⏳ Esperando a que MySQL esté disponible..."
./wait-for-it.sh mysql:3306 --timeout=30 --strict -- echo "✅ MySQL está disponible"

echo "🔄 Prisma reset..."
npx prisma migrate reset --force --skip-seed

echo "🧱 Prisma migrate dev..."
npx prisma migrate dev --name init

echo "🚀 Iniciando app..."
yarn start:dev
