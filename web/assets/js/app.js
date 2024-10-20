import { _variables } from './variables.js';
import { cookieConsentTemplate, scrollTopTemplate } from './templates.js';

let _vars = _variables();

let gdpr = document.getElementById('gdpr');
let scrollToTop = document.getElementById('scrollToTop');

scrollToTop.insertAdjacentHTML('beforeend', scrollTopTemplate());
gdpr.insertAdjacentHTML('beforeend', cookieConsentTemplate(_vars.privacyUrl));