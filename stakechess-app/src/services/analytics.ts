/**
 * !8AB5<0 0=0;8B8:8 4;O >BA;56820=8O ?>;L7>20B5;LA:8E A>1KB89
 * =B53@0F8O A /=45:A.5B@8:0, Google Analytics, 8;8 :0AB><=K< 1M:5=4><
 */

export type AnalyticsEvent =
  | 'page_view'
  | 'premium_view'
  | 'premium_upgrade_clicked'
  | 'trial_started'
  | 'game_started'
  | 'game_completed'
  | 'ai_analysis_used'
  | 'tournament_viewed'
  | 'onboarding_completed'
  | 'skill_level_selected';

export interface AnalyticsEventData {
  event: AnalyticsEvent;
  properties?: Record<string, string | number | boolean>;
  timestamp?: number;
  userId?: string;
  sessionId?: string;
}

class AnalyticsService {
  private queue: AnalyticsEventData[] = [];
  private sessionId: string;
  private isEnabled: boolean;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.isEnabled = import.meta.env.PROD;
  }

  /**
   * BA;56820=85 A>1KB8O
   */
  track(event: AnalyticsEvent, properties?: Record<string, string | number | boolean>) {
    if (!this.isEnabled) {
      console.log('[Analytics]', event, properties);
      return;
    }

    const eventData: AnalyticsEventData = {
      event,
      properties,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.getUserId(),
    };

    this.queue.push(eventData);
    this.sendEvent(eventData);
  }

  /**
   * BA;56820=85 ?@>A<>B@0 AB@0=8FK
   */
  pageView(pageName: string, properties?: Record<string, string | number>) {
    this.track('page_view', {
      page: pageName,
      ...properties,
    });
  }

  /**
   * BA;56820=85 :>=25@A88 Premium
   */
  trackPremiumConversion(variant: string, action: 'view' | 'click' | 'convert') {
    this.track(action === 'view' ? 'premium_view' : 'premium_upgrade_clicked', {
      variant,
      action,
      timestamp: Date.now(),
    });
  }

  /**
   * BA;56820=85 8A?>;L7>20=8O AI 0=0;870
   */
  trackAIAnalysis(count: number, isLimit: boolean) {
    this.track('ai_analysis_used', {
      count,
      hit_limit: isLimit,
    });
  }

  /**
   * BA;56820=85 =0G0;0 83@K
   */
  trackGameStart(mode: string, opponent: string) {
    this.track('game_started', {
      mode,
      opponent,
    });
  }

  /**
   * BA;56820=85 7025@H5=8O 83@K
   */
  trackGameComplete(result: 'win' | 'loss' | 'draw', duration: number) {
    this.track('game_completed', {
      result,
      duration_seconds: Math.round(duration / 1000),
    });
  }

  /**
   * BA;56820=85 >=1>@48=30
   */
  trackOnboarding(step: 'started' | 'skill_selected' | 'completed', skillLevel?: string) {
    if (step === 'skill_selected' && skillLevel) {
      this.track('skill_level_selected', {
        skill_level: skillLevel,
      });
    } else if (step === 'completed') {
      this.track('onboarding_completed', {});
    }
  }

  /**
   * B?@02:0 A>1KB8O 2 0=0;8B8:C
   */
  private sendEvent(eventData: AnalyticsEventData) {
    // /=45:A.5B@8:0
    if (typeof window !== 'undefined' && (window as any).ym) {
      (window as any).ym(YANDEX_METRIKA_ID, 'reachGoal', eventData.event, eventData.properties);
    }

    // Google Analytics (gtag)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventData.event, eventData.properties);
    }

    // 0AB><=K9 1M:5=4 (5A;8 5ABL)
    if (import.meta.env.VITE_ANALYTICS_ENDPOINT) {
      fetch(import.meta.env.VITE_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      }).catch(console.error);
    }
  }

  /**
   * 5=5@0F8O ID A5AA88
   */
  private generateSessionId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `session_${timestamp}_${random}`;
  }

  /**
   * >;CG5=85 ID ?>;L7>20B5;O 87 localStorage
   */
  private getUserId(): string | undefined {
    if (typeof window === 'undefined') return undefined;

    let userId = localStorage.getItem('user_id');
    if (!userId) {
      const timestamp = Date.now();
      const random = Math.random().toString(36).substr(2, 9);
      userId = `user_${timestamp}_${random}`;
      localStorage.setItem('user_id', userId);
    }
    return userId;
  }
}

// ID /=45:A.5B@8:8 (70<5=8BL =0 @50;L=K9)
const YANDEX_METRIKA_ID = 12345678;

// -:A?>@B singleton instance
export const analytics = new AnalyticsService();

// %C: 4;O React :><?>=5=B>2
export function useAnalytics() {
  return analytics;
}
