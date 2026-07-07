import { configRead } from './config';

if (configRead('spoofTVDimensions')) {
  try {
    Object.defineProperty(window.screen, 'width', { get: () => 3840 });
    Object.defineProperty(window.screen, 'height', { get: () => 2160 });
    Object.defineProperty(window, 'devicePixelRatio', { get: () => 2 });
    console.log('[ytaf] Screen dimensions spoofed to 4K (3840x2160)');
  } catch (e) {
    console.warn('[ytaf] Could not spoof screen dimensions:', e);
  }
}
