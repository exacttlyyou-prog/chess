import { useState, useEffect } from 'react';

export interface ABTestVariant {
  id: string;
  name: string;
  weight: number; // Percentage of users to see this variant (e.g., 33 for 33%)
}

export interface ABTest {
  id: string;
  variants: ABTestVariant[];
}

// Premium pricing A/B test variants
export const PREMIUM_PRICING_TEST: ABTest = {
  id: 'premium_pricing_v1',
  variants: [
    { id: 'control', name: 'Control (499₽)', weight: 33 },
    { id: 'variant_a', name: 'Variant A (399₽)', weight: 33 },
    { id: 'variant_b', name: 'Variant B (599₽)', weight: 34 },
  ],
};

// Price mapping for each variant
export const PREMIUM_PRICES = {
  control: { price: 499, oldPrice: 999, discount: '-50%' },
  variant_a: { price: 399, oldPrice: 799, discount: '-50%' },
  variant_b: { price: 599, oldPrice: 1199, discount: '-50%' },
};

/**
 * A/B Testing Hook
 *
 * Assigns users to test variants based on:
 * 1. Persistent storage (localStorage) - same variant across sessions
 * 2. Weighted random selection for new users
 *
 * Usage:
 * const { variant, trackConversion } = useABTest(PREMIUM_PRICING_TEST);
 */
export function useABTest(test: ABTest) {
  const [variant, setVariant] = useState<ABTestVariant | null>(null);
  const storageKey = `ab_test_${test.id}`;

  useEffect(() => {
    // Check if user already has an assigned variant
    const storedVariantId = localStorage.getItem(storageKey);

    if (storedVariantId) {
      // Find the stored variant
      const storedVariant = test.variants.find(v => v.id === storedVariantId);
      if (storedVariant) {
        setVariant(storedVariant);
        return;
      }
    }

    // Assign new variant using weighted random selection
    const selectedVariant = selectWeightedVariant(test.variants);
    setVariant(selectedVariant);
    localStorage.setItem(storageKey, selectedVariant.id);

    // Track assignment
    trackEvent('ab_test_assigned', {
      test_id: test.id,
      variant_id: selectedVariant.id,
      variant_name: selectedVariant.name,
    });
  }, [test, storageKey]);

  /**
   * Track when user converts (e.g., clicks upgrade button)
   */
  const trackConversion = (eventName: string = 'conversion') => {
    if (!variant) return;

    trackEvent(`ab_test_${eventName}`, {
      test_id: test.id,
      variant_id: variant.id,
      variant_name: variant.name,
    });
  };

  /**
   * Track custom event for this A/B test
   */
  const trackEvent = (eventName: string, data: Record<string, any>) => {
    // In production, send to analytics service (Google Analytics, Mixpanel, etc.)
    console.log('[A/B Test Event]', eventName, data);

    // Example: Send to analytics
    // window.gtag?.('event', eventName, data);
    // window.mixpanel?.track(eventName, data);
  };

  return {
    variant,
    isLoading: !variant,
    trackConversion,
    trackEvent,
  };
}

/**
 * Select variant using weighted random selection
 */
function selectWeightedVariant(variants: ABTestVariant[]): ABTestVariant {
  // Normalize weights to ensure they sum to 100
  const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
  const random = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (const variant of variants) {
    cumulativeWeight += variant.weight;
    if (random < cumulativeWeight) {
      return variant;
    }
  }

  // Fallback to first variant
  return variants[0];
}

/**
 * Debug utility to view/reset A/B tests
 */
export function getABTestDebugInfo(testId: string) {
  const storageKey = `ab_test_${testId}`;
  return {
    assignedVariant: localStorage.getItem(storageKey),
    reset: () => localStorage.removeItem(storageKey),
  };
}
