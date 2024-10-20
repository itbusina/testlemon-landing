import { _variables } from './variables.js';
import { _main } from './main.js';
import { _gdpr } from './gdpr.js';
import { cookieConsentTemplate, scrollTopTemplate, footerTemplate, contactTemplate, blogTemplate, faqTemplate, pricingTemplate, ctaTemplate } from './templates.js';

let _vars = _variables();

let gdpr = document.getElementById('gdpr');
let scroll = document.getElementById('scroll');
let footer = document.getElementById('footer');
let contact = document.getElementById('contact');
let blog = document.getElementById('blog');
let faq = document.getElementById('faq');
let pricing = document.getElementById('pricing');
let cta = document.getElementById('cta');



cta.insertAdjacentHTML('beforeend', ctaTemplate());
pricing.insertAdjacentHTML('beforeend', pricingTemplate());
faq.insertAdjacentHTML('beforeend', faqTemplate());
blog.insertAdjacentHTML('beforeend', blogTemplate());
contact.insertAdjacentHTML('beforeend', contactTemplate(_vars.companyAddress, _vars.companyEmail));
footer.insertAdjacentHTML('beforeend', footerTemplate());
scroll.insertAdjacentHTML('beforeend', scrollTopTemplate());
gdpr.insertAdjacentHTML('beforeend', cookieConsentTemplate(_vars.privacyUrl));

_gdpr(_vars.GATrackingID);
_main();