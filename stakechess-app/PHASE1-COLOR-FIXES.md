# StakeChess UI Fixes - Инструкция для разработчиков

## Фаза 1: Цветовые исправления (Quick Wins)

**Приоритет:** КРИТИЧНО
**Сложность:** Низкая
**Время:** 1-2 дня
**Эффект:** Решает 80% проблем с контрастом

---

## Быстрый старт

### 1. Подключение стилей

```jsx
// Добавить в основной layout или App.js
import './styles/stakechess-phase1-fixes.css';
```

Или добавить напрямую в HTML:
```html
<link rel="stylesheet" href="./stakechess-phase1-fixes.css">
```

### 2. Применение классов к компонентам

---

## Компонент: Выбор режима игры

**Файл:** `GameModeSelection.jsx` (или аналогичный)

### До:
```jsx
<div className="mode-card">
  <div className="mode-icon">⚡</div>
  <div className="mode-name">Блиц</div>
  <div className="mode-time">3+2</div>
</div>
```

### После:
```jsx
<div className="game-mode-card game-mode-blitz">
  <div className="mode-icon">⚡</div>
  <div className="mode-name">Блиц</div>
  <div className="mode-time">3+2</div>
</div>
```

### Маппинг классов:

| Режим | Добавить класс |
|-------|---------------|
| Блиц | `game-mode-blitz` |
| Рапид | `game-mode-rapid` |
| Пуля | `game-mode-bullet` |
| Классика | `game-mode-classic` |

### Пример с условным рендерингом:

```jsx
const GameModeCard = ({ mode }) => {
  const getModeClass = (mode) => {
    const classes = {
      blitz: 'game-mode-blitz',
      rapid: 'game-mode-rapid',
      bullet: 'game-mode-bullet',
      classic: 'game-mode-classic'
    };
    return classes[mode] || '';
  };

  return (
    <div className={`game-mode-card ${getModeClass(mode)}`}>
      {/* ... */}
    </div>
  );
};
```

---

## Компонент: Недавние партии

**Файл:** `RecentGames.jsx` (или аналогичный)

### До:
```jsx
<div className="game-card">
  <div className="game-player">Мастер_1450</div>
  <div className="game-details">
    <span>Блиц 3+2</span>
    <span>32 хода</span>
  </div>
</div>
```

### После:
```jsx
<div className={`recent-game-card recent-game-${result}`}>
  <span className="game-status-badge">{statusLabel}</span>
  <div className="game-player">Мастер_1450</div>
  <div className="game-details">
    <span>Блиц 3+2</span>
    <span>32 хода</span>
  </div>
</div>
```

### Маппинг статусов:

| Результат | Класс | Badge Label |
|-----------|-------|-------------|
| Победа | `recent-game-win` | "Победа" |
| Поражение | `recent-game-loss` | "Поражение" |
| Ничья | `recent-game-draw` | "Ничья" |

### Пример:

```jsx
const RecentGameCard = ({ game }) => {
  const getGameClass = (result) => {
    const classes = {
      win: 'recent-game-win',
      loss: 'recent-game-loss',
      draw: 'recent-game-draw'
    };
    return classes[result] || '';
  };

  const getStatusLabel = (result) => {
    const labels = {
      win: 'Победа',
      loss: 'Поражение',
      draw: 'Ничья'
    };
    return labels[result] || '';
  };

  return (
    <div className={`recent-game-card ${getGameClass(game.result)}`}>
      <span className="game-status-badge">{getStatusLabel(game.result)}</span>
      <div className="game-player">{game.opponent}</div>
      <div className="game-details">
        <span>{game.mode}</span>
        <span>{game.moves} ходов</span>
      </div>
    </div>
  );
};
```

---

## Компонент: AI Анализ

**Файл:** `AIAnalysisModal.jsx` (или аналогичный)

### До:
```jsx
<div className="analysis-item">
  <div className="analysis-label">Оценка позиции</div>
  <div className="analysis-value">Unable to analyze</div>
</div>
```

### После:
```jsx
<div className="analysis-item analysis-error">
  <div className="analysis-label">
    <span className="status-dot"></span>
    Оценка позиции
  </div>
  <div className="analysis-value">Unable to analyze</div>
</div>
```

### Маппинг типов:

| Тип | Класс | Цвет точки |
|-----|-------|-----------|
| Ошибка | `analysis-error` | Красный |
| Успех | `analysis-success` | Зеленый |
| Нейтральный | `analysis-neutral` | Серый |
| Информация | `analysis-info` | Фиолетовый |

### Пример:

```jsx
const AnalysisItem = ({ type, label, value }) => {
  const getAnalysisClass = (type) => {
    const classes = {
      error: 'analysis-error',
      success: 'analysis-success',
      neutral: 'analysis-neutral',
      info: 'analysis-info'
    };
    return classes[type] || 'analysis-neutral';
  };

  return (
    <div className={`analysis-item ${getAnalysisClass(type)}`}>
      <div className="analysis-label">
        <span className="status-dot"></span>
        {label}
      </div>
      <div className="analysis-value">{value}</div>
    </div>
  );
};
```

