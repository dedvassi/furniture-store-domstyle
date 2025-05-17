#!/bin/bash

# Скрипт для запуска и тестирования всего проекта

# Проверка наличия Docker
if ! command -v docker &> /dev/null; then
    echo "Docker не установлен. Пожалуйста, установите Docker для запуска проекта."
    exit 1
fi

# Проверка наличия Node.js и npm
if ! command -v node &> /dev/null || ! command -v npm &> /dev/null; then
    echo "Node.js или npm не установлены. Пожалуйста, установите их для запуска фронтенда."
    exit 1
fi

# Запуск базы данных PostgreSQL
echo "Запуск PostgreSQL..."
docker-compose up -d

# Ожидание запуска PostgreSQL
echo "Ожидание запуска PostgreSQL..."
sleep 10

# Применение схемы базы данных
echo "Применение схемы базы данных..."
docker exec -i furniture_store_db psql -U furniture_user -d furniture_store < database/schema.sql

# Создание виртуального окружения для бэкенда
echo "Настройка виртуального окружения для бэкенда..."
cd backend
python3 -m venv venv
source venv/bin/activate

# Установка зависимостей бэкенда
echo "Установка зависимостей бэкенда..."
pip install -r requirements.txt

# Запуск бэкенда в фоновом режиме
echo "Запуск бэкенда..."
cd app
uvicorn main:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
cd ../..

# Установка зависимостей фронтенда
echo "Установка зависимостей фронтенда..."
cd frontend
npm install

# Запуск фронтенда в режиме разработки
echo "Запуск фронтенда..."
npm start &
FRONTEND_PID=$!
cd ..

echo "Проект запущен!"
echo "Бэкенд доступен по адресу: http://localhost:8000"
echo "Фронтенд доступен по адресу: http://localhost:3000"
echo "API документация доступна по адресу: http://localhost:8000/docs"

# Функция для корректного завершения всех процессов
cleanup() {
    echo "Завершение работы..."
    kill $BACKEND_PID
    kill $FRONTEND_PID
    docker-compose down
    exit 0
}

# Перехват сигналов для корректного завершения
trap cleanup SIGINT SIGTERM

# Ожидание нажатия клавиши для завершения
echo "Нажмите Ctrl+C для завершения работы"
wait
