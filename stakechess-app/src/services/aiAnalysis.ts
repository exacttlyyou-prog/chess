import type { Chess } from 'chess.js';

export interface ChessAnalysis {
  evaluation: string;
  bestMove: string;
  threats: string[];
  opportunities: string[];
  positionSummary: string;
  suggestedPlan: string;
}

type AIProvider = 'openai' | 'deepseek';

/**
 * Analyze chess position using AI
 */
export async function analyzePosition(
  game: Chess,
  provider: AIProvider = 'deepseek'
): Promise<ChessAnalysis> {
  const fen = game.fen();
  const moveHistory = game.history();
  const turn = game.turn() === 'w' ? 'White' : 'Black';
  const legalMoves = game.moves({ verbose: true });

  const prompt = `You are a grandmaster chess coach. Analyze this chess position:

FEN: ${fen}
Turn: ${turn}
Legal Moves: ${legalMoves.map(m => m.san).join(', ')}
Move History: ${moveHistory.slice(-10).join(', ')}

Provide a comprehensive analysis in JSON format with:
1. evaluation: Overall position evaluation (e.g., "+0.5", "-1.2", "equal")
2. bestMove: The best move in algebraic notation
3. threats: Array of immediate threats to watch out for
4. opportunities: Array of tactical or strategic opportunities
5. positionSummary: Brief summary of the current position
6. suggestedPlan: Strategic plan for the next few moves

Respond ONLY with valid JSON, no additional text.`;

  try {
    let response: Response;

    if (provider === 'openai') {
      response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a grandmaster chess coach analyzing positions. Always respond with valid JSON only.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });
    } else {
      // DeepSeek
      response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: 'You are a grandmaster chess coach analyzing positions. Always respond with valid JSON only.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Parse JSON response
    const analysis: ChessAnalysis = JSON.parse(content);

    return analysis;
  } catch (error) {
    console.error('AI analysis error:', error);

    // Return fallback analysis
    return {
      evaluation: 'Unable to analyze',
      bestMove: legalMoves[0]?.san || 'No moves available',
      threats: ['Analysis unavailable'],
      opportunities: ['Try analyzing again'],
      positionSummary: 'Could not connect to AI service',
      suggestedPlan: 'Continue with your plan',
    };
  }
}

/**
 * Get move suggestion from AI
 */
export async function getMoveSuggestion(
  game: Chess,
  provider: AIProvider = 'deepseek'
): Promise<string> {
  const fen = game.fen();
  const turn = game.turn() === 'w' ? 'White' : 'Black';
  const legalMoves = game.moves({ verbose: true }).slice(0, 10);

  const prompt = `As a chess coach, suggest the best move for ${turn} in this position:

FEN: ${fen}
Top legal moves: ${legalMoves.map(m => m.san).join(', ')}

Respond with ONLY the move in algebraic notation (e.g., "e4", "Nf3", "O-O"), followed by a brief explanation in parentheses.
Example: "Nf3 (develops knight and controls center)"`;

  try {
    let response: Response;

    if (provider === 'openai') {
      response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a chess coach. Be concise.' },
            { role: 'user', content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 100,
        }),
      });
    } else {
      response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: 'You are a chess coach. Be concise.' },
            { role: 'user', content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 100,
        }),
      });
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Move suggestion error:', error);
    return 'Analysis unavailable';
  }
}

/**
 * Get post-game analysis
 */
export async function analyzeGame(
  pgn: string,
  provider: AIProvider = 'deepseek'
): Promise<string> {
  const prompt = `Analyze this chess game in PGN format and provide insights:

${pgn}

Provide:
1. Opening analysis
2. Key moments and critical mistakes
3. Overall game assessment
4. Recommendations for improvement

Keep the analysis concise and instructive.`;

  try {
    let response: Response;

    if (provider === 'openai') {
      response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a grandmaster chess coach providing game analysis.',
            },
            { role: 'user', content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 1500,
        }),
      });
    } else {
      response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: 'You are a grandmaster chess coach providing game analysis.',
            },
            { role: 'user', content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 1500,
        }),
      });
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Game analysis error:', error);
    return 'Game analysis unavailable. Please try again later.';
  }
}
