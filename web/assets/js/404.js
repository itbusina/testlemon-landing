import { _variables } from './variables.js';
import { _main } from './main.js';
import { _gdpr } from './gdpr.js';
import {
    insertTemplate,
    navTemplate,
    bannerTemplate,
    cookieConsentTemplate,
    scrollTopTemplate,
    footerTemplate,
    contactTemplate,
    blogTemplate,
    faqTemplate,
    pricingTemplate,
    ctaTemplate,
    aboutTemplate,
    featuresTemplate,
    homeTemplate
} from './templates.js';

let _vars = _variables();

insertTemplate('nav', 'beforeend', navTemplate("text-body-color", "text-white", "dark:hidden", "hidden dark:block", "bg-primary hover:bg-blue-dark"));
insertTemplate('banner', 'beforeend', bannerTemplate("Page not found.", "something went wrong."));
insertTemplate('features', 'beforeend', featuresTemplate());
insertTemplate('about', 'beforeend', aboutTemplate());
insertTemplate('cta', 'beforeend', ctaTemplate());
insertTemplate('pricing', 'beforeend', pricingTemplate());
insertTemplate('faq', 'beforeend', faqTemplate());
insertTemplate('blog', 'beforeend', blogTemplate());
insertTemplate('contact', 'beforeend', contactTemplate(_vars.companyAddress, _vars.companyEmail));
insertTemplate('footer', 'beforeend', footerTemplate());
insertTemplate('scroll', 'beforeend', scrollTopTemplate());
insertTemplate('gdpr', 'beforeend', cookieConsentTemplate(_vars.privacyUrl));

_gdpr(_vars.GATrackingID);
_main();