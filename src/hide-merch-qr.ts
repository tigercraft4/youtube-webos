/**
 * hide-merch-qr.ts
 * Hides YouTube merch/product QR codes that appear during video playback.
 * Issue: https://github.com/webosbrew/youtube-webos/issues/385
 */

import { configRead, configAddChangeListener } from './config';

function applyMerchQRHide(enabled: boolean) {
  const styleId = 'ytaf-hide-merch-qr';
  const existing = document.getElementById(styleId);

  if (enabled) {
    if (existing) return;
    const style = document.createElement('style');
    style.id = styleId;
    // YouTube merch QR panel selectors (based on issue reports)
    style.textContent = `
      ytlr-merch-shelf-renderer,
      ytlr-product-list-renderer,
      [class*="merch-shelf"],
      [class*="product-shelf"],
      ytlr-featured-product-renderer,
      [class*="featured-product"] {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    console.log('[ytaf] Merch QR codes hidden');
  } else {
    existing?.remove();
    console.log('[ytaf] Merch QR codes visible');
  }
}

// Apply on load
applyMerchQRHide(configRead('hideMerchQR') as boolean);

// React to config changes
configAddChangeListener('hideMerchQR', (evt: Event) => {
  applyMerchQRHide((evt as CustomEvent).detail.newValue);
});
