# PFinance

PFinance — mobile-first веб-приложение для простого семейного учёта финансов.

Сейчас репозиторий содержит только подготовленную техническую основу и чистую стартовую страницу. Продуктовая логика ещё не реализована.

## Стек

- Next.js 16;
- React 19;
- TypeScript;
- App Router;
- Tailwind CSS 4;
- ESLint;
- Vercel.

## Запуск

```bash
npm install
cp .env.example .env.local
npm run dev
```

Приложение будет доступно по адресу `http://localhost:3000`.

## Проверки

```bash
npm run lint
npm run build
```

## Структура

```text
app/
  globals.css    глобальные стили и Tailwind
  layout.tsx     корневой layout и metadata
  page.tsx       стартовая страница
docs/
  PRODUCT.md     назначение и границы продукта
NEXT.md          план следующих этапов
```
