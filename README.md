# api-template

![ts](https://img.shields.io/badge/Typescript-v5.3-3178c6)
![Node Version](https://img.shields.io/badge/NodeJS-v20.11.0-026e00)
![MongoDB](https://img.shields.io/badge/MongoDB-v6.3-00ed64)
![express](https://img.shields.io/badge/Express-v4.18-259dff)

- [Вводная](#Вводная)
- [Конфигурация](#Конфигурация)
- [Запуск проекта в режиме разработки](#Запуск-проекта-в-режиме-разработки)
- [Сборка и поднятие прода](#Сборка-и-поднятие-прода)
- [Бэкапы mongodb](#Бэкапы-mongodb)
  - [На целевой машине](#На-целевой-машине)
  - [На новой машине](#На-новой-машине)

## Вводная

Этот репозиторий содержит шаблон приложения на Node.js, использующего MongoDB в качестве базы данных и TypeScript для повышения безопасности и масштабируемости кода.

Подразумевается, что разработка приложения будет вестись без использования контейнера для приложения nodejs. По этому, стоит установить актуальную для проекта версию `node`. База данных, в виде mongodb, будет в контейнере для которой уже подготовлен docker конфиг.

## Конфигурация

0. Имя проекта.

```
В проекте часто встречаются названия `template`, что правильно для данного репозитория. Но если вы разрабатываете новое приложение, то стоит заменить их. Например, с помощью поиска.
```

1. Заполнить `.env` файл. По умолчанию, они пробрасываются в контейнер монги и как переменные окружения на сервер

```properties
# Конфиг сервера
PORT=3000 # Порт сервера

# Конфиг монги
MONGO_PORT=27017
MONGO_HOST=127.0.0.1
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=1234
```

2. Создать сеть в которой будут находиться контейнеры

```bash
docker network create template-network
```

3. Поставить пакеты

```bash
npm i
```

4. Поднять контейнер с монгой

```bash
docker-compose --env-file ./.env \
  -f bin/mongodb/docker-compose.yml up -d
```

## Запуск проекта в режиме разработки

```bash
npm run dev
```

## Сборка и поднятие прода

```bash
docker-compose --env-file ./.env \
  -f bin/app/docker-compose.yml build
```

```bash
docker-compose --env-file ./.env \
  -f bin/app/docker-compose.yml up -d
```

## Бэкапы mongodb

> Важный момент. Описанные ниже команды напрямую зависит от конфигурации контейнера. Если что-то поменять в `bin/mongodb/docker-compose.yml`, то придется поправить и команды.

Поскольку монга смонтирована в именованный том(он же `volume`), то его можно упоковать в архив
и отправить на любую тачку. Ниже описаны команды для упаковки любого тома в архив, а так же процесс его распаковки на другой машине и переноса в том.

### На целевой машине

Устройство на котором развернут контейнер и с нужно перенести данные.

1. Для целосности данных, стоит предварительно потушить контейнер:

```bash
docker-compose -f bin/mongodb/docker-compose.yml down
```

2. Создаем папку для бэкапов

```bash
mkdir backups
```

3. После, с помощ `docker run` создаем архив, используя контейнер busybox или любой другой лёгкий контейнер, имеющий доступ к tar, и сразу же скопируем его на локальный компьютер:

```bash
docker run --rm -v template-app-mongodb-data:/data busybox \
  tar czf - -C /data . > ./backups/mongodb-data-backup.tar.gz
```

- `template-app-mongodb-data` — Название именованного тома
- `./backups/mongodb-data-backup.tar.gz` — Путь к итоговому архиву с бэкапом тома

4. Полученный архив можно переносить на новое устройство в каталог с проектом

### На новой машине

Устройство на котором нужно создать том и обогатить его данными с целевой машины.

1. Создаем временный каталог:

```bash
mkdir temp
```

2. Нужно распоковать архив во временную директорию:

```bash
tar xvzf mongodb-data-backup.tar.gz -C temp
```

3. Создаем новый Docker volume на новой машине (если он ещё не создан):

```bash
docker volume create template-app-mongodb-data
```

4. Копируем распакованные данные в новый Docker volume:

```bash
docker run --rm -v template-app-mongodb-data:/target \
  -v $(pwd)/temp:/source busybox \
  cp -a /source/. /target/
```

5. Проверяем целосность данных:

```bash
docker run --rm -v template-app-mongodb-data:/data busybox ls -l /data
```

6. Можно удалить временный каталог и архив с бэкапом

```bash
rm -rf temp && rm mongodb-data-backup.tar.gz
```
