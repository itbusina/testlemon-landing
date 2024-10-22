import { _variables } from './variables.js';
import { _main } from './main.js';
import { _gdpr } from './gdpr.js';
import {
    insertTemplate,
    navTemplate,
    cookieConsentTemplate,
    scrollTopTemplate,
    bannerTemplate,
    features3Template,
    aboutTemplate,
    footerTemplate,
    ctaTemplate,
    faqTemplate,
} from './templates.js';

let _vars = _variables();

insertTemplate('nav', 'beforeend', navTemplate("lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70", "text-white dark:hidden", "text-white", "hidden", "header-logo", "bg-white bg-opacity-20 hover:bg-opacity-100 hover:text-dark"));
insertTemplate('banner', 'beforeend', bannerTemplate(window._bannerHealine, window._bannerMessage));
insertTemplate('features', 'beforeend', features3Template(window._featuresHeanline, window._featuresMessage, window._features));
insertTemplate('about', 'beforeend', aboutTemplate());
insertTemplate('cta', 'beforeend', ctaTemplate());
insertTemplate('faq', 'beforeend', faqTemplate());
insertTemplate('footer', 'beforeend', footerTemplate());

insertTemplate('scroll', 'beforeend', scrollTopTemplate());
insertTemplate('gdpr', 'beforeend', cookieConsentTemplate(_vars.privacyUrl));

_gdpr(_vars.GATrackingID);
_main();