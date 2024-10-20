import { _variables } from './variables.js';
import { _main } from './main.js';
import { _gdpr } from './gdpr.js';
import {
    insertTemplate,
    navTemplate,
    cookieConsentTemplate,
    scrollTopTemplate,
} from './templates.js';

let _vars = _variables();

insertTemplate('nav', 'beforeend', navTemplate("lg:text-body-color dark:lg:text-dark-6", "text-dark dark:hidden dark:text-white", "text-dark dark:text-white", "dark:hidden", "hidden dark:block", "bg-primary hover:bg-blue-dark"));
insertTemplate('scroll', 'beforeend', scrollTopTemplate());
insertTemplate('gdpr', 'beforeend', cookieConsentTemplate(_vars.privacyUrl));

_gdpr(_vars.GATrackingID);
_main();