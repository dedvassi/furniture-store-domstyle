# Инструкция по развертыванию сайта мебельного магазина "ДомСтиль"

## Требования к системе
- Docker и Docker Compose
- Node.js (версия 16 или выше)
- Python 3.9 или выше
- PostgreSQL 14 или выше
- Минимум 2 ГБ оперативной памяти
- Минимум 10 ГБ свободного места на диске

## Локальное развертывание

### 1. Клонирование репозитория
```bash
git clone https://github.com/your-username/domstyle-furniture-store.git
cd domstyle-furniture-store
```

### 2. Запуск с помощью скрипта
Для быстрого запуска всего проекта используйте скрипт `run.sh`:
```bash
chmod +x run.sh
./run.sh
```

Скрипт автоматически:
- Запустит PostgreSQL в Docker-контейнере
- Применит схему базы данных
- Настроит виртуальное окружение для бэкенда
- Установит зависимости бэкенда
- Запустит бэкенд на порту 8000
- Установит зависимости фронтенда
- Запустит фронтенд на порту 3000

### 3. Ручное развертывание

#### База данных
```bash
# Запуск PostgreSQL
docker-compose up -d

# Применение схемы базы данных
docker exec -i furniture_store_db psql -U furniture_user -d furniture_store < database/schema.sql
```

#### Бэкенд
```bash
# Переход в директорию бэкенда
cd backend

# Создание виртуального окружения
python -m venv venv
source venv/bin/activate  # На Windows: venv\Scripts\activate

# Установка зависимостей
pip install -r requirements.txt

# Запуск сервера
cd app
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

#### Фронтенд
```bash
# Переход в директорию фронтенда
cd frontend

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm start

# Сборка для продакшена
npm run build
```

## Продакшен-развертывание

### 1. Настройка переменных окружения
Создайте файл `.env` в корневой директории проекта:
```
# База данных
POSTGRES_USER=furniture_user
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=furniture_store
POSTGRES_HOST=db
POSTGRES_PORT=5432

# Бэкенд
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
BACKEND_CORS_ORIGINS=["http://localhost:3000","http://localhost:8080"]

# Фронтенд
REACT_APP_API_URL=http://localhost:8000/api/v1
```

### 2. Сборка и запуск с помощью Docker Compose
```bash
# Сборка и запуск всех сервисов
docker-compose -f docker-compose.prod.yml up -d --build
```

### 3. Проверка статуса
```bash
docker-compose -f docker-compose.prod.yml ps
```

## Доступ к сервисам

После успешного развертывания:
- Фронтенд: http://localhost:3000
- API бэкенда: http://localhost:8000/api/v1
- Документация API: http://localhost:8000/docs

## Загрузка в GitHub репозиторий

### 1. Создание нового репозитория
Создайте новый репозиторий на GitHub через веб-интерфейс.

### 2. Инициализация Git и загрузка кода
```bash
# Инициализация Git в директории проекта
git init

# Добавление всех файлов
git add .

# Создание коммита
git commit -m "Initial commit: ДомСтиль - сайт мебельного магазина"

# Добавление удаленного репозитория
git remote add origin https://github.com/your-username/your-repo-name.git

# Загрузка кода
git push -u origin master
```

## Обновление сайта

### 1. Обновление кода
```bash
# Получение последних изменений
git pull origin master

# Перезапуск сервисов
docker-compose -f docker-compose.prod.yml up -d --build
```

## Резервное копирование

### 1. Резервное копирование базы данных
```bash
docker exec -t furniture_store_db pg_dump -U furniture_user furniture_store > backup_$(date +%Y-%m-%d_%H-%M-%S).sql
```

### 2. Восстановление из резервной копии
```bash
cat backup_file.sql | docker exec -i furniture_store_db psql -U furniture_user -d furniture_store
```

## Устранение неполадок

### Проблема: Не удается подключиться к базе данных
- Проверьте, запущен ли контейнер с PostgreSQL: `docker ps`
- Проверьте логи контейнера: `docker logs furniture_store_db`
- Проверьте настройки подключения в файле конфигурации бэкенда

### Проблема: Бэкенд не запускается
- Проверьте логи бэкенда: `docker logs furniture_store_backend`
- Убедитесь, что все зависимости установлены: `pip install -r requirements.txt`
- Проверьте настройки подключения к базе данных

### Проблема: Фронтенд не отображается или не подключается к API
- Проверьте, что бэкенд запущен и доступен
- Проверьте настройки CORS в бэкенде
- Убедитесь, что URL API в настройках фронтенда указан правильно

## Контакты для поддержки
При возникновении проблем с развертыванием или использованием сайта, пожалуйста, обращайтесь по адресу: support@domstyle.ru
