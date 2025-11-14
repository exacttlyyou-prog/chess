// Simple avatar generator for chess players
export interface AvatarConfig {
  seed: string; // Name or ID to generate from
  size?: number;
  style?: 'chess' | 'geometric' | 'initials';
}

const chessColors = [
  ['#EF3124', '#1A1A1A'], // Red & Black (brand)
  ['#FFD700', '#8B4513'], // Gold & Brown
  ['#4169E1', '#FFA500'], // Royal Blue & Orange
  ['#32CD32', '#8B008B'], // Green & Purple
  ['#FF1493', '#00CED1'], // Pink & Cyan
  ['#FF6347', '#4682B4'], // Tomato & Steel Blue
];

const chessIcons = ['♔', '♕', '♖', '♗', '♘', '♙'];

function stringToHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function generateChessAvatar(config: AvatarConfig): string {
  const { seed, size = 48, style = 'chess' } = config;
  const hash = stringToHash(seed);

  if (style === 'initials') {
    return generateInitialsAvatar(seed, size, hash);
  } else if (style === 'geometric') {
    return generateGeometricAvatar(size, hash);
  } else {
    return generateChessPieceAvatar(size, hash);
  }
}

function generateChessPieceAvatar(size: number, hash: number): string {
  const colorPair = chessColors[hash % chessColors.length];
  const icon = chessIcons[Math.floor(hash / 10) % chessIcons.length];
  const [bg, fg] = colorPair;

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="${bg}" rx="20"/>
      <text x="50" y="50" font-size="48" text-anchor="middle" dominant-baseline="central" fill="${fg}">
        ${icon}
      </text>
      <circle cx="85" cy="15" r="8" fill="#EF3124"/>
    </svg>
  `.trim();
}

function generateInitialsAvatar(seed: string, size: number, hash: number): string {
  const colorPair = chessColors[hash % chessColors.length];
  const [bg, fg] = colorPair;

  // Get initials (first 2 letters or first letter of each word)
  const words = seed.trim().split(/\s+/);
  let initials = '';

  if (words.length >= 2) {
    initials = words[0][0] + words[1][0];
  } else if (seed.length >= 2) {
    initials = seed.substring(0, 2);
  } else {
    initials = seed[0] || '?';
  }

  initials = initials.toUpperCase();

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-${hash}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${bg};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${fg};stop-opacity:0.6" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#grad-${hash})" rx="20"/>
      <text x="50" y="50" font-size="36" font-weight="bold" text-anchor="middle" dominant-baseline="central" fill="white">
        ${initials}
      </text>
      <circle cx="85" cy="15" r="6" fill="#EF3124"/>
    </svg>
  `.trim();
}

function generateGeometricAvatar(size: number, hash: number): string {
  const colorPair = chessColors[hash % chessColors.length];
  const [bg, fg] = colorPair;

  // Generate a simple geometric pattern based on hash
  const pattern = (hash % 4);
  let shapes = '';

  switch (pattern) {
    case 0: // Circles
      shapes = `
        <circle cx="30" cy="30" r="15" fill="${fg}" opacity="0.8"/>
        <circle cx="70" cy="70" r="15" fill="${fg}" opacity="0.8"/>
        <circle cx="50" cy="50" r="10" fill="white" opacity="0.6"/>
      `;
      break;
    case 1: // Squares
      shapes = `
        <rect x="10" y="10" width="30" height="30" fill="${fg}" opacity="0.8" rx="5"/>
        <rect x="60" y="60" width="30" height="30" fill="${fg}" opacity="0.8" rx="5"/>
        <rect x="35" y="35" width="30" height="30" fill="white" opacity="0.6" rx="5"/>
      `;
      break;
    case 2: // Triangles
      shapes = `
        <polygon points="50,15 20,75 80,75" fill="${fg}" opacity="0.8"/>
        <polygon points="50,45 35,65 65,65" fill="white" opacity="0.6"/>
      `;
      break;
    case 3: // Mixed
      shapes = `
        <circle cx="25" cy="25" r="20" fill="${fg}" opacity="0.7"/>
        <rect x="55" y="55" width="35" height="35" fill="${fg}" opacity="0.7" rx="8"/>
        <polygon points="50,10 35,40 65,40" fill="white" opacity="0.6"/>
      `;
      break;
  }

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="${bg}" rx="20"/>
      ${shapes}
      <circle cx="85" cy="15" r="6" fill="#EF3124"/>
    </svg>
  `.trim();
}

// Generate avatar for opponent in matchmaking
export function generateOpponentAvatar(rating: number): { name: string; avatar: string } {
  const names = [
    'Александр', 'Владимир', 'Дмитрий', 'Сергей', 'Андрей',
    'Мария', 'Анна', 'Елена', 'Ольга', 'Наталья',
    'Иван', 'Петр', 'Николай', 'Михаил', 'Алексей'
  ];

  const surnames = [
    'Петров', 'Иванов', 'Сидоров', 'Кузнецов', 'Смирнов',
    'Попов', 'Волков', 'Соколов', 'Лебедев', 'Козлов'
  ];

  const hash = rating * 137; // Use rating as seed
  const firstName = names[hash % names.length];
  const lastName = surnames[Math.floor(hash / 10) % surnames.length];
  const fullName = `${firstName} ${lastName}`;

  const avatar = generateChessAvatar({
    seed: fullName,
    size: 64,
    style: hash % 3 === 0 ? 'chess' : hash % 3 === 1 ? 'initials' : 'geometric',
  });

  return { name: fullName, avatar };
}

// Convert SVG string to data URL for use in img src
export function svgToDataUrl(svg: string): string {
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
