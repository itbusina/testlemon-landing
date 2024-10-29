import './page.js';
import { _variables } from './variables.js';
import {
    addNav,
    addHero,
    addFeatures,
    addAbout,
    addCta,
    addPricing,
    addFaq,
    addBlog,
    addContact,
    addFooter,
    addScrollTop,
    addCookieConsent,
} from './templates.js';

let _vars = _variables();
let config = window.config;

addNav('nav', "lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70", "text-white dark:hidden", "text-white", "hidden", "header-logo", "bg-white bg-opacity-20 hover:bg-opacity-100 hover:text-dark")
addHero('home');
addFeatures('features', "", "", "", config.features);
addAbout('about', config.aboutTitle, config.aboutText, config.aboutLink, config.aboutContent);
addCta('cta', config.ctaHeadline, config.ctaMessage, config.ctaButtonText);
addPricing('pricing');
addFaq('faq', config.faqs);
addBlog('blog');
addContact('contact', _vars.companyAddress, _vars.companyEmail);
addFooter('footer');
addScrollTop('scroll');
addCookieConsent('gdpr', _vars.GATrackingID, _vars.privacyUrl);