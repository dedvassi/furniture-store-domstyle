# Структура монорепозитория для сайта "ДомСтиль"

## Общая структура

```
domstyle/
├── .github/                      # GitHub Actions и CI/CD конфигурация
├── .vscode/                      # Настройки VS Code для разработки
├── backend/                      # Бэкенд на FastAPI
├── frontend/                     # Фронтенд на React
├── database/                     # Миграции и схемы базы данных
├── shared/                       # Общие типы и утилиты
├── scripts/                      # Скрипты для разработки и деплоя
├── docs/                         # Документация проекта
├── tests/                        # Интеграционные тесты
├── .env.example                  # Пример переменных окружения
├── docker-compose.yml            # Конфигурация Docker для разработки
├── docker-compose.prod.yml       # Конфигурация Docker для продакшена
├── Makefile                      # Команды для управления проектом
├── README.md                     # Основная документация проекта
└── package.json                  # Корневой package.json для монорепозитория
```

## Структура бэкенда (FastAPI)

```
backend/
├── alembic/                      # Миграции базы данных
│   ├── versions/                 # Версии миграций
│   └── alembic.ini               # Конфигурация Alembic
├── app/                          # Основной код приложения
│   ├── api/                      # API эндпоинты
│   │   ├── v1/                   # API версии 1
│   │   │   ├── auth/             # Аутентификация и авторизация
│   │   │   ├── catalog/          # Каталог товаров
│   │   │   ├── users/            # Управление пользователями
│   │   │   ├── interior_designer/# Интерактивный дизайнер интерьера
│   │   │   ├── virtual_showroom/ # Виртуальный шоурум
│   │   │   ├── community/        # Социальная платформа
│   │   │   ├── loyalty/          # Программа лояльности
│   │   │   ├── tools/            # Интерактивные инструменты
│   │   │   ├── smart_home/       # Умный дом
│   │   │   ├── blog/             # Блог и вдохновение
│   │   │   ├── orders/           # Заказы и корзина
│   │   │   └── dependencies.py   # Общие зависимости для API
│   │   └── endpoints.py          # Регистрация всех эндпоинтов
│   ├── core/                     # Ядро приложения
│   │   ├── config.py             # Конфигурация приложения
│   │   ├── security.py           # Безопасность и JWT
│   │   ├── exceptions.py         # Обработка исключений
│   │   └── logging.py            # Настройка логирования
│   ├── db/                       # Работа с базой данных
│   │   ├── base.py               # Базовые классы для моделей
│   │   ├── session.py            # Управление сессиями БД
│   │   └── init_db.py            # Инициализация БД
│   ├── models/                   # Модели данных (SQLAlchemy)
│   │   ├── user.py               # Модель пользователя
│   │   ├── product.py            # Модель товара
│   │   ├── category.py           # Модель категории
│   │   ├── order.py              # Модель заказа
│   │   ├── interior_project.py   # Модель интерьерного проекта
│   │   ├── community_post.py     # Модель публикации в сообществе
│   │   ├── loyalty.py            # Модель программы лояльности
│   │   └── smart_home.py         # Модель для умного дома
│   ├── schemas/                  # Pydantic схемы
│   │   ├── user.py               # Схемы пользователя
│   │   ├── product.py            # Схемы товара
│   │   ├── category.py           # Схемы категории
│   │   ├── order.py              # Схемы заказа
│   │   ├── interior_project.py   # Схемы интерьерного проекта
│   │   ├── community_post.py     # Схемы публикации в сообществе
│   │   ├── loyalty.py            # Схемы программы лояльности
│   │   └── smart_home.py         # Схемы для умного дома
│   ├── services/                 # Бизнес-логика
│   │   ├── auth.py               # Сервис аутентификации
│   │   ├── catalog.py            # Сервис каталога
│   │   ├── user.py               # Сервис пользователей
│   │   ├── interior_designer.py  # Сервис дизайнера интерьера
│   │   ├── virtual_showroom.py   # Сервис виртуального шоурума
│   │   ├── community.py          # Сервис социальной платформы
│   │   ├── loyalty.py            # Сервис программы лояльности
│   │   ├── tools.py              # Сервис интерактивных инструментов
│   │   ├── smart_home.py         # Сервис умного дома
│   │   ├── blog.py               # Сервис блога
│   │   └── order.py              # Сервис заказов
│   ├── utils/                    # Утилиты
│   │   ├── email.py              # Отправка email
│   │   ├── image.py              # Обработка изображений
│   │   ├── search.py             # Поиск и фильтрация
│   │   └── recommendations.py    # Система рекомендаций
│   ├── tasks/                    # Фоновые задачи (Celery)
│   │   ├── email.py              # Задачи для email
│   │   ├── image_processing.py   # Обработка изображений
│   │   └── recommendations.py    # Генерация рекомендаций
│   ├── middleware/               # Middleware
│   │   ├── logging.py            # Логирование запросов
│   │   └── error_handler.py      # Обработка ошибок
│   ├── dependencies.py           # Зависимости FastAPI
│   └── main.py                   # Точка входа приложения
├── tests/                        # Тесты бэкенда
│   ├── conftest.py               # Конфигурация pytest
│   ├── api/                      # Тесты API
│   ├── services/                 # Тесты сервисов
│   └── utils/                    # Тесты утилит
├── Dockerfile                    # Dockerfile для бэкенда
├── pyproject.toml                # Зависимости и конфигурация Python
├── requirements.txt              # Зависимости для продакшена
├── requirements-dev.txt          # Зависимости для разработки
└── README.md                     # Документация бэкенда
```

