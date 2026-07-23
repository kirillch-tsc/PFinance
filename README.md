# PFinance

PFinance — mobile-first веб-приложение для простого семейного учёта финансов.

## Стек

- Next.js 16;
- React 19;
- TypeScript;
- App Router;
- Tailwind CSS 4;
- SQLite (файл `data/pfinance.db`) через Drizzle ORM — постоянное хранилище;
- ESLint;
- Vercel.

## Запуск

```bash
npm install
cp .env.example .env.local
npm run db:migrate
npm run dev
```

Приложение будет доступно по адресу `http://localhost:3000`.

`npm run db:migrate` создаёт (или обновляет) файл `data/pfinance.db` и должен выполняться перед первым запуском и после каждого обновления схемы. Без применённых миграций приложение отвечает понятной ошибкой хранилища вместо падения.

## База данных

По умолчанию (`STORAGE_BACKEND=sqlite`, либо переменная не задана) приложение хранит данные в SQLite-файле, путь к которому задаётся `PFINANCE_DB_PATH` (по умолчанию `data/pfinance.db`). Браузерная часть обращается к базе через Route Handlers в `app/api/**`, так как SQLite доступен только на сервере.

`STORAGE_BACKEND=in-memory` держит данные только в памяти процесса и ничего не пишет на диск — этот режим предназначен исключительно для автоматических тестов и отладки, не для повседневного использования.

### Миграции

```bash
npm run db:generate   # сгенерировать SQL-миграцию после изменения src/storage/sqlite/schema.ts
npm run db:migrate     # применить миграции к data/pfinance.db (или к пути из PFINANCE_DB_PATH)
```

### Импорт из Баланс.xlsx

Исторические данные, извлечённые из `Баланс.xlsx`, зафиксированы в `src/storage/imports/balance-import.ts` (проверено тестом `tests/balance-import.test.ts`, сверено с балансом 548032 ₽). Раньше они автоматически подставлялись в память при каждом запуске приложения; теперь это осознанное разовое действие:

```bash
npm run db:import-excel-seed
```

Команда отказывается работать, если в базе уже есть хотя бы один счёт (чтобы не создать дубликаты). Для повторного импорта в заведомо пустую базу используйте `npm run db:import-excel-seed -- --force`.

### Backup и restore

```bash
npm run db:backup                 # создать копию в data/backups/pfinance-<дата>.db
npm run db:restore -- latest      # восстановить самую свежую копию
npm run db:restore -- <файл>      # восстановить конкретный файл из data/backups/
```

`db:restore` перед восстановлением всегда сохраняет текущую базу в `data/backups/pre-restore-<время>.db` — восстановление не может привести к безвозвратной потере данных.

## Проверки

```bash
npm test
npm run lint
npm run build
```

`npm test` включает smoke-тест `tests/sqlite-persistence-smoke.test.ts`: он создаёт временную базу, применяет к ней миграции, проводит операцию через создание, редактирование и удаление, закрывает соединение и открывает файл заново — так проверяется, что данные действительно сохраняются между перезапусками, а не только живут в памяти теста.

## Структура

```text
app/
  api/             Route Handlers — мост между браузером и SQLite
  (product)/       экраны приложения и client-runtime.tsx (выбор реализации хранения)
drizzle/           сгенерированные SQL-миграции (npm run db:generate)
scripts/           db:migrate, db:import-excel-seed, db:backup, db:restore
src/
  business/        продуктовые правила и сценарии
  storage/
    contracts/     интерфейсы хранения, не зависящие от реализации
    sqlite/        реализация поверх Drizzle + better-sqlite3 (сервер)
    remote/        fetch-реализация тех же контрактов (браузер)
    in-memory/     реализация для тестов и STORAGE_BACKEND=in-memory
    imports/       зафиксированные данные из Баланс.xlsx
  ui/              экраны и представление
docs/
  ARCHITECTURE.md   техническая структура
  DECISIONS.md      журнал принятых решений
  PRODUCT.md        назначение и границы продукта
  PROJECT_RULES.md  обязательные правила изменений
  ROADMAP.md        единственный источник этапов
  UI_REFERENCE.md   направление интерфейса
NEXT.md          ближайшие рабочие задачи
```
