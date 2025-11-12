# 🎨 Гайд по визуалам для StakeChess

## Общие требования

**Стиль:** Modern, Abstract, 3D, Premium
**Цветовая палитра:**
- Основной: Черный (#0A0A0A)
- Акцент: Ало-красный (#FF1744)
- Дополнительный: Белый, Серые оттенки

**Формат:** PNG с прозрачным фоном или WebP
**Настроение:** Премиум, технологичный, динамичный

---

## 📱 Онбординг (6 слайдов) - ПРИОРИТЕТ

### Slide 1: "Играй без границ"
**Путь:** `/public/images/onboarding/slide-1-play.png`
**Размер:** 1024x1024px
**Тема:** Абстрактная шахматная доска в 3D
**Детали:**
- Изометрическая 3D шахматная доска
- Фигуры в динамике (летят, вращаются)
- Глоу эффекты красным цветом
- Темный фон с градиентом

**Промпт для генерации:**
```
3D isometric chess board floating in dark space, chess pieces in motion,
red neon glow effects, abstract geometric shapes, premium modern design,
black background with subtle gradient, cinematic lighting, 4K quality
```

---

### Slide 2: "Следи за прогрессом"
**Путь:** `/public/images/onboarding/slide-2-progress.png`
**Размер:** 1024x1024px
**Тема:** График роста / Ступени вверх
**Детали:**
- 3D график с стрелкой вверх
- Геометрические ступени
- Красные акценты на ключевых точках
- Цифры, метрики (абстрактно)

**Промпт:**
```
3D growth chart with upward arrow, geometric stairs leading up,
red accent highlights on key points, abstract data visualization,
premium financial tech style, dark background, modern minimal design
```

---

### Slide 3: "Участвуй в турнирах"
**Путь:** `/public/images/onboarding/slide-3-tournament.png`
**Размер:** 1024x1024px
**Тема:** Трофей / Арена / Spotlight
**Детали:**
- 3D золотой трофей с шахматной фигурой
- Spotlight лучи света сверху
- Красные драматичные акценты
- Темная арена на фоне

**Промпт:**
```
3D golden trophy with chess piece on top, dramatic spotlight from above,
red accent lighting, dark arena background, championship atmosphere,
premium esports style, cinematic composition
```

---

### Slide 4: "Найди друзей"
**Путь:** `/public/images/onboarding/slide-4-community.png`
**Размер:** 1024x1024px
**Тема:** Социальные связи / Сеть
**Детали:**
- Абстрактные человеческие силуэты или аватары
- Соединительные линии между ними (как сеть)
- Красные акценты на связях
- 3D глубина

**Промпт:**
```
3D abstract human avatars connected by glowing network lines,
social connection visualization, red accent on connection points,
modern tech illustration, dark background, premium app design style
```

---

### Slide 5: "Тренируйся с AI"
**Путь:** `/public/images/onboarding/slide-5-ai.png`
**Размер:** 1024x1024px
**Тема:** Робот / AI / Искусственный интеллект
**Детали:**
- 3D робот или AI мозг
- Шахматная фигура в руках робота
- Красные неоновые линии (circuit board style)
- Футуристичный вид

**Промпт:**
```
3D AI robot holding chess piece, futuristic brain with neural networks,
red neon circuit board patterns, artificial intelligence concept,
premium tech design, dark background with particles
```

---

### Slide 6: "Готов начать?"
**Путь:** `/public/images/onboarding/slide-6-start.png`
**Размер:** 1024x1024px
**Тема:** Призыв к действию / Старт
**Детали:**
- Красная кнопка Play или стартовый портал
- Энергия, частицы вокруг
- Динамичная композиция
- "Call to action" энергия

**Промпт:**
```
3D red glowing start button or portal, energy particles and light rays,
dynamic composition, call to action design, premium app interface style,
dark background, motivational atmosphere
```

---

## 🖼️ Empty States (опционально)

### Нет друзей онлайн
**Путь:** `/public/images/empty-states/no-friends.png`
**Размер:** 600x400px
**Тема:** Пустая комната или одинокая фигура

### Нет турниров
**Путь:** `/public/images/empty-states/no-tournaments.png`
**Размер:** 600x400px
**Тема:** Пустая арена

### Нет истории
**Путь:** `/public/images/empty-states/no-history.png`
**Размер:** 600x400px
**Тема:** Пустая доска

---

## 🏠 Главная страница (опционально)

### Hero Banner
**Путь:** `/public/images/backgrounds/home-hero.png`
**Размер:** 1200x300px
**Тема:** Широкий горизонтальный баннер

### Карточки турниров
**Путь:** `/public/images/tournaments/tournament-[1-3].png`
**Размер:** 800x400px
**Тема:** Обложки турниров

---

## 🎮 Экран игры (опционально)

### Фон под доской
**Путь:** `/public/images/backgrounds/board-background.png`
**Размер:** 1080x1920px
**Тема:** Тонкий паттерн, очень прозрачный

---

## 📋 Чеклист для генерации

Приоритет 1 (сделать сразу):
- [ ] Slide 1: Играй
- [ ] Slide 2: Прогресс
- [ ] Slide 3: Турниры
- [ ] Slide 4: Друзья
- [ ] Slide 5: AI
- [ ] Slide 6: Старт

Приоритет 2 (опционально):
- [ ] Empty states (3 штуки)
- [ ] Hero banner
- [ ] Tournament covers

---

## 🔧 Как добавить картинки

1. Сгенерируй картинки по промптам выше
2. Сохрани в формате PNG или WebP
3. Помести в папку `stakechess-app/public/images/onboarding/`
4. Названия должны точно совпадать:
   - `slide-1-play.png`
   - `slide-2-progress.png`
   - `slide-3-tournament.png`
   - `slide-4-community.png`
   - `slide-5-ai.png`
   - `slide-6-start.png`

---

## 🎨 Инструменты для генерации

**Рекомендуемые:**
- **Midjourney** (лучшее качество)
- **Stable Diffusion** (бесплатно)
- **DALL-E 3** (через ChatGPT Plus)
- **Leonardo.ai** (бесплатный лимит)

**Дополнительные параметры:**
- Aspect ratio: 1:1 (square)
- Style: Modern, 3D, Abstract
- Quality: High/4K
- Lighting: Cinematic, dramatic

---

## ✅ Что уже подготовлено

- ✅ Структура папок создана
- ✅ Онбординг расширен до 6 слайдов
- ✅ Код поддерживает fallback на эмодзи (если картинки нет)
- ✅ Анимации для визуалов готовы
- ✅ Glassmorphism контейнер для картинок

**Просто добавь картинки и они сразу появятся!** 🚀