## Структура фронтенда (React)

```
frontend/
├── public/                       # Статические файлы
│   ├── assets/                   # Общие ассеты
│   │   ├── images/               # Изображения
│   │   ├── fonts/                # Шрифты
│   │   └── icons/                # Иконки
│   ├── favicon.ico               # Фавиконка
│   └── index.html                # HTML шаблон
├── src/                          # Исходный код
│   ├── api/                      # API клиенты
│   │   ├── auth.ts               # API аутентификации
│   │   ├── catalog.ts            # API каталога
│   │   ├── user.ts               # API пользователей
│   │   ├── interior-designer.ts  # API дизайнера интерьера
│   │   ├── virtual-showroom.ts   # API виртуального шоурума
│   │   ├── community.ts          # API социальной платформы
│   │   ├── loyalty.ts            # API программы лояльности
│   │   ├── tools.ts              # API интерактивных инструментов
│   │   ├── smart-home.ts         # API умного дома
│   │   ├── blog.ts               # API блога
│   │   ├── order.ts              # API заказов
│   │   └── index.ts              # Общий экспорт API
│   ├── assets/                   # Локальные ассеты
│   │   ├── images/               # Изображения
│   │   ├── styles/               # Глобальные стили
│   │   └── icons/                # SVG иконки
│   ├── components/               # Компоненты React
│   │   ├── common/               # Общие компоненты
│   │   │   ├── Button/           # Кнопка
│   │   │   ├── Input/            # Поле ввода
│   │   │   ├── Select/           # Выпадающий список
│   │   │   ├── Modal/            # Модальное окно
│   │   │   ├── Card/             # Карточка
│   │   │   ├── Carousel/         # Карусель
│   │   │   ├── Dropdown/         # Выпадающее меню
│   │   │   ├── Tabs/             # Вкладки
│   │   │   ├── Tooltip/          # Всплывающая подсказка
│   │   │   ├── Notification/     # Уведомление
│   │   │   └── index.ts          # Экспорт компонентов
│   │   ├── layout/               # Компоненты макета
│   │   │   ├── Header/           # Шапка сайта
│   │   │   ├── Footer/           # Подвал сайта
│   │   │   ├── Sidebar/          # Боковая панель
│   │   │   ├── Navigation/       # Навигация
│   │   │   └── index.ts          # Экспорт компонентов
│   │   ├── catalog/              # Компоненты каталога
│   │   │   ├── ProductCard/      # Карточка товара
│   │   │   ├── ProductList/      # Список товаров
│   │   │   ├── ProductFilter/    # Фильтр товаров
│   │   │   ├── CategoryList/     # Список категорий
│   │   │   └── index.ts          # Экспорт компонентов
│   │   ├── interior-designer/    # Компоненты дизайнера интерьера
│   │   │   ├── Canvas/           # Холст для дизайна
│   │   │   ├── ToolPanel/        # Панель инструментов
│   │   │   ├── ObjectLibrary/    # Библиотека объектов
│   │   │   ├── PropertyEditor/   # Редактор свойств
│   │   │   └── index.ts          # Экспорт компонентов
│   │   ├── virtual-showroom/     # Компоненты виртуального шоурума
│   │   │   ├── RoomViewer/       # Просмотр комнаты
│   │   │   ├── ARViewer/         # AR просмотрщик
│   │   │   ├── ProductInfo/      # Информация о товаре
│   │   │   └── index.ts          # Экспорт компонентов
│   │   ├── community/            # Компоненты социальной платформы
│   │   │   ├── PostCard/         # Карточка публикации
│   │   │   ├── PostList/         # Список публикаций
│   │   │   ├── CommentSection/   # Секция комментариев
│   │   │   ├── UserProfile/      # Профиль пользователя
│   │   │   └── index.ts          # Экспорт компонентов
│   │   ├── loyalty/              # Компоненты программы лояльности
│   │   │   ├── PointsDisplay/    # Отображение баллов
│   │   │   ├── RewardsList/      # Список наград
│   │   │   ├── LevelProgress/    # Прогресс уровня
│   │   │   └── index.ts          # Экспорт компонентов
│   │   ├── tools/                # Компоненты интерактивных инструментов
│   │   │   ├── ComfortCalculator/# Калькулятор комфорта
│   │   │   ├── SofaConfigurator/ # Конфигуратор диванов
│   │   │   ├── WardrobePlanner/  # Планировщик гардероба
│   │   │   ├── StyleTest/        # Тест стиля
│   │   │   └── index.ts          # Экспорт компонентов
│   │   ├── smart-home/           # Компоненты умного дома
│   │   │   ├── DeviceList/       # Список устройств
│   │   │   ├── CompatibilityFilter/ # Фильтр совместимости
│   │   │   ├── IntegrationDemo/  # Демонстрация интеграции
│   │   │   └── index.ts          # Экспорт компонентов
│   │   ├── blog/                 # Компоненты блога
│   │   │   ├── ArticleCard/      # Карточка статьи
│   │   │   ├── ArticleList/      # Список статей
│   │   │   ├── ArticleView/      # Просмотр статьи
│   │   │   └── index.ts          # Экспорт компонентов
│   │   ├── user/                 # Компоненты пользователя
│   │   │   ├── LoginForm/        # Форма входа
│   │   │   ├── RegisterForm/     # Форма регистрации
│   │   │   ├── ProfileForm/      # Форма профиля
│   │   │   ├── OrderHistory/     # История заказов
│   │   │   └── index.ts          # Экспорт компонентов
│   │   ├── cart/                 # Компоненты корзины
│   │   │   ├── CartItem/         # Элемент корзины
│   │   │   ├── CartList/         # Список корзины
│   │   │   ├── Checkout/         # Оформление заказа
│   │   │   └── index.ts          # Экспорт компонентов
│   │   └── index.ts              # Общий экспорт компонентов
│   ├── contexts/                 # React контексты
│   │   ├── AuthContext.tsx       # Контекст аутентификации
│   │   ├── CartContext.tsx       # Контекст корзины
│   │   ├── ThemeContext.tsx      # Контекст темы
│   │   └── index.ts              # Экспорт контекстов
│   ├── hooks/                    # Пользовательские хуки
│   │   ├── useAuth.ts            # Хук аутентификации
│   │   ├── useCart.ts            # Хук корзины
│   │   ├── useProducts.ts        # Хук товаров
│   │   ├── useInteriorDesigner.ts# Хук дизайнера интерьера
│   │   ├── useVirtualShowroom.ts # Хук виртуального шоурума
│   │   ├── useCommunity.ts       # Хук социальной платформы
│   │   ├── useLoyalty.ts         # Хук программы лояльности
│   │   ├── useTools.ts           # Хук интерактивных инструментов
│   │   ├── useSmartHome.ts       # Хук умного дома
│   │   ├── useBlog.ts            # Хук блога
│   │   └── index.ts              # Экспорт хуков
│   ├── pages/                    # Страницы приложения
│   │   ├── Home/                 # Главная страница
│   │   ├── Catalog/              # Страница каталога
│   │   ├── ProductDetail/        # Страница товара
│   │   ├── InteriorDesigner/     # Страница дизайнера интерьера
│   │   ├── VirtualShowroom/      # Страница виртуального шоурума
│   │   ├── Community/            # Страница социальной платформы
│   │   ├── Loyalty/              # Страница программы лояльности
│   │   ├── Tools/                # Страница интерактивных инструментов
│   │   ├── SmartHome/            # Страница умного дома
│   │   ├── Blog/                 # Страница блога
│   │   ├── About/                # Страница о компании
│   │   ├── Contact/              # Страница контактов
│   │   ├── Auth/                 # Страницы аутентификации
│   │   │   ├── Login/            # Страница входа
│   │   │   ├── Register/         # Страница регистрации
│   │   │   └── ForgotPassword/   # Страница восстановления пароля
│   │   ├── User/                 # Страницы пользователя
│   │   │   ├── Profile/          # Профиль пользователя
│   │   │   ├── Orders/           # Заказы пользователя
│   │   │   ├── Wishlist/         # Список желаний
│   │   │   ├── Projects/         # Проекты пользователя
│   │   │   └── Settings/         # Настройки пользователя
│   │   ├── Cart/                 # Страница корзины
│   │   ├── Checkout/             # Страница оформления заказа
│   │   ├── NotFound/             # Страница 404
│   │   └── index.ts              # Экспорт страниц
│   ├── routes/                   # Маршрутизация
│   │   ├── PrivateRoute.tsx      # Приватный маршрут
│   │   ├── PublicRoute.tsx       # Публичный маршрут
│   │   ├── AppRoutes.tsx         # Все маршруты приложения
│   │   └── index.ts              # Экспорт маршрутов
│   ├── services/                 # Сервисы
│   │   ├── api.ts                # Базовый API клиент
│   │   ├── auth.ts               # Сервис аутентификации
│   │   ├── storage.ts            # Сервис хранения
│   │   ├── analytics.ts          # Сервис аналитики
│   │   └── index.ts              # Экспорт сервисов
│   ├── store/                    # Управление состоянием (Redux)
│   │   ├── slices/               # Redux слайсы
│   │   │   ├── authSlice.ts      # Слайс аутентификации
│   │   │   ├── cartSlice.ts      # Слайс корзины
│   │   │   ├── catalogSlice.ts   # Слайс каталога
│   │   │   ├── userSlice.ts      # Слайс пользователя
│   │   │   └── index.ts          # Экспорт слайсов
│   │   ├── store.ts              # Конфигурация хранилища
│   │   └── index.ts              # Экспорт хранилища
│   ├── types/                    # TypeScript типы
│   │   ├── auth.ts               # Типы аутентификации
│   │   ├── catalog.ts            # Типы каталога
│   │   ├── user.ts               # Типы пользователя
│   │   ├── interior-designer.ts  # Типы дизайнера интерьера
│   │   ├── virtual-showroom.ts   # Типы виртуального шоурума
│   │   ├── community.ts          # Типы социальной платформы
│   │   ├── loyalty.ts            # Типы программы лояльности
│   │   ├── tools.ts              # Типы интерактивных инструментов
│   │   ├── smart-home.ts         # Типы умного дома
│   │   ├── blog.ts               # Типы блога
│   │   ├── order.ts              # Типы заказов
│   │   └── index.ts              # Экспорт типов
│   ├── utils/                    # Утилиты
│   │   ├── formatters.ts         # Форматирование данных
│   │   ├── validators.ts         # Валидация данных
│   │   ├── helpers.ts            # Вспомогательные функции
│   │   ├── constants.ts          # Константы
│   │   └── index.ts              # Экспорт утилит
│   ├── App.tsx                   # Корневой компонент
│   ├── index.tsx                 # Точка входа
│   └── vite-env.d.ts             # Типы для Vite
├── tests/                        # Тесты
│   ├── components/               # Тесты компонентов
│   ├── hooks/                    # Тесты хуков
│   ├── pages/                    # Тесты страниц
│   └── utils/                    # Тесты утилит
├── .eslintrc.js                  # Конфигурация ESLint
├── .prettierrc                   # Конфигурация Prettier
├── tsconfig.json                 # Конфигурация TypeScript
├── vite.config.ts                # Конфигурация Vite
├── package.json                  # Зависимости и скрипты
├── Dockerfile                    # Dockerfile для фронтенда
└── README.md                     # Документация фронтенда
```

