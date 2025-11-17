import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Компонент для управления SEO meta tags
 * Поддерживает Open Graph, Twitter Cards
 */
export default function SEO({
  title = 'StakeChess - Играй в шахматы с ИИ',
  description = 'Играйте в шахматы онлайн с продвинутым ИИ. Улучшайте навыки, решайте головоломки, участвуйте в турнирах.',
  keywords = ['шахматы', 'шахматы онлайн', 'шахматный AI', 'обучение шахматам', 'турниры'],
  image = '/images/og-image.png',
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
}: SEOProps) {
  const siteTitle = title.includes('StakeChess') ? title : `${title} | StakeChess`;
  const siteUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  useEffect(() => {
    // Обновляем title
    document.title = siteTitle;

    // Функция для установки/обновления meta tag
    const setMetaTag = (name: string, content: string, property?: boolean) => {
      const attr = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Основные meta tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords.join(', '));

    // Open Graph
    setMetaTag('og:title', siteTitle, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:type', type, true);
    setMetaTag('og:url', siteUrl, true);
    setMetaTag('og:image', imageUrl, true);
    setMetaTag('og:site_name', 'StakeChess', true);

    // Twitter Cards
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', siteTitle);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', imageUrl);

    // Article-specific
    if (type === 'article') {
      if (author) setMetaTag('article:author', author, true);
      if (publishedTime) setMetaTag('article:published_time', publishedTime, true);
      if (modifiedTime) setMetaTag('article:modified_time', modifiedTime, true);
    }

    // Robots
    setMetaTag('robots', 'index, follow');
    setMetaTag('googlebot', 'index, follow');

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', siteUrl);
  }, [siteTitle, description, keywords, type, siteUrl, imageUrl, author, publishedTime, modifiedTime]);

  return null;
}

/**
 * Предустановленные SEO конфигурации
 */
export function HomeSEO() {
  return (
    <SEO
      title="StakeChess - Играй в шахматы с ИИ"
      description="Лучшая платформа для игры в шахматы онлайн. Сражайтесь с умным AI, решайте головоломки, участвуйте в турнирах."
      keywords={['шахматы онлайн', 'играть в шахматы', 'шахматный AI']}
    />
  );
}

export function PremiumSEO() {
  return (
    <SEO
      title="Premium - Расширенные возможности"
      description="Получите доступ к расширенному AI анализу, неограниченным играм, эксклюзивным турнирам. 7 дней бесплатно!"
      keywords={['шахматы premium', 'AI анализ', 'шахматные турниры']}
    />
  );
}
