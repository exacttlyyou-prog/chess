# 🚀 Deployment Guide - Vercel

## ✅ Ready to Deploy

Приложение полностью готово к деплою на Vercel.

---

## 📦 Что включено

### Конфигурация
- ✅ `vercel.json` - оптимизированная конфигурация
- ✅ `.vercelignore` - исключения для деплоя
- ✅ `package.json` - все зависимости
- ✅ `vite.config.ts` - Vite настроен

### Оптимизации
- ✅ **Caching:** Статика кэшируется на 1 год
- ✅ **SPA Routing:** Все маршруты ведут на index.html
- ✅ **Image Optimization:** Изображения кэшируются агрессивно
- ✅ **Code Splitting:** Lazy loading всех routes

---

## 🎯 Deploy Steps

### Вариант 1: Vercel CLI (Рекомендуется)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
cd stakechess-app
vercel

# 4. Production deploy
vercel --prod
```

### Вариант 2: Vercel Dashboard

1. Зайди на [vercel.com](https://vercel.com)
2. New Project → Import Git Repository
3. Выбери репозиторий `exacttlyyou-prog/chess`
4. Root Directory: `stakechess-app`
5. Framework Preset: **Vite**
6. Build Command: `npm run build` (автоматически)
7. Output Directory: `dist` (автоматически)
8. Deploy!

---

## ⚙️ Environment Variables

Нет необходимости в env переменных для текущей версии.

Если в будущем понадобятся (API keys, backend URL):

```bash
# Vercel Dashboard → Settings → Environment Variables
VITE_API_URL=https://your-api.com
VITE_ANALYTICS_ID=xxx
```

**Важно:** Все переменные должны начинаться с `VITE_`

---

## 🔍 Build Check

Перед деплоем проверь локальный build:

```bash
cd stakechess-app

# Install dependencies
npm install

# Build
npm run build

# Preview production build
npm run preview
```

Должно пройти без ошибок!

---

## 📊 Performance Optimizations

### Что уже сделано

1. **Lazy Loading Routes**
   ```tsx
   const Home = lazy(() => import('./pages/Home'));
   ```
   Результат: Меньше initial bundle size

2. **Image Caching**
   ```json
   "Cache-Control": "public, max-age=31536000, immutable"
   ```
   Результат: Мгновенная загрузка при повторных визитах

3. **Code Splitting**
   - Vite автоматически разбивает код
   - Каждая страница = отдельный chunk

### Что можно добавить позже

1. **WebP Images**
   ```bash
   # Конвертировать PNG → WebP (50-80% меньше)
   npm install -g @squoosh/cli
   squoosh-cli --webp auto public/images/*.png
   ```

2. **Lazy Loading Images**
   ```tsx
   <img loading="lazy" src="/images/hero.png" />
   ```

3. **Service Worker**
   ```bash
   npm install vite-plugin-pwa
   ```

---

## 🎨 Custom Domain

После деплоя добавь кастомный домен:

1. Vercel Dashboard → Project → Settings → Domains
2. Add Domain: `stakechess.com`
3. Configure DNS:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```
4. SSL автоматически через Let's Encrypt

---

## 📈 Analytics

Vercel предоставляет встроенную аналитику:

1. Project → Analytics
2. Metrics:
   - Page Views
   - Unique Visitors
   - Top Pages
   - Performance (Core Web Vitals)

**Бесплатно:** До 100k requests/месяц

---

## 🐛 Troubleshooting

### Build Failed

```bash
# 1. Проверь TypeScript ошибки
npm run build

# 2. Если ошибка с зависимостями
rm -rf node_modules package-lock.json
npm install

# 3. Проверь версии Node
node -v  # Should be 18+
```

### 404 на Routes

Проблема: SPA routing не работает

Решение: Убедись что `vercel.json` содержит:
```json
"rewrites": [
  { "source": "/(.*)", "destination": "/index.html" }
]
```

### Images не загружаются

1. Проверь пути: `/images/0_0 (74).png` (начинается с `/`)
2. Убедись что папка `public/images/` задеплоена
3. Проверь размер: Vercel лимит 50MB на файл

---

## ✅ Pre-Deploy Checklist

- [ ] `npm run build` проходит без ошибок
- [ ] Все изображения в `public/images/`
- [ ] `vercel.json` настроен
- [ ] Все routes работают локально
- [ ] TypeScript errors исправлены
- [ ] Brand colors применены (#EF3124, #2A2C2F)

---

## 🚀 Post-Deploy

После успешного деплоя:

1. **Test All Routes**
   - / (Onboarding)
   - /home
   - /game-mode
   - /matchmaking
   - /play
   - /result
   - /analysis
   - /profile

2. **Check Performance**
   - PageSpeed Insights
   - Lighthouse (в Chrome DevTools)
   - Target: 90+ score

3. **Share!**
   - Скопируй URL: `https://your-app.vercel.app`
   - Добавь README с link

---

## 📝 Deployment URL Pattern

```
Production:  https://stakechess.vercel.app
Preview:     https://stakechess-git-branch.vercel.app
Local:       http://localhost:5173
```

**Git Integration:**
- Push to `main` → Production deploy
- Push to branch → Preview deploy
- Pull Request → Auto preview

---

## 🎯 Expected Build Output

```bash
✓ building client + server bundles...
✓ built in 8.43s

dist/
├── assets/
│   ├── index-abc123.js      # Main bundle (~150KB gzipped)
│   ├── Home-def456.js        # Lazy loaded (~30KB)
│   ├── Matchmaking-ghi789.js # Lazy loaded (~25KB)
│   └── ...
├── images/
│   └── 0_0 (74).png         # All 60+ images
└── index.html               # Entry point
```

---

**Ready to Deploy!** 🚀

Просто запусти `vercel` в папке `stakechess-app` или задеплой через Vercel Dashboard.

---

**Last Updated:** 2025-11-13
**Status:** Production Ready