## Структура базы данных (PostgreSQL)

```
database/
├── migrations/                   # Миграции базы данных
│   ├── 001_initial_schema.sql    # Начальная схема
│   ├── 002_users_and_auth.sql    # Пользователи и аутентификация
│   ├── 003_catalog.sql           # Каталог товаров
│   ├── 004_orders.sql            # Заказы
│   ├── 005_interior_designer.sql # Дизайнер интерьера
│   ├── 006_community.sql         # Социальная платформа
│   ├── 007_loyalty.sql           # Программа лояльности
│   └── 008_smart_home.sql        # Умный дом
├── seeds/                        # Начальные данные
│   ├── 001_categories.sql        # Категории
│   ├── 002_products.sql          # Товары
│   ├── 003_users.sql             # Пользователи
│   └── 004_content.sql           # Контент
├── schema/                       # Схемы базы данных
│   ├── users.sql                 # Схема пользователей
│   ├── catalog.sql               # Схема каталога
│   ├── orders.sql                # Схема заказов
│   ├── interior_designer.sql     # Схема дизайнера интерьера
│   ├── community.sql             # Схема социальной платформы
│   ├── loyalty.sql               # Схема программы лояльности
│   └── smart_home.sql            # Схема умного дома
├── init.sql                      # Инициализация базы данных
└── README.md                     # Документация базы данных
```

