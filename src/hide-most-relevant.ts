import { configRead, configAddChangeListener } from './config';

function applyHideMostRelevant(enabled: boolean) {
  const styleId = 'ytaf-hide-most-relevant';
  const existing = document.getElementById(styleId);
  if (enabled) {
    if (existing) return;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      ytlr-rich-shelf-renderer[is-most-relevant],
      ytlr-rich-section-renderer:has(ytlr-rich-shelf-renderer[is-most-relevant]) {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  } else {
    existing?.remove();
  }
}

applyHideMostRelevant(configRead('hideMostRelevantRow') as boolean);
configAddChangeListener('hideMostRelevantRow', (evt: Event) => {
  applyHideMostRelevant((evt as CustomEvent).detail.newValue);
});