---

## Компонент: Верхние карточки действий

**Файл:** `ActionCards.jsx` (или аналогичный)

### До:
```jsx
<div className="action-card">
  <div className="action-icon">⚡</div>
  <div className="action-title">Быстрая игра</div>
  <div className="action-subtitle">Начни партию прямо сейчас</div>
</div>
```

### После:
```jsx
<div className="action-card action-quick-game">
  <div className="action-icon">⚡</div>
  <div className="action-title">Быстрая игра</div>
  <div className="action-subtitle">Начни партию прямо сейчас</div>
</div>
```

### Маппинг:

| Действие | Класс |
|----------|-------|
| Быстрая игра | `action-quick-game` |
| Турниры | `action-tournament` |

---

## Checklist для тестирования

### Визуальная проверка

- [ ] Режимы игры имеют разные цвета
- [ ] Левая граница у режимов видна
- [ ] Hover эффекты работают плавно
- [ ] Победа = зеленый, поражение = красный, ничья = серый
- [ ] AI анализ: ошибки красные, успехи зеленые
- [ ] Верхние карточки выделяются на фоне
- [ ] Все transition'ы плавные (0.3s)

### Кросс-браузерность

- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Адаптивность

- [ ] Desktop (1920px+)
- [ ] Laptop (1366px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

### Контрастность

- [ ] Текст читаем на всех фонах
- [ ] WCAG AA соблюдается
- [ ] Темный режим работает корректно

---

## Возможные проблемы и решения

### Проблема 1: Стили не применяются

**Решение:**
```jsx
// Проверить порядок импорта
// Файл phase1-fixes.css должен быть ПОСЛЕ основных стилей
import './styles/main.css';
import './styles/stakechess-phase1-fixes.css'; // ✓ Правильно
```

### Проблема 2: Классы конфликтуют

**Решение:**
```jsx
// Использовать className вместо перезаписи
<div className={`existing-class new-class ${conditionalClass}`}>
```

### Проблема 3: Hover не работает на мобильных

**Решение:**
```css
/* Добавить touch states */
@media (hover: none) {
  .game-mode-card:active {
    /* Стили для мобильных */
  }
}
```

---

## Производительность

### CSS-переменные кэшируются браузером
- ✓ Нет вычислений во время рендера
- ✓ Минимальный reflow/repaint
- ✓ GPU-accelerated transitions

### Bundle size
- Размер CSS: ~8KB (unminified)
- После minify: ~4KB
- После gzip: ~1.5KB

---

## Следующие шаги (Фаза 2)

После внедрения Фазы 1:

1. **Интеграция изображений** (3D-визуализации фигур)
2. **Анимации переходов**
3. **Micro-interactions**
4. **Dark/Light mode toggle**

---

## Контакты

**Вопросы по внедрению:**
- Slack: #stakechess-dev
- Email: dev@stakechess.ru

**Дизайн-система:**
- Figma: [ссылка на макеты]
- Storybook: [ссылка на storybook]

---

## Версия

**Phase 1.0.0**
Дата: 15.11.2025
Автор: AI Content Team

**Changelog:**
- v1.0.0: Initial release с основными цветовыми исправлениями

---

## Статус внедрения

### ✅ Реализовано

#### GameMode.tsx (src/pages/GameMode.tsx:122-142)
- ✅ Цветовая дифференциация режимов игры
- ✅ 3px левая граница для каждого режима:
  - Блиц: `#ff3b30` (красный)
  - Рапид: `#ffcc00` (желтый)
  - Пуля: `#5e5ce6` (фиолетовый)
  - Классика: `#30d158` (зеленый)
- ✅ Градиентные фоны с уникальными оттенками
- ✅ Hover эффекты с тенями

#### Home.tsx (src/pages/Home.tsx:389-402)
- ✅ Цветовое кодирование результатов партий:
  - Победа: `rgba(48, 209, 88, 0.08)` фон + зеленая граница
  - Поражение: `rgba(255, 59, 48, 0.08)` фон + красная граница
  - Ничья: `#2a2a2a` фон + белая граница
- ✅ Бейджи статуса с соответствующими цветами

#### Home.tsx - Быстрые действия (src/pages/Home.tsx:177, 193)
- ✅ Улучшенный контраст: фон `#2a2a2a`
- ✅ Карточки выделяются на фоне

#### Home.tsx - King Premium (src/pages/Home.tsx:211)
- ✅ Золотое свечение
- ✅ Градиентная граница `border-yellow-500/30`
- ✅ Box-shadow с золотым оттенком

### 📋 Отличия от инструкции

Реализация использует **Tailwind CSS** вместо отдельного CSS-файла:
- Inline стили через `className` и `style` prop
- Условные классы через тернарные операторы
- Более современный подход с меньшей связностью

### 🔄 Следующие шаги

1. Убедиться, что все цвета корректно отображаются в браузере
2. Проверить контрастность на разных устройствах
3. Протестировать hover/active состояния на мобильных устройствах
