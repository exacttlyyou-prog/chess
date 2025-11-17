# StakeChess - UX/CJM/Design Improvements Roadmap

## Статистика

**Всего улучшений:** 120

### По категориям:
- **CJM (Customer Journey):** 18 пунктов
- **UX:** 43 пункта
- **Visual:** 17 пунктов
- **Accessibility:** 15 пунктов
- **Business:** 15 пунктов
- **Performance:** 10 пунктов
- **Content:** 2 пункта

### По приоритетам:
- **CRITICAL:** 20 пунктов ⚠️
- **HIGH:** 52 пункта
- **MEDIUM:** 38 пунктов
- **LOW:** 10 пунктов

---

## 🔥 КРИТИЧЕСКИЕ ПРОБЛЕМЫ (TOP 20)

### 1. Error Boundary (id: 92) - CRITICAL
**Проблема:** Нет Error Boundary - при crash показывается белый экран
**Файл:** `/src/App.tsx:51`
**Effort:** 2h

### 2. Onboarding loading state (id: 2) - CRITICAL
**Проблема:** Нет индикации при авторизации через Telegram/Alfa ID
**Файл:** `/src/pages/Onboarding.tsx:63`
**Effort:** 30m

### 3. Информационная перегрузка Home (id: 5) - CRITICAL
**Проблема:** Главный экран содержит слишком много элементов
**Файл:** `/src/pages/Home.tsx:100`
**Effort:** 4h

### 4. GameMode tooltips (id: 11) - CRITICAL
**Проблема:** Нет разъяснения режимов для новичков
**Файл:** `/src/pages/GameMode.tsx:6`
**Effort:** 1h

### 5. MatchSearch cancel (id: 16) - CRITICAL
**Проблема:** Нельзя отменить на стадии 'found'
**Файл:** `/src/pages/MatchSearch.tsx:124`
**Effort:** 30m

### 6. GamePlay pause (id: 21) - CRITICAL
**Проблема:** Нет функции паузы в игре с AI
**Файл:** `/src/pages/GamePlay.tsx:121`
**Effort:** 2h

### 7. AI analysis limit (id: 23) - CRITICAL
**Проблема:** Free users не видят лимит 3/день
**Файл:** `/src/pages/GamePlay.tsx:238`
**Effort:** 1h

### 8. Touch targets size (id: 25) - CRITICAL
**Проблема:** Кнопки меньше 44px
**Файл:** `/src/pages/GamePlay.tsx:238`
**Effort:** 30m

### 9. Premium A/B testing (id: 39) - CRITICAL
**Проблема:** Нет тестирования цен
**Файл:** `/src/pages/Premium.tsx:223`
**Effort:** 4h

### 10. Premium trial (id: 44) - CRITICAL
**Проблема:** Нет пробного периода
**Файл:** `/src/pages/Premium.tsx:55`
**Effort:** 4h

### 11. BottomNav touch target (id: 50) - CRITICAL
**Проблема:** 56px вместо минимум 64px (Apple HIG)
**Файл:** `/src/components/BottomNav.tsx:35`
**Effort:** 15m

### 12. ChessBoard audio cue (id: 52) - CRITICAL
**Проблема:** Нет звука когда время <30 сек
**Файл:** `/src/components/ChessBoard.tsx:52`
**Effort:** 1h

### 13. ChessBoard keyboard (id: 57) - CRITICAL
**Проблема:** Нет keyboard navigation
**Файл:** `/src/components/ChessBoard.tsx:420`
**Effort:** 4h

### 14. Text contrast (id: 62) - CRITICAL
**Проблема:** #b0b0b0 может не соответствовать WCAG AA
**Файл:** `/src/index.css:18`
**Effort:** 30m

### 15. Tournaments no details (id: 83) - CRITICAL
**Проблема:** Нельзя посмотреть детали без Premium
**Файл:** `/src/pages/Tournaments.tsx:34`
**Effort:** 2h

### 16. Breadcrumb navigation (id: 88) - CRITICAL
**Проблема:** Пользователь теряет контекст на глубоких страницах
**Файл:** `/src/App.tsx:26`
**Effort:** 2h

### 17. Skip to content (id: 93) - CRITICAL
**Проблема:** Нет skip link для keyboard users
**Файл:** `/src/App.tsx:51`
**Effort:** 30m

### 18. Onboarding preferences (id: 98) - CRITICAL
**Проблема:** Нет сбора skill level и целей
**Файл:** `/src/pages/Onboarding.tsx:63`
**Effort:** 2h

### 19. Language support (id: 108) - CRITICAL
**Проблема:** Только русский язык
**Файл:** `/src/App.tsx:1`
**Effort:** 4h

### 20. Conversion tracking (id: 120) - CRITICAL
**Проблема:** Нет отслеживания drop-off
**Файл:** `/src/App.tsx:1`
**Effort:** 2h

---

## 📊 SPRINT PLAN (Priority-based)

### Phase 1: Quick Wins (Day 1) - 4-6h
**Focus:** Быстрые улучшения с высоким impact

- [ ] #2: Onboarding loading state (30m)
- [ ] #5: MatchSearch cancel button (30m)
- [ ] #8: Touch targets увеличить до 44px (30m)
- [ ] #11: BottomNav height до 64px (15m)
- [ ] #14: Текст контраст исправить (30m)
- [ ] #17: Skip to content link (30m)
- [ ] #12: Режимы игры tooltips (1h)
- [ ] #7: AI analysis лимит показывать (1h)

### Phase 2: Critical UX (Day 2-3) - 12-16h
**Focus:** Основные UX проблемы

- [ ] #1: Error Boundary добавить (2h)
- [ ] #3: Home упростить структуру (4h)
- [ ] #6: GamePlay pause функция (2h)
- [ ] #15: Tournaments details без Premium (2h)
- [ ] #16: Breadcrumb navigation (2h)
- [ ] #18: Onboarding skill level (2h)

### Phase 3: Accessibility (Day 4) - 8-10h
**Focus:** A11y compliance

- [ ] #13: Keyboard navigation для доски (4h)
- [ ] #37: Screen reader labels (1h)
- [ ] #66: Button контраст (30m)
- [ ] #74: ARIA labels для toggles (30m)
- [ ] #116: Focus management modals (2h)

### Phase 4: Business & Monetization (Day 5-6) - 16h
**Focus:** Увеличение конверсии и retention

- [ ] #9: Premium A/B testing (4h)
- [ ] #10: Premium trial period (4h)
- [ ] #30: Upsell триггеры в игре (2h)
- [ ] #40: Urgency countdown (2h)
- [ ] #99: Referral программа (4h)

### Phase 5: Performance (Day 7) - 8-10h
**Focus:** Скорость и оптимизация

- [ ] #54: Particle effects оптимизация (2h)
- [ ] #64: Backdrop-blur conditional (2h)
- [ ] #89: Route prefetching (2h)
- [ ] #94: Service Worker PWA (4h)

### Phase 6: Content & Polish (Day 8-9) - 12-16h
**Focus:** Контент и финальные доработки

- [ ] #19: Language i18n (4h)
- [ ] #95: Analytics integration (2h)
- [ ] #99: Referral system (4h)
- [ ] #100: Global search (4h)
- [ ] #103: Help Center (4h)

---

## 📝 Полный список всех 120 пунктов

См. детальный JSON в коммите или отдельном файле.

---

**Дата создания:** 2025-11-16
**Статус:** В работе
**Текущий Sprint:** Phase 1 - Quick Wins
