import { _variables } from './variables.js';
import { _main } from './main.js';
import { _gdpr } from './gdpr.js';
import {
    insertTemplate,
    navTemplate,
    cookieConsentTemplate,
    scrollTopTemplate,
    bannerTemplate,
    featuresTemplate,
    aboutTemplate,
    footerTemplate,
    ctaTemplate,
    faqTemplate,
} from './templates.js';

let _vars = _variables();
let config = window.config;

insertTemplate('nav', 'beforeend', navTemplate("lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70", "text-white dark:hidden", "text-white", "hidden", "header-logo", "bg-white bg-opacity-20 hover:bg-opacity-100 hover:text-dark"));
insertTemplate('banner', 'beforeend', bannerTemplate(window.config.bannerHealine, window.config.bannerMessage));
insertTemplate('features', 'beforeend', featuresTemplate(config.featuresHeanline, config.featuresMessage, config.features));
insertTemplate('about', 'beforeend', aboutTemplate(config.aboutTitle, config.aboutText));
insertTemplate('cta', 'beforeend', ctaTemplate(config.ctaHeadline, config.ctaMessage, config.ctaButtonText));
insertTemplate('faq', 'beforeend', faqTemplate(config.faqs));
insertTemplate('footer', 'beforeend', footerTemplate());

insertTemplate('scroll', 'beforeend', scrollTopTemplate());
insertTemplate('gdpr', 'beforeend', cookieConsentTemplate(_vars.privacyUrl));

_gdpr(_vars.GATrackingID);
_main();