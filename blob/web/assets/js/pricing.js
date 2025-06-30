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

addNav('nav', "lg:text-body-color dark:lg:text-dark-6", "text-dark dark:hidden dark:text-white", "text-dark dark:text-white", "dark:hidden", "hidden dark:block", "bg-primary hover:bg-blue-dark");
addPricing('pricing');
addScrollTop('scroll');
addCookieConsent('gdpr', _vars.GATrackingID, _vars.privacyUrl);