#!/bin/bash

# Скрипт для инициализации базы данных PostgreSQL

# Проверка, запущен ли Docker и контейнер с PostgreSQL
echo "Проверка статуса Docker и PostgreSQL..."
if ! docker ps | grep -q furniture_store_db; then
  echo "Запуск PostgreSQL контейнера..."
  docker-compose up -d
  
  # Ждем, пока PostgreSQL полностью запустится
  echo "Ожидание запуска PostgreSQL..."
  sleep 10
fi

# Применение схемы базы данных
echo "Применение схемы базы данных..."
docker exec -i furniture_store_db psql -U furniture_user -d furniture_store < database/schema.sql

# Проверка успешности выполнения
if [ $? -eq 0 ]; then
  echo "Схема базы данных успешно применена!"
else
  echo "Ошибка при применении схемы базы данных."
  exit 1
fi

echo "Инициализация базы данных завершена."