## Схема базы данных

### Основные таблицы

1. **users** - Пользователи
   - id (PK)
   - email
   - password_hash
   - first_name
   - last_name
   - phone
   - role (enum: customer, admin, designer)
   - created_at
   - updated_at

2. **categories** - Категории товаров
   - id (PK)
   - name
   - slug
   - description
   - parent_id (FK -> categories.id)
   - image_url
   - is_active
   - created_at
   - updated_at

3. **products** - Товары
   - id (PK)
   - name
   - slug
   - description
   - price
   - discount_price
   - category_id (FK -> categories.id)
   - brand
   - sku
   - stock
   - is_active
   - created_at
   - updated_at

4. **product_images** - Изображения товаров
   - id (PK)
   - product_id (FK -> products.id)
   - image_url
   - is_primary
   - sort_order
   - created_at

5. **product_attributes** - Атрибуты товаров
   - id (PK)
   - product_id (FK -> products.id)
   - attribute_name
   - attribute_value
   - created_at

6. **orders** - Заказы
   - id (PK)
   - user_id (FK -> users.id)
   - status (enum: pending, processing, shipped, delivered, cancelled)
   - total_amount
   - shipping_address
   - billing_address
   - payment_method
   - created_at
   - updated_at

7. **order_items** - Элементы заказа
   - id (PK)
   - order_id (FK -> orders.id)
   - product_id (FK -> products.id)
   - quantity
   - price
   - created_at

