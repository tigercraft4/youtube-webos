import { configRead, configAddChangeListener } from './config';

function applyHideSignInBanner(enabled: boolean) {
  const styleId = 'ytaf-hide-signin-banner';
  const existing = document.getElementById(styleId);
  if (enabled) {
    if (existing) return;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      ytlr-button-renderer[data-uix-sign-in-required],
      ytlr-compact-promoted-video-renderer,
      [class*="sign-in-banner"],
      [class*="signin-banner"],
      ytlr-statement-banner-renderer,
      ytlr-mealbar-promo-renderer {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  } else {
    existing?.remove();
  }
}

applyHideSignInBanner(configRead('hideSignInBanner') as boolean);
configAddChangeListener('hideSignInBanner', (evt: Event) => {
  applyHideSignInBanner((evt as CustomEvent).detail.newValue);
});
