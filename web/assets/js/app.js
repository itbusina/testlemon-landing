import { _variables } from './variables.js';
import { cookieConsentTemplate } from './templates.js';

let _vars = _variables();
let gdpr = document.getElementById('gdpr');

gdpr.insertAdjacentHTML('beforeend', cookieConsentTemplate(_vars.privacyUrl));