### Таблицы для интерактивного дизайнера интерьера

8. **interior_projects** - Проекты интерьера
   - id (PK)
   - user_id (FK -> users.id)
   - name
   - description
   - layout_type
   - dimensions
   - style
   - created_at
   - updated_at

9. **interior_items** - Элементы интерьера
   - id (PK)
   - project_id (FK -> interior_projects.id)
   - product_id (FK -> products.id)
   - position_x
   - position_y
   - position_z
   - rotation
   - scale
   - created_at
   - updated_at

### Таблицы для социальной платформы

10. **community_posts** - Публикации в сообществе
    - id (PK)
    - user_id (FK -> users.id)
    - title
    - content
    - image_url
    - likes_count
    - comments_count
    - created_at
    - updated_at

11. **post_comments** - Комментарии к публикациям
    - id (PK)
    - post_id (FK -> community_posts.id)
    - user_id (FK -> users.id)
    - content
    - created_at
    - updated_at

12. **post_likes** - Лайки публикаций
    - id (PK)
    - post_id (FK -> community_posts.id)
    - user_id (FK -> users.id)
    - created_at

13. **post_product_tags** - Метки товаров на публикациях
    - id (PK)
    - post_id (FK -> community_posts.id)
    - product_id (FK -> products.id)
    - position_x
    - position_y
    - created_at

