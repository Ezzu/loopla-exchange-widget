const COLORS = {
  // Text Colors
  TEXT_PRIMARY: '#2c3e50',
  TEXT_WHITE: '#ffffff',
  TEXT_GRAY: '#666',
  TEXT_LIGHT_GRAY: '#7f8c8d',

  // Background Colors
  BG_LIGHT: '#f8f9fa',
  BG_WHITE: '#ffffff',

  // UI Colors
  PRIMARY: '#3498db',
  SUCCESS: '#27ae60',
  DANGER: '#e74c3c',
  NEUTRAL: '#95a5a6',
  BORDER: '#e0e0e0',

  // Gradient
  GRADIENT_START: '#667eea',
  GRADIENT_END: '#764ba2',
};

export default COLORS;
export type ColorKey = keyof typeof COLORS;
