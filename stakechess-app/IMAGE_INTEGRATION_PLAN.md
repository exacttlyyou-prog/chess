# 🎨 План интеграции изображений

## Структура папок для изображений

```
stakechess-app/public/images/
├── onboarding/          # 6 изображений для онбординга
│   ├── slide-1-play.png
│   ├── slide-2-progress.png
│   ├── slide-3-tournament.png
│   ├── slide-4-community.png
│   ├── slide-5-ai.png
│   └── slide-6-start.png
├── modes/               # Изображения для режимов игры
│   ├── blitz-bg.png
│   ├── rapid-bg.png
│   ├── bullet-bg.png
│   ├── classic-bg.png
│   └── ai-training.png
├── backgrounds/         # Фоновые изображения для экранов
│   ├── home-hero.png
│   ├── tournament-hall.png
│   └── profile-bg.png
├── achievements/        # Изображения для достижений
│   ├── first-win.png
│   ├── win-streak.png
│   ├── blitz-master.png
│   ├── tactician.png
│   ├── grandmaster.png
│   └── tournament-winner.png
└── empty-states/        # Пустые состояния
    ├── no-games.png
    └── no-friends.png
```

## 📍 Места интеграции изображений

### 1. **Онбординг** (`src/pages/Onboarding.tsx`)
**6 слайдов с изображениями**

```typescript
const slides = [
  {
    title: 'Играй без границ',
    description: 'Классические шахматы и быстрые партии с игроками со всего мира',
    icon: '♟',
    image: '/images/onboarding/slide-1-play.png',
  },
  // ... остальные 5 слайдов
];
```

**Что искать в изображениях:**
- Slide 1: Шахматная доска, игроки, онлайн-игра
- Slide 2: Прогресс, рейтинг, рост навыков
- Slide 3: Турниры, соревнования, кубки
- Slide 4: Сообщество, друзья, чат
- Slide 5: AI, робот, тренировка
- Slide 6: Старт, приветствие, регистрация

**Размер:** 1024x1024px, квадрат
**Формат:** PNG с прозрачностью (опционально)

---

### 2. **Главная страница** (`src/pages/Home.tsx`)

#### Фоновое изображение героя (опционально)
```tsx
// В stats card можно добавить background-image
className="glass-card p-8 mb-6 bg-gradient-to-br from-stake-red/20 to-transparent"
style={{ backgroundImage: 'url(/images/backgrounds/home-hero.png)' }}
```

#### Карточки быстрых действий
```typescript
const quickActions = [
  { id: 'quick', title: 'Быстрая игра', Icon: Zap, image: '/images/modes/blitz-bg.png' },
  { id: 'ai', title: 'Игра с AI', Icon: Bot, image: '/images/modes/ai-training.png' },
  // ...
];
```

**Что искать:**
- Быстрая игра: Динамика, скорость, молния
- AI: Робот/компьютер играет в шахматы
- Турниры: Кубки, медали, толпа
- С другом: Два игрока, локальная игра

---

### 3. **Выбор режима** (`src/pages/GameMode.tsx`)

#### Карточки режимов игры
```typescript
const gameModes = [
  {
    id: 'blitz',
    title: 'Блиц',
    Icon: Zap,
    bgImage: '/images/modes/blitz-bg.png',  // Добавить это поле
  },
  // ...
];
```

**Интеграция:**
```tsx
<motion.button
  className="glass-card p-6 relative overflow-hidden"
  style={{
    backgroundImage: `url(${mode.bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <div className="absolute inset-0 bg-gradient-to-t from-stake-black/90 to-stake-black/40" />
  {/* Контент поверх */}
</motion.button>
```

**Что искать:**
- Блиц: Быстрые часы, молния, динамика
- Рапид: Умеренный темп, стратегия
- Пуля: Экстремальная скорость, адреналин
- Классика: Элегантность, длинная партия
- AI тренировка: Робот, обучение, практика

---

### 4. **Профиль** (`src/pages/Profile.tsx`)

#### Фон профиля (опционально)
```tsx
<div className="glass-card p-8 text-center relative">
  <div
    className="absolute inset-0 rounded-2xl opacity-10"
    style={{ backgroundImage: 'url(/images/backgrounds/profile-bg.png)' }}
  />
  {/* Контент */}
</div>
```

#### Достижения с изображениями
```typescript
const achievements = [
  {
    id: 1,
    title: 'Первая победа',
    Icon: Target,
    image: '/images/achievements/first-win.png',  // Добавить
    unlocked: true,
  },
  // ...
];
```

**Что искать:**
- Первая победа: Трофей, первое место
- Серия побед: Огонь, пламя, streak
- Мастер блица: Молния + мастерство
- Тактик: Мозг, стратегия, паззл
- Гроссмейстер: Корона, величие
- Турнирный игрок: Кубок, победа

---

### 5. **Игровое поле** (`src/pages/GamePlay.tsx`)

Здесь изображения не нужны - доска уже реализована через CSS grid.

---

## 🎯 Приоритет интеграции

### Высокий приоритет (критично для UX):
1. ✅ **Онбординг** (6 слайдов) - первое впечатление
2. ✅ **Режимы игры** (5 карточек) - визуальное разнообразие
3. ✅ **AI тренировка** - должна выделяться

### Средний приоритет:
4. **Главная страница** - фон героя и карточки действий
5. **Турниры** - визуал турнирных карточек
6. **Достижения** - иконки достижений

### Низкий приоритет (можно добавить позже):
7. Фоны экранов
8. Empty states
9. Декоративные элементы

---

## 📐 Требования к изображениям

### Размеры:
- **Онбординг:** 1024x1024px (квадрат)
- **Карточки режимов:** 800x600px (горизонтальный)
- **Фоны:** 1920x1080px (широкий)
- **Достижения:** 512x512px (квадрат)

### Стиль:
- **Цвета:** Черный фон + красные акценты (#FF1744)
- **Стиль:** 3D, modern, futuristic
- **Настроение:** Премиум, роскошь, драматизм
- **Качество:** High-res, sharp, cinematic

### Формат:
- **PNG** с прозрачностью (где возможно)
- **JPG** для фонов
- **WebP** для оптимизации (опционально)

---

## 🚀 Быстрая интеграция

Когда изображения будут готовы:

1. **Загрузить** в соответствующие папки
2. **Обновить** пути в компонентах
3. **Добавить fallback** для отсутствующих изображений
4. **Оптимизировать** размер (compression)
5. **Протестировать** на разных экранах

---

## 💡 Дополнительные идеи

### Lazy loading:
```tsx
<img
  loading="lazy"
  src={slide.image}
  alt={slide.title}
/>
```

### Градиент оверлей:
```css
.image-overlay {
  position: relative;
}

.image-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10, 10, 10, 0.9), transparent);
}
```

### Parallax эффект (для фонов):
```tsx
const handleScroll = () => {
  const offset = window.pageYOffset;
  backgroundRef.current.style.transform = `translateY(${offset * 0.5}px)`;
};
```

---

**Готов к интеграции! 🎨**