### Таблицы для программы лояльности

14. **loyalty_accounts** - Аккаунты программы лояльности
    - id (PK)
    - user_id (FK -> users.id)
    - level (enum: basic, silver, gold, platinum, vip)
    - points
    - total_spent
    - created_at
    - updated_at

15. **loyalty_transactions** - Транзакции программы лояльности
    - id (PK)
    - account_id (FK -> loyalty_accounts.id)
    - points
    - transaction_type (enum: earn, spend)
    - source (enum: purchase, activity, referral, bonus)
    - reference_id
    - created_at

16. **loyalty_rewards** - Награды программы лояльности
    - id (PK)
    - name
    - description
    - points_required
    - reward_type (enum: discount, service, product, exclusive)
    - is_active
    - created_at
    - updated_at

### Таблицы для умного дома

17. **smart_home_products** - Товары умного дома
    - id (PK)
    - product_id (FK -> products.id)
    - technology_type
    - compatibility (array: homekit, google_home, alexa)
    - features
    - created_at
    - updated_at

### Таблицы для блога

18. **blog_articles** - Статьи блога
    - id (PK)
    - title
    - slug
    - content
    - image_url
    - author_id (FK -> users.id)
    - is_published
    - published_at
    - created_at
    - updated_at

19. **blog_categories** - Категории блога
    - id (PK)
    - name
    - slug
    - created_at
    - updated_at

20. **blog_article_categories** - Связь статей и категорий
    - article_id (FK -> blog_articles.id)
    - category_id (FK -> blog_categories.id)
    - created_at

## Интеграция JWT-аутентификации

JWT-аутентификация будет реализована с использованием следующих компонентов:

1. **Бэкенд (FastAPI)**:
   - Генерация JWT-токенов при аутентификации
   - Проверка токенов для защищенных эндпоинтов
   - Обновление токенов
   - Хранение refresh-токенов в базе данных

2. **Фронтенд (React)**:
   - Хранение токенов в localStorage или httpOnly cookies
   - Автоматическое добавление токенов к запросам
   - Обработка истечения срока действия токенов
   - Перенаправление на страницу входа при необходимости

3. **Схема аутентификации**:
   - Пользователь вводит учетные данные (email/пароль)
   - Сервер проверяет учетные данные и генерирует пару токенов (access и refresh)
   - Access-токен используется для доступа к API
   - Refresh-токен используется для получения нового access-токена
   - При истечении срока действия access-токена клиент автоматически запрашивает новый с помощью refresh-токена

## Интеграция фронтенда и бэкенда

Интеграция фронтенда и бэкенда будет осуществляться через RESTful API:

1. **API-клиенты** на фронтенде для взаимодействия с бэкендом
2. **Типизированные интерфейсы** для обмена данными
3. **Документация API** с использованием Swagger/OpenAPI
4. **Обработка ошибок** и статусов ответов
5. **Кэширование** для оптимизации производительности

## Деплой и CI/CD

Для деплоя и CI/CD будут использоваться:

1. **Docker** и **Docker Compose** для контейнеризации
2. **GitHub Actions** для автоматизации сборки и тестирования
3. **Nginx** в качестве обратного прокси-сервера
4. **PostgreSQL** в качестве базы данных
5. **Redis** для кэширования и очередей задач

## Масштабируемость и производительность

Для обеспечения масштабируемости и производительности:

1. **Оптимизация запросов** к базе данных
2. **Кэширование** часто запрашиваемых данных
3. **Асинхронная обработка** тяжелых задач
4. **Оптимизация изображений** и статических ресурсов
5. **Ленивая загрузка** компонентов и данных
6. **Горизонтальное масштабирование** сервисов при необходимости
