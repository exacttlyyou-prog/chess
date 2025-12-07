import {
  CHESS_PIECE_PROMPTS,
  BOARD_PROMPTS,
  UI_PROMPTS,
  ONBOARDING_PROMPTS,
  RULES_PROMPTS,
  BUTTON_ICONS
} from '../config/designSystem';

export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type PieceState = 'base' | 'active' | 'captured' | 'baseAlt';
export type BoardType = keyof typeof BOARD_PROMPTS;
export type UIType = keyof typeof UI_PROMPTS;
export type OnboardingType = keyof typeof ONBOARDING_PROMPTS;
export type RulesType = keyof typeof RULES_PROMPTS;
export type ButtonIconType = keyof typeof BUTTON_ICONS;

export type AssetCategory = 'piece' | 'board' | 'ui' | 'onboarding' | 'rules' | 'icon';

export interface GeneratedImage {
  url: string;
  prompt: string;
  timestamp: number;
}

/**
 * Chess Asset Generator using AI Image Generation APIs
 */
export class ChessAssetGenerator {
  private cache: Map<string, GeneratedImage>;
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.cache = new Map();
    this.loadCache();
  }

  /**
   * Universal asset generator - works with any category
   */
  async generate(
    category: AssetCategory,
    key: string,
    subKey?: string
  ): Promise<GeneratedImage> {
    const cacheKey = subKey ? `${category}-${key}-${subKey}` : `${category}-${key}`;

    // Check cache first
    const cached = this.getCached(cacheKey);
    if (cached) {
      console.log(`Using cached image for ${cacheKey}`);
      return cached;
    }

    // Get prompt based on category
    let prompt: string | undefined;

    switch (category) {
      case 'piece':
        const piecePrompts = CHESS_PIECE_PROMPTS[key as PieceType];
        if (piecePrompts && subKey) {
          prompt = piecePrompts[subKey as keyof typeof piecePrompts] as string;
        }
        break;

      case 'board':
        prompt = BOARD_PROMPTS[key as BoardType];
        break;

      case 'ui':
        prompt = UI_PROMPTS[key as UIType];
        break;

      case 'onboarding':
        prompt = ONBOARDING_PROMPTS[key as OnboardingType];
        break;

      case 'rules':
        prompt = RULES_PROMPTS[key as RulesType];
        break;

      case 'icon':
        prompt = BUTTON_ICONS[key as ButtonIconType];
        break;
    }

    if (!prompt || typeof prompt !== 'string') {
      throw new Error(`No prompt found for ${category} - ${key}${subKey ? ` - ${subKey}` : ''}`);
    }

    console.log(`Generating ${category} (${key}${subKey ? ` - ${subKey}` : ''}) with DALL-E...`);

    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: this.optimizePromptForDallE(prompt),
          n: 1,
          size: '1024x1024',
          quality: 'hd',
          style: 'natural',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`DALL-E API error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      const imageUrl = data.data[0].url;

      const generatedImage: GeneratedImage = {
        url: imageUrl,
        prompt,
        timestamp: Date.now(),
      };

      this.setCached(cacheKey, generatedImage);
      return generatedImage;
    } catch (error) {
      console.error(`Error generating ${category} (${key}):`, error);
      throw error;
    }
  }

  /**
   * Generate chess piece image using OpenAI DALL-E 3
   */
  async generatePiece(
    piece: PieceType,
    state: PieceState = 'base'
  ): Promise<GeneratedImage> {
    return this.generate('piece', piece, state);
  }

  /**
   * Generate board/background
   */
  async generateBoard(type: BoardType): Promise<GeneratedImage> {
    return this.generate('board', type);
  }

  /**
   * Generate UI element
   */
  async generateUI(type: UIType): Promise<GeneratedImage> {
    return this.generate('ui', type);
  }

  /**
   * Generate onboarding illustration
   */
  async generateOnboarding(type: OnboardingType): Promise<GeneratedImage> {
    return this.generate('onboarding', type);
  }

  /**
   * Generate rules illustration
   */
  async generateRules(type: RulesType): Promise<GeneratedImage> {
    return this.generate('rules', type);
  }

  /**
   * Generate button icon
   */
  async generateIcon(type: ButtonIconType): Promise<GeneratedImage> {
    return this.generate('icon', type);
  }

  /**
   * Get all available prompts for a category
   */
  getPromptsForCategory(category: AssetCategory): Record<string, unknown> {
    switch (category) {
      case 'piece':
        return CHESS_PIECE_PROMPTS;
      case 'board':
        return BOARD_PROMPTS;
      case 'ui':
        return UI_PROMPTS;
      case 'onboarding':
        return ONBOARDING_PROMPTS;
      case 'rules':
        return RULES_PROMPTS;
      case 'icon':
        return BUTTON_ICONS;
      default:
        return {};
    }
  }


  /**
   * Generate using Stable Diffusion (HuggingFace)
   */
  async generatePieceWithStableDiffusion(
    piece: PieceType,
    state: PieceState = 'base',
    huggingFaceKey: string
  ): Promise<GeneratedImage> {
    const cacheKey = `sd-${piece}-${state}`;

    const cached = this.getCached(cacheKey);
    if (cached) {
      return cached;
    }

    const piecePrompts = CHESS_PIECE_PROMPTS[piece];
    const prompt = piecePrompts[state as keyof typeof piecePrompts];

    if (!prompt || typeof prompt !== 'string') {
      throw new Error(`Invalid state "${state}" for piece "${piece}"`);
    }

    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${huggingFaceKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: this.optimizePromptForSD(prompt),
            parameters: {
              negative_prompt: 'low quality, blurry, distorted, text, watermark, rainbow colors, acid colors',
              num_inference_steps: 50,
              guidance_scale: 7.5,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Stable Diffusion API error: ${response.status}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      const generatedImage: GeneratedImage = {
        url: imageUrl,
        prompt,
        timestamp: Date.now(),
      };

      this.setCached(cacheKey, generatedImage);

      return generatedImage;
    } catch (error) {
      console.error(`Error generating ${piece} with SD:`, error);
      throw error;
    }
  }

  /**
   * Optimize prompt for DALL-E (remove Midjourney-specific parameters)
   */
  private optimizePromptForDallE(prompt: string): string {
    // Remove Midjourney-specific parameters
    let optimized = prompt
      .replace(/--ar \d+:\d+/g, '')
      .replace(/--style raw/g, '')
      .replace(/--v \d+/g, '')
      .replace(/--q \d+/g, '')
      .trim();

    // Ensure it's under 4000 characters (DALL-E limit)
    if (optimized.length > 4000) {
      optimized = optimized.substring(0, 3997) + '...';
    }

    return optimized;
  }

  /**
   * Optimize prompt for Stable Diffusion
   */
  private optimizePromptForSD(prompt: string): string {
    let optimized = prompt
      .replace(/--ar \d+:\d+/g, '')
      .replace(/--style raw/g, '')
      .replace(/--v \d+/g, '')
      .replace(/--q \d+/g, '')
      .trim();

    // Add quality boosters for SD
    optimized += ', masterpiece, best quality, highly detailed, sharp focus, 8k uhd';

    return optimized;
  }

  /**
   * Pre-generate all chess pieces (6 pieces × 3 states = 18 images)
   */
  async preloadAllPieces(
    onProgress?: (current: number, total: number, piece: string) => void
  ): Promise<GeneratedImage[]> {
    const pieces: PieceType[] = ['pawn', 'rook', 'knight', 'bishop', 'queen', 'king'];
    const states: PieceState[] = ['base', 'active', 'captured'];
    const results: GeneratedImage[] = [];

    let current = 0;
    const total = pieces.length * states.length;

    for (const piece of pieces) {
      for (const state of states) {
        try {
          onProgress?.(current, total, `${piece}-${state}`);
          const image = await this.generatePiece(piece, state);
          results.push(image);
          current++;

          // Wait 1 second between requests to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          console.error(`Failed to generate ${piece} (${state}):`, error);
          current++;
        }
      }
    }

    return results;
  }

  /**
   * Get cached image
   */
  private getCached(key: string): GeneratedImage | null {
    // Check memory cache first
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    // Check localStorage
    try {
      const cached = localStorage.getItem(`chess-asset-${key}`);
      if (!cached) return null;

      const image: GeneratedImage = JSON.parse(cached);

      // Check if expired (7 days)
      const age = Date.now() - image.timestamp;
      const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days

      if (age > maxAge) {
        localStorage.removeItem(`chess-asset-${key}`);
        return null;
      }

      // Add to memory cache
      this.cache.set(key, image);

      return image;
    } catch (e) {
      return null;
    }
  }

  /**
   * Cache image
   */
  private setCached(key: string, image: GeneratedImage): void {
    // Save to memory cache
    this.cache.set(key, image);

    // Save to localStorage
    try {
      localStorage.setItem(`chess-asset-${key}`, JSON.stringify(image));
    } catch (e) {
      console.warn('Failed to cache image to localStorage:', e);
    }
  }

  /**
   * Load cache from localStorage
   */
  private loadCache(): void {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('chess-asset-')) {
          const cacheKey = key.replace('chess-asset-', '');
          const cached = this.getCached(cacheKey);
          if (cached) {
            this.cache.set(cacheKey, cached);
          }
        }
      }
    } catch (e) {
      console.warn('Failed to load cache:', e);
    }
  }

  /**
   * Clear all cached images
   */
  clearCache(): void {
    this.cache.clear();

    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('chess-asset-')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (e) {
      console.warn('Failed to clear cache:', e);
    }
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      memoryItems: this.cache.size,
      localStorageItems: Object.keys(localStorage).filter(k => k.startsWith('chess-asset-')).length,
    };
  }
}

/**
 * Singleton instance
 */
let generatorInstance: ChessAssetGenerator | null = null;

export function getImageGenerator(): ChessAssetGenerator {
  if (!generatorInstance) {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('VITE_OPENAI_API_KEY not found in environment variables');
    }
    generatorInstance = new ChessAssetGenerator(apiKey);
  }
  return generatorInstance;
}
