/**
 * Modern color palette and theme configuration for the chat messaging app.
 * Colors are designed for a clean, professional look with excellent accessibility.
 */

import { Platform } from 'react-native';

/**
 * Primary brand color - Indigo
 */
const primaryColor = '#6366F1';
const primaryColorLight = '#818CF8';
const primaryColorDark = '#4F46E5';

/**
 * Simple color constants for quick access (light mode defaults)
 * Using a refined emerald/teal color scheme for a modern, fresh look
 */
export const COLORS = {
  // Primary palette - Emerald tones
  primary: '#059669',         // main emerald
  primaryLight: '#34D399',    // lighter emerald
  primaryDark: '#047857',     // darker emerald
  primaryGradientStart: '#10B981',
  primaryGradientEnd: '#059669',
  
  // Background & Surface
  background: '#F9FAFB',      // light gray background
  surface: '#FFFFFF',         // cards, modals, etc.
  surfaceSecondary: '#F3F4F6', // secondary surface
  
  // Text colors
  text: '#111827',            // dark gray text
  textSecondary: '#6B7280',   // medium gray
  textMuted: '#9CA3AF',       // light gray
  textOnPrimary: '#FFFFFF',   // white text on primary
  
  // Borders & Dividers
  border: '#E5E7EB',          // light border
  borderLight: '#F3F4F6',     // very light border
  
  // Message bubbles
  messageSent: '#059669',     // sent messages
  messageReceived: '#F3F4F6', // received messages
  
  // Input
  inputBackground: '#F3F4F6', // input background
  inputBorder: '#D1D5DB',     // input border
  inputFocus: '#059669',      // focus color
  
  // Status colors
  online: '#10B981',          // online indicator
  offline: '#9CA3AF',         // offline
  error: '#EF4444',           // error red
  warning: '#F59E0B',         // warning yellow
  success: '#10B981',         // success green
  info: '#3B82F6',            // info blue
  
  // Accent colors for UI elements
  accent: '#8B5CF6',          // purple accent
  accentBlue: '#3B82F6',      // blue accent
  accentOrange: '#F97316',    // orange accent
  accentPink: '#EC4899',      // pink accent
};


/**
 * Theme colors for light and dark modes
 */
export const Colors = {
  light: {
    // Primary brand colors
    primary: primaryColor,
    primaryLight: primaryColorLight,
    primaryDark: primaryColorDark,
    
    // Text colors
    text: '#1E293B',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    textInverse: '#FFFFFF',
    
    // Background colors
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceSecondary: '#F1F5F9',
    
    // UI element colors
    border: '#E2E8F0',
    borderLight: '#F1F5F9',
    separator: '#E2E8F0',
    
    // Interactive colors
    tint: primaryColor,
    icon: '#64748B',
    tabIconDefault: '#94A3B8',
    tabIconSelected: primaryColor,
    
    // Status colors
    online: '#22C55E',
    offline: '#94A3B8',
    error: '#EF4444',
    warning: '#F59E0B',
    success: '#22C55E',
    info: '#3B82F6',
    
    // Message colors
    messageSent: primaryColor,
    messageReceived: '#FFFFFF',
    messageSentText: '#FFFFFF',
    messageReceivedText: '#1E293B',
    
    // Input colors
    inputBackground: '#F1F5F9',
    inputBorder: '#E2E8F0',
    inputText: '#1E293B',
    inputPlaceholder: '#94A3B8',
    
    // Shadow
    shadow: 'rgba(0, 0, 0, 0.08)',
    shadowDark: 'rgba(0, 0, 0, 0.15)',
  },
  dark: {
    // Primary brand colors
    primary: primaryColorLight,
    primaryLight: '#A5B4FC',
    primaryDark: primaryColor,
    
    // Text colors
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    textInverse: '#1E293B',
    
    // Background colors
    background: '#0F172A',
    surface: '#1E293B',
    surfaceSecondary: '#334155',
    
    // UI element colors
    border: '#334155',
    borderLight: '#1E293B',
    separator: '#334155',
    
    // Interactive colors
    tint: primaryColorLight,
    icon: '#94A3B8',
    tabIconDefault: '#64748B',
    tabIconSelected: primaryColorLight,
    
    // Status colors
    online: '#4ADE80',
    offline: '#64748B',
    error: '#F87171',
    warning: '#FBBF24',
    success: '#4ADE80',
    info: '#60A5FA',
    
    // Message colors
    messageSent: primaryColorLight,
    messageReceived: '#334155',
    messageSentText: '#FFFFFF',
    messageReceivedText: '#F1F5F9',
    
    // Input colors
    inputBackground: '#334155',
    inputBorder: '#475569',
    inputText: '#F1F5F9',
    inputPlaceholder: '#64748B',
    
    // Shadow
    shadow: 'rgba(0, 0, 0, 0.3)',
    shadowDark: 'rgba(0, 0, 0, 0.5)',
  },
};

/**
 * Spacing scale for consistent layout
 */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

/**
 * Border radius scale for consistent rounded corners
 */
export const BorderRadius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 9999,
};

/**
 * Font sizes for consistent typography
 */
export const FontSizes = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

/**
 * Font weights
 */
export const FontWeights = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

/**
 * Platform-specific fonts
 */
export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

/**
 * Common shadow styles
 */
export const Shadows = {
  light: {
    sm: {
      shadowColor: Colors.light.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: Colors.light.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 3,
    },
    lg: {
      shadowColor: Colors.light.shadowDark,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 12,
      elevation: 5,
    },
  },
  dark: {
    sm: {
      shadowColor: Colors.dark.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: Colors.dark.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 3,
    },
    lg: {
      shadowColor: Colors.dark.shadowDark,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 12,
      elevation: 5,
    },
  },
};
