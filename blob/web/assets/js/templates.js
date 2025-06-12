import { _variables } from './variables.js';

let vars = _variables();

function insertTemplate(selector, html) {
  let element = document.getElementById(selector);

  if (element != null) {
    element.insertAdjacentHTML('beforeend', html);
  }
}

export function addCookieConsent(selector = 'gdpr', trackingID, privacyUrl) {
  let html = `
    <div id="gdpr-banner" style="display: none;" class="text-xs fixed bottom-8 left-4 z-[999] inline-flex items-center gap-[10px] rounded-lg bg-white px-[14px] py-2 shadow-2 dark:bg-dark-2 sm:left-9">
        <span class="font-medium text-dark-3 dark:text-dark-6">
          This website uses cookies.<br/><a href="${privacyUrl}" style="text-decoration: underline;"> Learn more</a>
        </span>
        <span class="block h-4 w-px bg-stroke dark:bg-dark-3"></span>
        <button class="font-medium text-primary dark:text-white" onclick="handleGDPRConsent(true)">Accept</button>
        <span class="block h-4 w-px bg-stroke dark:bg-dark-3"></span>
        <button class="font-medium text-dark-3 dark:text-dark-6" onclick="handleGDPRConsent(false)">Reject</button>
    </div>
    `;

  insertTemplate(selector, html);

  // Check if the user has given consent
  const consentGiven = localStorage.getItem("gdpr-consent") === "accepted";

  // Check if consent is already given
  document.addEventListener("DOMContentLoaded", function () {
    if (!consentGiven) {
      // Show the consent banner
      document.getElementById("gdpr-banner").style.display = "flex";
    }
  });

  // Function to handle consent
  window.handleGDPRConsent = function (consentGiven) {
    localStorage.setItem("gdpr-consent", consentGiven ? "accepted" : "rejected");
    document.getElementById("gdpr-banner").style.display = "none";
  }

  // Function to load Google Analytics script
  function loadGAScript(trackingID) {
    const gaScript = document.createElement('script');
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + trackingID;  // Replace with your Tracking ID
    gaScript.async = true;
    document.head.appendChild(gaScript);

    // Initialize GA after script is loaded
    gaScript.onload = function () {
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', trackingID);
    };
  }

  // Only load GA if consent is given
  if (consentGiven) {
    loadGAScript(trackingID);
  }
}

export function addScrollTop(selector = 'scroll') {
  let html = `
    <a href="#top" class="back-to-top fixed bottom-8 left-auto right-8 z-[999] hidden h-10 w-10 items-center justify-center rounded-md bg-primary text-white shadow-md transition duration-300 ease-in-out hover:bg-dark">
        <span class="mt-[6px] h-3 w-3 rotate-45 border-l border-t border-white"></span>
    </a>
    `;

  insertTemplate(selector, html);

  // ====== scroll top js
  function scrollTo(element, to = 0, duration = 500) {
    const start = element.scrollTop;
    const change = to - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = () => {
      currentTime += increment;

      const val = Math.easeInOutQuad(currentTime, start, change, duration);

      element.scrollTop = val;

      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };

    animateScroll();
  }

  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  document.querySelector(".back-to-top").onclick = () => {
    scrollTo(document.documentElement);
  };
}

export function addFooter(selector = 'footer') {
  let html = `
    <div class="container">
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-4/12 xl:w-4/12">
          <div class="mb-10 w-full">
            <a href="index.html" class="mb-6 inline-block max-w-[160px]">
              <img style="height: 50px;" src="assets/images/logo/logo-white.svg" alt="logo" class="max-w-full" />
            </a>
            <p class="mb-8 max-w-[270px] text-base text-gray-7">
              Creating new testing experience.
            </p>
            <div class="-mx-3 flex items-center">
              <a href="https://x.com/TestLemonCo" class="px-3 text-gray-7 hover:text-white">
                <i class="ph ph-x-logo"></i>  
              </a>
              <a href="https://www.facebook.com/testlemon" class="px-3 text-gray-7 hover:text-white">
                <i class="ph ph-facebook-logo"></i> 
              </a>
              <a href="https://www.linkedin.com/company/itbusina/" class="px-3 text-gray-7 hover:text-white">
                <i class="ph ph-linkedin-logo"></i>
              </a>
              <a href="https://join.slack.com/t/itbusina/shared_invite/zt-2uc6i7m69-6gp8IpXcgwCjerBYI12SzA/" class="px-3 text-gray-7 hover:text-white">
                <i class="ph ph-slack-logo"></i>
              </a>
              <a href="https://www.youtube.com/@itbusina/" class="px-3 text-gray-7 hover:text-white">
                <i class="ph ph-youtube-logo"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
          <div class="mb-10 w-full">
            <h4 class="mb-9 text-lg font-semibold text-white">Features</h4>
            <ul>
              <li>
                <a href="test-automation.html" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  Tests automation
                </a>
              </li>
              <li>
                <a href="ai-powered-testing.html" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  AI-powered testing
                </a>
              </li>
              <li>
                <a href="api-testing.html" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  API testing
                </a>
              </li>
              <li>
                <a href="uptime-monitoring.html" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  Uptime monitoring
                </a>
              </li>
              <li>
                <a href="website-monitoring.html" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  Website monitoring
                </a>
              </li>
              <li>
                <a href="keyword-monitoring.html" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  Keyword monitoring
                </a>
              </li>
              <li>
                <a href="ssl-monitoring.html" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  SSL monitoring
                </a>
              </li>
              <li>
                <a href="tls-monitoring.html" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  TLS monitoring
                </a>
              </li>
              <li>
                <a href="dns-monitoring.html" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  DNS monitoring
                </a>
              </li>
              <li>
                <a href="domain-monitoring.html" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  Domain monitoring
                </a>
              </li>
              <li>
                <a href="dmarc-monitoring.html" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  DMARC monitoring
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
          <div class="mb-10 w-full">
            <h4 class="mb-9 text-lg font-semibold text-white">Company</h4>
            <ul>
              <li>
                <a href="index.html#about" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  About
                </a>
              </li>
              <li>
                <a href="index.html#pricing" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  Pricing
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  Refund policy
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  For startups
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  For non-profit
                </a>
              </li>
              <li>
                <a href="index.html#contact" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  Contact us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
          <div class="mb-10 w-full">
            <h4 class="mb-9 text-lg font-semibold text-white">
              Resources
            </h4>
            <ul>
              <li>
                <a href="https://docs.testlemon.com/pages/platform/configuration/test-collections/" target="_blank" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  Documentation
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  Integrations
                </a>
              </li>
              <li>
                <a href="${vars.githubExamplesUrl}" target="_blank" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  GitHub Examples
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  Live Demo
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  Blog
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  Case studies
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  Developer API
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  Comparisons
                </a>
              </li>
              <li>
                <a href="index.html#faq" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
          <div class="mb-10 w-full">
            <h4 class="mb-9 text-lg font-semibold text-white">
              For everyone
            </h4>
            <ul>
              <li>
                <a href="javascript:void(0)" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  Business owners
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  Product managers
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  Marketers
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  DevOps
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  Testers
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  Developers
                </a>
              </li>
              <li>
                <a href="#contact" scrollTo="#contact" class="mb-3 inline-block text-base text-gray-7 hover:text-primary">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12 border-t border-[#8890A4] border-opacity-40 py-8 lg:mt-[60px]">
      <div class="container">
        <div class="-mx-4 flex flex-wrap">
          <div class="w-full px-4 md:w-2/3 lg:w-1/2">
            <div class="my-1">
              <div class="-mx-3 flex items-center justify-center md:justify-start">
                <a href="${vars.privacyUrl}" class="px-3 text-base text-gray-7 hover:text-white hover:underline">
                  Privacy policy
                </a>
                <a href="${vars.termsUrl}" class="px-3 text-base text-gray-7 hover:text-white hover:underline">
                  Terms of service
                </a>
              </div>
            </div>
          </div>
          <div class="w-full px-4 md:w-1/3 lg:w-1/2">
            <div class="my-1 flex justify-center md:justify-end">
              <p class="text-base text-gray-7">
                Developed by
                <a href="https://itbusina.com" rel="nofollow noopner" target="_blank" class="text-gray-1 hover:underline">
                  itbusina.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <span class="absolute left-0 top-0 z-[-1]">
        <img src="assets/images/footer/shape-1.svg" alt="" />
      </span>

      <span class="absolute bottom-0 right-0 z-[-1]">
        <img src="assets/images/footer/shape-3.svg" alt="" />
      </span>

      <span class="absolute right-0 top-0 z-[-1]">
        <svg width="102" height="102" viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.8667 33.1956C2.89765 33.1956 3.7334 34.0318 3.7334 35.0633C3.7334 36.0947 2.89765 36.9309 1.8667 36.9309C0.835744 36.9309 4.50645e-08 36.0947 0 35.0633C-4.50645e-08 34.0318 0.835744 33.1956 1.8667 33.1956Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M18.2939 33.1956C19.3249 33.1956 20.1606 34.0318 20.1606 35.0633C20.1606 36.0947 19.3249 36.9309 18.2939 36.9309C17.263 36.9309 16.4272 36.0947 16.4272 35.0633C16.4272 34.0318 17.263 33.1956 18.2939 33.1956Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M34.7209 33.195C35.7519 33.195 36.5876 34.0311 36.5876 35.0626C36.5876 36.0941 35.7519 36.9303 34.7209 36.9303C33.69 36.9303 32.8542 36.0941 32.8542 35.0626C32.8542 34.0311 33.69 33.195 34.7209 33.195Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M50.9341 33.195C51.965 33.195 52.8008 34.0311 52.8008 35.0626C52.8008 36.0941 51.965 36.9303 50.9341 36.9303C49.9031 36.9303 49.0674 36.0941 49.0674 35.0626C49.0674 34.0311 49.9031 33.195 50.9341 33.195Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M1.8667 16.7605C2.89765 16.7605 3.7334 17.5966 3.7334 18.6281C3.7334 19.6596 2.89765 20.4957 1.8667 20.4957C0.835744 20.4957 4.50645e-08 19.6596 0 18.6281C-4.50645e-08 17.5966 0.835744 16.7605 1.8667 16.7605Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M18.2939 16.7605C19.3249 16.7605 20.1606 17.5966 20.1606 18.6281C20.1606 19.6596 19.3249 20.4957 18.2939 20.4957C17.263 20.4957 16.4272 19.6596 16.4272 18.6281C16.4272 17.5966 17.263 16.7605 18.2939 16.7605Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M34.7209 16.7605C35.7519 16.7605 36.5876 17.5966 36.5876 18.6281C36.5876 19.6596 35.7519 20.4957 34.7209 20.4957C33.69 20.4957 32.8542 19.6596 32.8542 18.6281C32.8542 17.5966 33.69 16.7605 34.7209 16.7605Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M50.9341 16.7605C51.965 16.7605 52.8008 17.5966 52.8008 18.6281C52.8008 19.6596 51.965 20.4957 50.9341 20.4957C49.9031 20.4957 49.0674 19.6596 49.0674 18.6281C49.0674 17.5966 49.9031 16.7605 50.9341 16.7605Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M1.8667 0.324951C2.89765 0.324951 3.7334 1.16115 3.7334 2.19261C3.7334 3.22408 2.89765 4.06024 1.8667 4.06024C0.835744 4.06024 4.50645e-08 3.22408 0 2.19261C-4.50645e-08 1.16115 0.835744 0.324951 1.8667 0.324951Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M18.2939 0.324951C19.3249 0.324951 20.1606 1.16115 20.1606 2.19261C20.1606 3.22408 19.3249 4.06024 18.2939 4.06024C17.263 4.06024 16.4272 3.22408 16.4272 2.19261C16.4272 1.16115 17.263 0.324951 18.2939 0.324951Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M34.7209 0.325302C35.7519 0.325302 36.5876 1.16147 36.5876 2.19293C36.5876 3.2244 35.7519 4.06056 34.7209 4.06056C33.69 4.06056 32.8542 3.2244 32.8542 2.19293C32.8542 1.16147 33.69 0.325302 34.7209 0.325302Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M50.9341 0.325302C51.965 0.325302 52.8008 1.16147 52.8008 2.19293C52.8008 3.2244 51.965 4.06056 50.9341 4.06056C49.9031 4.06056 49.0674 3.2244 49.0674 2.19293C49.0674 1.16147 49.9031 0.325302 50.9341 0.325302Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M66.9037 33.1956C67.9346 33.1956 68.7704 34.0318 68.7704 35.0633C68.7704 36.0947 67.9346 36.9309 66.9037 36.9309C65.8727 36.9309 65.037 36.0947 65.037 35.0633C65.037 34.0318 65.8727 33.1956 66.9037 33.1956Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M83.3307 33.1956C84.3616 33.1956 85.1974 34.0318 85.1974 35.0633C85.1974 36.0947 84.3616 36.9309 83.3307 36.9309C82.2997 36.9309 81.464 36.0947 81.464 35.0633C81.464 34.0318 82.2997 33.1956 83.3307 33.1956Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M99.7576 33.1956C100.789 33.1956 101.624 34.0318 101.624 35.0633C101.624 36.0947 100.789 36.9309 99.7576 36.9309C98.7266 36.9309 97.8909 36.0947 97.8909 35.0633C97.8909 34.0318 98.7266 33.1956 99.7576 33.1956Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M66.9037 16.7605C67.9346 16.7605 68.7704 17.5966 68.7704 18.6281C68.7704 19.6596 67.9346 20.4957 66.9037 20.4957C65.8727 20.4957 65.037 19.6596 65.037 18.6281C65.037 17.5966 65.8727 16.7605 66.9037 16.7605Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M83.3307 16.7605C84.3616 16.7605 85.1974 17.5966 85.1974 18.6281C85.1974 19.6596 84.3616 20.4957 83.3307 20.4957C82.2997 20.4957 81.464 19.6596 81.464 18.6281C81.464 17.5966 82.2997 16.7605 83.3307 16.7605Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M99.7576 16.7605C100.789 16.7605 101.624 17.5966 101.624 18.6281C101.624 19.6596 100.789 20.4957 99.7576 20.4957C98.7266 20.4957 97.8909 19.6596 97.8909 18.6281C97.8909 17.5966 98.7266 16.7605 99.7576 16.7605Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M66.9037 0.324966C67.9346 0.324966 68.7704 1.16115 68.7704 2.19261C68.7704 3.22408 67.9346 4.06024 66.9037 4.06024C65.8727 4.06024 65.037 3.22408 65.037 2.19261C65.037 1.16115 65.8727 0.324966 66.9037 0.324966Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M83.3307 0.324951C84.3616 0.324951 85.1974 1.16115 85.1974 2.19261C85.1974 3.22408 84.3616 4.06024 83.3307 4.06024C82.2997 4.06024 81.464 3.22408 81.464 2.19261C81.464 1.16115 82.2997 0.324951 83.3307 0.324951Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M99.7576 0.324951C100.789 0.324951 101.624 1.16115 101.624 2.19261C101.624 3.22408 100.789 4.06024 99.7576 4.06024C98.7266 4.06024 97.8909 3.22408 97.8909 2.19261C97.8909 1.16115 98.7266 0.324951 99.7576 0.324951Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M1.8667 82.2029C2.89765 82.2029 3.7334 83.039 3.7334 84.0705C3.7334 85.102 2.89765 85.9382 1.8667 85.9382C0.835744 85.9382 4.50645e-08 85.102 0 84.0705C-4.50645e-08 83.039 0.835744 82.2029 1.8667 82.2029Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M18.2939 82.2029C19.3249 82.2029 20.1606 83.039 20.1606 84.0705C20.1606 85.102 19.3249 85.9382 18.2939 85.9382C17.263 85.9382 16.4272 85.102 16.4272 84.0705C16.4272 83.039 17.263 82.2029 18.2939 82.2029Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M34.7209 82.2026C35.7519 82.2026 36.5876 83.0387 36.5876 84.0702C36.5876 85.1017 35.7519 85.9378 34.7209 85.9378C33.69 85.9378 32.8542 85.1017 32.8542 84.0702C32.8542 83.0387 33.69 82.2026 34.7209 82.2026Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M50.9341 82.2026C51.965 82.2026 52.8008 83.0387 52.8008 84.0702C52.8008 85.1017 51.965 85.9378 50.9341 85.9378C49.9031 85.9378 49.0674 85.1017 49.0674 84.0702C49.0674 83.0387 49.9031 82.2026 50.9341 82.2026Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M1.8667 65.7677C2.89765 65.7677 3.7334 66.6039 3.7334 67.6353C3.7334 68.6668 2.89765 69.503 1.8667 69.503C0.835744 69.503 4.50645e-08 68.6668 0 67.6353C-4.50645e-08 66.6039 0.835744 65.7677 1.8667 65.7677Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M18.2939 65.7677C19.3249 65.7677 20.1606 66.6039 20.1606 67.6353C20.1606 68.6668 19.3249 69.503 18.2939 69.503C17.263 69.503 16.4272 68.6668 16.4272 67.6353C16.4272 66.6039 17.263 65.7677 18.2939 65.7677Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M34.7209 65.7674C35.7519 65.7674 36.5876 66.6036 36.5876 67.635C36.5876 68.6665 35.7519 69.5027 34.7209 69.5027C33.69 69.5027 32.8542 68.6665 32.8542 67.635C32.8542 66.6036 33.69 65.7674 34.7209 65.7674Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M50.9341 65.7674C51.965 65.7674 52.8008 66.6036 52.8008 67.635C52.8008 68.6665 51.965 69.5027 50.9341 69.5027C49.9031 69.5027 49.0674 68.6665 49.0674 67.635C49.0674 66.6036 49.9031 65.7674 50.9341 65.7674Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M1.8667 98.2644C2.89765 98.2644 3.7334 99.1005 3.7334 100.132C3.7334 101.163 2.89765 102 1.8667 102C0.835744 102 4.50645e-08 101.163 0 100.132C-4.50645e-08 99.1005 0.835744 98.2644 1.8667 98.2644Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M1.8667 49.3322C2.89765 49.3322 3.7334 50.1684 3.7334 51.1998C3.7334 52.2313 2.89765 53.0675 1.8667 53.0675C0.835744 53.0675 4.50645e-08 52.2313 0 51.1998C-4.50645e-08 50.1684 0.835744 49.3322 1.8667 49.3322Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M18.2939 98.2644C19.3249 98.2644 20.1606 99.1005 20.1606 100.132C20.1606 101.163 19.3249 102 18.2939 102C17.263 102 16.4272 101.163 16.4272 100.132C16.4272 99.1005 17.263 98.2644 18.2939 98.2644Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M18.2939 49.3322C19.3249 49.3322 20.1606 50.1684 20.1606 51.1998C20.1606 52.2313 19.3249 53.0675 18.2939 53.0675C17.263 53.0675 16.4272 52.2313 16.4272 51.1998C16.4272 50.1684 17.263 49.3322 18.2939 49.3322Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M34.7209 98.2647C35.7519 98.2647 36.5876 99.1008 36.5876 100.132C36.5876 101.164 35.7519 102 34.7209 102C33.69 102 32.8542 101.164 32.8542 100.132C32.8542 99.1008 33.69 98.2647 34.7209 98.2647Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M50.9341 98.2647C51.965 98.2647 52.8008 99.1008 52.8008 100.132C52.8008 101.164 51.965 102 50.9341 102C49.9031 102 49.0674 101.164 49.0674 100.132C49.0674 99.1008 49.9031 98.2647 50.9341 98.2647Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M34.7209 49.3326C35.7519 49.3326 36.5876 50.1687 36.5876 51.2002C36.5876 52.2317 35.7519 53.0678 34.7209 53.0678C33.69 53.0678 32.8542 52.2317 32.8542 51.2002C32.8542 50.1687 33.69 49.3326 34.7209 49.3326Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M50.9341 49.3326C51.965 49.3326 52.8008 50.1687 52.8008 51.2002C52.8008 52.2317 51.965 53.0678 50.9341 53.0678C49.9031 53.0678 49.0674 52.2317 49.0674 51.2002C49.0674 50.1687 49.9031 49.3326 50.9341 49.3326Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M66.9037 82.2029C67.9346 82.2029 68.7704 83.0391 68.7704 84.0705C68.7704 85.102 67.9346 85.9382 66.9037 85.9382C65.8727 85.9382 65.037 85.102 65.037 84.0705C65.037 83.0391 65.8727 82.2029 66.9037 82.2029Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M83.3307 82.2029C84.3616 82.2029 85.1974 83.0391 85.1974 84.0705C85.1974 85.102 84.3616 85.9382 83.3307 85.9382C82.2997 85.9382 81.464 85.102 81.464 84.0705C81.464 83.0391 82.2997 82.2029 83.3307 82.2029Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M99.7576 82.2029C100.789 82.2029 101.624 83.039 101.624 84.0705C101.624 85.102 100.789 85.9382 99.7576 85.9382C98.7266 85.9382 97.8909 85.102 97.8909 84.0705C97.8909 83.039 98.7266 82.2029 99.7576 82.2029Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M66.9037 65.7674C67.9346 65.7674 68.7704 66.6036 68.7704 67.635C68.7704 68.6665 67.9346 69.5027 66.9037 69.5027C65.8727 69.5027 65.037 68.6665 65.037 67.635C65.037 66.6036 65.8727 65.7674 66.9037 65.7674Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M83.3307 65.7677C84.3616 65.7677 85.1974 66.6039 85.1974 67.6353C85.1974 68.6668 84.3616 69.503 83.3307 69.503C82.2997 69.503 81.464 68.6668 81.464 67.6353C81.464 66.6039 82.2997 65.7677 83.3307 65.7677Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M99.7576 65.7677C100.789 65.7677 101.624 66.6039 101.624 67.6353C101.624 68.6668 100.789 69.503 99.7576 69.503C98.7266 69.503 97.8909 68.6668 97.8909 67.6353C97.8909 66.6039 98.7266 65.7677 99.7576 65.7677Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M66.9037 98.2644C67.9346 98.2644 68.7704 99.1005 68.7704 100.132C68.7704 101.163 67.9346 102 66.9037 102C65.8727 102 65.037 101.163 65.037 100.132C65.037 99.1005 65.8727 98.2644 66.9037 98.2644Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M66.9037 49.3322C67.9346 49.3322 68.7704 50.1684 68.7704 51.1998C68.7704 52.2313 67.9346 53.0675 66.9037 53.0675C65.8727 53.0675 65.037 52.2313 65.037 51.1998C65.037 50.1684 65.8727 49.3322 66.9037 49.3322Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M83.3307 98.2644C84.3616 98.2644 85.1974 99.1005 85.1974 100.132C85.1974 101.163 84.3616 102 83.3307 102C82.2997 102 81.464 101.163 81.464 100.132C81.464 99.1005 82.2997 98.2644 83.3307 98.2644Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M83.3307 49.3322C84.3616 49.3322 85.1974 50.1684 85.1974 51.1998C85.1974 52.2313 84.3616 53.0675 83.3307 53.0675C82.2997 53.0675 81.464 52.2313 81.464 51.1998C81.464 50.1684 82.2997 49.3322 83.3307 49.3322Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M99.7576 98.2644C100.789 98.2644 101.624 99.1005 101.624 100.132C101.624 101.163 100.789 102 99.7576 102C98.7266 102 97.8909 101.163 97.8909 100.132C97.8909 99.1005 98.7266 98.2644 99.7576 98.2644Z"
            fill="white" fill-opacity="0.08"></path>
          <path
            d="M99.7576 49.3322C100.789 49.3322 101.624 50.1684 101.624 51.1998C101.624 52.2313 100.789 53.0675 99.7576 53.0675C98.7266 53.0675 97.8909 52.2313 97.8909 51.1998C97.8909 50.1684 98.7266 49.3322 99.7576 49.3322Z"
            fill="white" fill-opacity="0.08"></path>
        </svg>
      </span>
    </div>
    `;

  insertTemplate(selector, html);
}

export function addContact(selector = 'contact', address, email) {
  let html = `
  <div class="absolute left-0 top-0 -z-[1] h-full w-full dark:bg-dark"></div>
    <div class="absolute left-0 top-0 -z-[1] h-1/2 w-full bg-[#E9F9FF] dark:bg-dark-700 lg:h-[45%] xl:h-1/2"></div>
    <div class="container px-4">
      <div class="-mx-4 flex flex-wrap items-center">
        <div class="w-full px-4 lg:w-7/12 xl:w-8/12">
          <div class="ud-contact-content-wrapper">
            <div class="ud-contact-title mb-12 lg:mb-[150px]">
              <span class="mb-6 block text-base font-medium text-dark dark:text-white">
                CONTACT US
              </span>
              <h2 class="max-w-[270px] text-[35px] font-semibold leading-[1.14] text-dark dark:text-white">
                Let's talk about your challange.
              </h2>
            </div>
            <div class="mb-12 flex flex-wrap justify-between lg:mb-0">
              <div class="mb-8 flex w-[330px] max-w-full">
                <div class="mr-6 text-[32px] text-primary">
                  <svg width="29" height="35" viewBox="0 0 29 35" class="fill-current">
                    <path
                      d="M14.5 0.710938C6.89844 0.710938 0.664062 6.72656 0.664062 14.0547C0.664062 19.9062 9.03125 29.5859 12.6406 33.5234C13.1328 34.0703 13.7891 34.3437 14.5 34.3437C15.2109 34.3437 15.8672 34.0703 16.3594 33.5234C19.9688 29.6406 28.3359 19.9062 28.3359 14.0547C28.3359 6.67188 22.1016 0.710938 14.5 0.710938ZM14.9375 32.2109C14.6641 32.4844 14.2812 32.4844 14.0625 32.2109C11.3828 29.3125 2.57812 19.3594 2.57812 14.0547C2.57812 7.71094 7.9375 2.625 14.5 2.625C21.0625 2.625 26.4219 7.76562 26.4219 14.0547C26.4219 19.3594 17.6172 29.2578 14.9375 32.2109Z" />
                    <path
                      d="M14.5 8.58594C11.2734 8.58594 8.59375 11.2109 8.59375 14.4922C8.59375 17.7188 11.2187 20.3984 14.5 20.3984C17.7812 20.3984 20.4062 17.7734 20.4062 14.4922C20.4062 11.2109 17.7266 8.58594 14.5 8.58594ZM14.5 18.4297C12.3125 18.4297 10.5078 16.625 10.5078 14.4375C10.5078 12.25 12.3125 10.4453 14.5 10.4453C16.6875 10.4453 18.4922 12.25 18.4922 14.4375C18.4922 16.625 16.6875 18.4297 14.5 18.4297Z" />
                  </svg>
                </div>
                <div>
                  <h5 class="mb-[18px] text-lg font-semibold text-dark dark:text-white">
                    Our Location
                  </h5>
                  <p class="text-base text-body-color dark:text-dark-6">
                    ${address}
                  </p>
                </div>
              </div>
              <div class="mb-8 flex w-[330px] max-w-full">
                <div class="mr-6 text-[32px] text-primary">
                  <svg width="34" height="25" viewBox="0 0 34 25" class="fill-current">
                    <path
                      d="M30.5156 0.960938H3.17188C1.42188 0.960938 0 2.38281 0 4.13281V20.9219C0 22.6719 1.42188 24.0938 3.17188 24.0938H30.5156C32.2656 24.0938 33.6875 22.6719 33.6875 20.9219V4.13281C33.6875 2.38281 32.2656 0.960938 30.5156 0.960938ZM30.5156 2.875C30.7891 2.875 31.0078 2.92969 31.2266 3.09375L17.6094 11.3516C17.1172 11.625 16.5703 11.625 16.0781 11.3516L2.46094 3.09375C2.67969 2.98438 2.89844 2.875 3.17188 2.875H30.5156ZM30.5156 22.125H3.17188C2.51562 22.125 1.91406 21.5781 1.91406 20.8672V5.00781L15.0391 12.9922C15.5859 13.3203 16.1875 13.4844 16.7891 13.4844C17.3906 13.4844 17.9922 13.3203 18.5391 12.9922L31.6641 5.00781V20.8672C31.7734 21.5781 31.1719 22.125 30.5156 22.125Z" />
                  </svg>
                </div>
                <div>
                  <h5 class="mb-[18px] text-lg font-semibold text-dark dark:text-white">
                    How Can We Help?
                  </h5>
                  <p class="text-base text-body-color dark:text-dark-6">
                    <a href="mailto:${email}">${email}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full px-4 lg:w-5/12 xl:w-4/12">
          <div
            class="wow fadeInUp rounded-lg bg-white px-8 py-10 shadow-testimonial dark:bg-dark-2 dark:shadow-none sm:px-10 sm:py-12 md:p-[60px] lg:p-10 lg:px-10 lg:py-12 2xl:p-[60px]"
            data-wow-delay=".2s
              ">
            <h3 class="mb-8 text-2xl font-semibold text-dark dark:text-white md:text-[28px] md:leading-[1.42]">
              Send us a Message
            </h3>
            <form action="https://formspree.io/f/meoqoplp" method="POST">
              <div class="mb-[22px]">
                <label for="fullName" class="mb-4 block text-sm text-body-color dark:text-dark-6">Full Name*</label>
                <input type="text" name="fullName" placeholder="John Doe"
                  class="w-full border-0 border-b border-[#f1f1f1] bg-transparent pb-3 text-body-color placeholder:text-body-color/60 focus:border-primary focus:outline-none dark:border-dark-3 dark:text-dark-6" />
              </div>
              <div class="mb-[22px]">
                <label for="email" class="mb-4 block text-sm text-body-color dark:text-dark-6">Email*</label>
                <input type="email" name="email" placeholder="example@yourmail.com"
                  class="w-full border-0 border-b border-[#f1f1f1] bg-transparent pb-3 text-body-color placeholder:text-body-color/60 focus:border-primary focus:outline-none dark:border-dark-3 dark:text-dark-6" />
              </div>
              <div class="mb-[22px]">
                <label for="phone" class="mb-4 block text-sm text-body-color dark:text-dark-6">Phone*</label>
                <input type="text" name="phone" placeholder="+1 (415) 555-1234"
                  class="w-full border-0 border-b border-[#f1f1f1] bg-transparent pb-3 text-body-color placeholder:text-body-color/60 focus:border-primary focus:outline-none dark:border-dark-3 dark:text-dark-6" />
              </div>
              <div class="mb-[30px]">
                <label for="message" class="mb-4 block text-sm text-body-color dark:text-dark-6">Message*</label>
                <textarea name="message" rows="1" placeholder="type your message here"
                  class="w-full resize-none border-0 border-b border-[#f1f1f1] bg-transparent pb-3 text-body-color placeholder:text-body-color/60 focus:border-primary focus:outline-none dark:border-dark-3 dark:text-dark-6"></textarea>
              </div>
              <div class="mb-0">
                <button type="submit"
                  class="inline-flex items-center justify-center rounded-md bg-primary px-10 py-3 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-blue-dark">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  insertTemplate(selector, html);
}

export function addBlog(selector = 'blog') {
  let html = `
  <div class="container mx-auto">
      <div class="-mx-4 flex flex-wrap justify-center">
        <div class="w-full px-4">
          <div class="mx-auto mb-[60px] max-w-[485px] text-center">
            <span class="mb-2 block text-lg font-semibold text-primary">
              Blog
            </span>
            <h2 class="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]">
              Our Recent News
            </h2>
            <p class="text-base text-body-color dark:text-dark-6">
              There are many variations of passages of Lorem Ipsum available
              but the majority have suffered alteration in some form.
            </p>
          </div>
        </div>
      </div>
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4 md:w-1/2 lg:w-1/3">
          <div class="wow fadeInUp group mb-10" data-wow-delay=".1s">
            <div class="mb-8 overflow-hidden rounded-[5px]">
              <a href="blog-details.html" class="block">
                <img src="./assets/images/blog/blog-01.jpg" alt="image"
                  class="w-full transition group-hover:rotate-6 group-hover:scale-125" />
              </a>
            </div>
            <div>
              <span
                class="mb-6 inline-block rounded-[5px] bg-primary px-4 py-0.5 text-center text-xs font-medium leading-loose text-white">
                Dec 22, 2023
              </span>
              <h3>
                <a href="javascript:void(0)"
                  class="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl">
                  Meet AutoManage, the best AI management tools
                </a>
              </h3>
              <p class="max-w-[370px] text-base text-body-color dark:text-dark-6">
                Lorem Ipsum is simply dummy text of the printing and
                typesetting industry.
              </p>
            </div>
          </div>
        </div>
        <div class="w-full px-4 md:w-1/2 lg:w-1/3">
          <div class="wow fadeInUp group mb-10" data-wow-delay=".15s">
            <div class="mb-8 overflow-hidden rounded-[5px]">
              <a href="blog-details.html" class="block">
                <img src="./assets/images/blog/blog-02.jpg" alt="image"
                  class="w-full transition group-hover:rotate-6 group-hover:scale-125" />
              </a>
            </div>
            <div>
              <span
                class="mb-6 inline-block rounded-[5px] bg-primary px-4 py-0.5 text-center text-xs font-medium leading-loose text-white">
                Mar 15, 2023
              </span>
              <h3>
                <a href="javascript:void(0)"
                  class="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl">
                  How to earn more money as a wellness coach
                </a>
              </h3>
              <p class="max-w-[370px] text-base text-body-color dark:text-dark-6">
                Lorem Ipsum is simply dummy text of the printing and
                typesetting industry.
              </p>
            </div>
          </div>
        </div>
        <div class="w-full px-4 md:w-1/2 lg:w-1/3">
          <div class="wow fadeInUp group mb-10" data-wow-delay=".2s">
            <div class="mb-8 overflow-hidden rounded-[5px]">
              <a href="blog-details.html" class="block">
                <img src="./assets/images/blog/blog-03.jpg" alt="image"
                  class="w-full transition group-hover:rotate-6 group-hover:scale-125" />
              </a>
            </div>
            <div>
              <span
                class="mb-6 inline-block rounded-[5px] bg-primary px-4 py-0.5 text-center text-xs font-medium leading-loose text-white">
                Jan 05, 2023
              </span>
              <h3>
                <a href="javascript:void(0)"
                  class="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl">
                  The no-fuss guide to upselling and cross selling
                </a>
              </h3>
              <p class="max-w-[370px] text-base text-body-color dark:text-dark-6">
                Lorem Ipsum is simply dummy text of the printing and
                typesetting industry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  insertTemplate(selector, html);
}

export function addFaq(selector = 'faq', questions = []) {
  let faqHtml = questions.map(question => {
    return `
    <div class="w-full px-4 lg:w-1/2">
      <div class="mb-12 flex lg:mb-[70px]">
        <div
          class="mr-4 flex h-[50px] w-full max-w-[50px] items-center justify-center rounded-xl bg-primary text-white sm:mr-6 sm:h-[60px] sm:max-w-[60px]">
          <i class="ph ph-question-mark text-white text-[32px]"></i>
        </div>
        <div class="w-full">
          <h3 class="mb-6 text-xl font-semibold text-dark dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
            ${question.q}
          </h3>
          <p class="text-base text-body-color dark:text-dark-6">
            ${question.a}
          </p>
        </div>
      </div>
    </div>
    `;
  }).join("");

  let html = `
  <div class="container mx-auto">
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4">
          <div class="mx-auto mb-[60px] max-w-[520px] text-center">
            <span class="mb-2 block text-lg font-semibold text-primary">
              FAQ
            </span>
            <h2 class="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
              Any Questions? Look Here
            </h2>
            <p class="mx-auto max-w-[485px] text-base text-body-color dark:text-dark-6">
              If you still have questions, don’t hesitate to contact us! We’re here to help!
            </p>
          </div>
        </div>
      </div>
      <div class="-mx-4 flex flex-wrap">
        ${faqHtml}
      </div>
    </div>
    <div>
      <span class="absolute left-4 top-4 -z-[1]">
        <svg width="48" height="134" viewBox="0 0 48 134" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="45.6673" cy="132" r="1.66667" transform="rotate(180 45.6673 132)" fill="#13C296" />
          <circle cx="45.6673" cy="117.333" r="1.66667" transform="rotate(180 45.6673 117.333)" fill="#13C296" />
          <circle cx="45.6673" cy="102.667" r="1.66667" transform="rotate(180 45.6673 102.667)" fill="#13C296" />
          <circle cx="45.6673" cy="88.0001" r="1.66667" transform="rotate(180 45.6673 88.0001)" fill="#13C296" />
          <circle cx="45.6673" cy="73.3335" r="1.66667" transform="rotate(180 45.6673 73.3335)" fill="#13C296" />
          <circle cx="45.6673" cy="45.0001" r="1.66667" transform="rotate(180 45.6673 45.0001)" fill="#13C296" />
          <circle cx="45.6673" cy="16.0001" r="1.66667" transform="rotate(180 45.6673 16.0001)" fill="#13C296" />
          <circle cx="45.6673" cy="59.0001" r="1.66667" transform="rotate(180 45.6673 59.0001)" fill="#13C296" />
          <circle cx="45.6673" cy="30.6668" r="1.66667" transform="rotate(180 45.6673 30.6668)" fill="#13C296" />
          <circle cx="45.6673" cy="1.66683" r="1.66667" transform="rotate(180 45.6673 1.66683)" fill="#13C296" />
          <circle cx="31.0013" cy="132" r="1.66667" transform="rotate(180 31.0013 132)" fill="#13C296" />
          <circle cx="31.0013" cy="117.333" r="1.66667" transform="rotate(180 31.0013 117.333)" fill="#13C296" />
          <circle cx="31.0013" cy="102.667" r="1.66667" transform="rotate(180 31.0013 102.667)" fill="#13C296" />
          <circle cx="31.0013" cy="88.0001" r="1.66667" transform="rotate(180 31.0013 88.0001)" fill="#13C296" />
          <circle cx="31.0013" cy="73.3335" r="1.66667" transform="rotate(180 31.0013 73.3335)" fill="#13C296" />
          <circle cx="31.0013" cy="45.0001" r="1.66667" transform="rotate(180 31.0013 45.0001)" fill="#13C296" />
          <circle cx="31.0013" cy="16.0001" r="1.66667" transform="rotate(180 31.0013 16.0001)" fill="#13C296" />
          <circle cx="31.0013" cy="59.0001" r="1.66667" transform="rotate(180 31.0013 59.0001)" fill="#13C296" />
          <circle cx="31.0013" cy="30.6668" r="1.66667" transform="rotate(180 31.0013 30.6668)" fill="#13C296" />
          <circle cx="31.0013" cy="1.66683" r="1.66667" transform="rotate(180 31.0013 1.66683)" fill="#13C296" />
          <circle cx="16.3333" cy="132" r="1.66667" transform="rotate(180 16.3333 132)" fill="#13C296" />
          <circle cx="16.3333" cy="117.333" r="1.66667" transform="rotate(180 16.3333 117.333)" fill="#13C296" />
          <circle cx="16.3333" cy="102.667" r="1.66667" transform="rotate(180 16.3333 102.667)" fill="#13C296" />
          <circle cx="16.3333" cy="88.0001" r="1.66667" transform="rotate(180 16.3333 88.0001)" fill="#13C296" />
          <circle cx="16.3333" cy="73.3335" r="1.66667" transform="rotate(180 16.3333 73.3335)" fill="#13C296" />
          <circle cx="16.3333" cy="45.0001" r="1.66667" transform="rotate(180 16.3333 45.0001)" fill="#13C296" />
          <circle cx="16.3333" cy="16.0001" r="1.66667" transform="rotate(180 16.3333 16.0001)" fill="#13C296" />
          <circle cx="16.3333" cy="59.0001" r="1.66667" transform="rotate(180 16.3333 59.0001)" fill="#13C296" />
          <circle cx="16.3333" cy="30.6668" r="1.66667" transform="rotate(180 16.3333 30.6668)" fill="#13C296" />
          <circle cx="16.3333" cy="1.66683" r="1.66667" transform="rotate(180 16.3333 1.66683)" fill="#13C296" />
          <circle cx="1.66732" cy="132" r="1.66667" transform="rotate(180 1.66732 132)" fill="#13C296" />
          <circle cx="1.66732" cy="117.333" r="1.66667" transform="rotate(180 1.66732 117.333)" fill="#13C296" />
          <circle cx="1.66732" cy="102.667" r="1.66667" transform="rotate(180 1.66732 102.667)" fill="#13C296" />
          <circle cx="1.66732" cy="88.0001" r="1.66667" transform="rotate(180 1.66732 88.0001)" fill="#13C296" />
          <circle cx="1.66732" cy="73.3335" r="1.66667" transform="rotate(180 1.66732 73.3335)" fill="#13C296" />
          <circle cx="1.66732" cy="45.0001" r="1.66667" transform="rotate(180 1.66732 45.0001)" fill="#13C296" />
          <circle cx="1.66732" cy="16.0001" r="1.66667" transform="rotate(180 1.66732 16.0001)" fill="#13C296" />
          <circle cx="1.66732" cy="59.0001" r="1.66667" transform="rotate(180 1.66732 59.0001)" fill="#13C296" />
          <circle cx="1.66732" cy="30.6668" r="1.66667" transform="rotate(180 1.66732 30.6668)" fill="#13C296" />
          <circle cx="1.66732" cy="1.66683" r="1.66667" transform="rotate(180 1.66732 1.66683)" fill="#13C296" />
        </svg>
      </span>
      <span class="absolute bottom-4 right-4 -z-[1]">
        <svg width="48" height="134" viewBox="0 0 48 134" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="45.6673" cy="132" r="1.66667" transform="rotate(180 45.6673 132)" fill="#3758F9" />
          <circle cx="45.6673" cy="117.333" r="1.66667" transform="rotate(180 45.6673 117.333)" fill="#3758F9" />
          <circle cx="45.6673" cy="102.667" r="1.66667" transform="rotate(180 45.6673 102.667)" fill="#3758F9" />
          <circle cx="45.6673" cy="88.0001" r="1.66667" transform="rotate(180 45.6673 88.0001)" fill="#3758F9" />
          <circle cx="45.6673" cy="73.3333" r="1.66667" transform="rotate(180 45.6673 73.3333)" fill="#3758F9" />
          <circle cx="45.6673" cy="45.0001" r="1.66667" transform="rotate(180 45.6673 45.0001)" fill="#3758F9" />
          <circle cx="45.6673" cy="16.0001" r="1.66667" transform="rotate(180 45.6673 16.0001)" fill="#3758F9" />
          <circle cx="45.6673" cy="59.0001" r="1.66667" transform="rotate(180 45.6673 59.0001)" fill="#3758F9" />
          <circle cx="45.6673" cy="30.6668" r="1.66667" transform="rotate(180 45.6673 30.6668)" fill="#3758F9" />
          <circle cx="45.6673" cy="1.66683" r="1.66667" transform="rotate(180 45.6673 1.66683)" fill="#3758F9" />
          <circle cx="31.0006" cy="132" r="1.66667" transform="rotate(180 31.0006 132)" fill="#3758F9" />
          <circle cx="31.0006" cy="117.333" r="1.66667" transform="rotate(180 31.0006 117.333)" fill="#3758F9" />
          <circle cx="31.0006" cy="102.667" r="1.66667" transform="rotate(180 31.0006 102.667)" fill="#3758F9" />
          <circle cx="31.0006" cy="88.0001" r="1.66667" transform="rotate(180 31.0006 88.0001)" fill="#3758F9" />
          <circle cx="31.0008" cy="73.3333" r="1.66667" transform="rotate(180 31.0008 73.3333)" fill="#3758F9" />
          <circle cx="31.0008" cy="45.0001" r="1.66667" transform="rotate(180 31.0008 45.0001)" fill="#3758F9" />
          <circle cx="31.0008" cy="16.0001" r="1.66667" transform="rotate(180 31.0008 16.0001)" fill="#3758F9" />
          <circle cx="31.0008" cy="59.0001" r="1.66667" transform="rotate(180 31.0008 59.0001)" fill="#3758F9" />
          <circle cx="31.0008" cy="30.6668" r="1.66667" transform="rotate(180 31.0008 30.6668)" fill="#3758F9" />
          <circle cx="31.0008" cy="1.66683" r="1.66667" transform="rotate(180 31.0008 1.66683)" fill="#3758F9" />
          <circle cx="16.3341" cy="132" r="1.66667" transform="rotate(180 16.3341 132)" fill="#3758F9" />
          <circle cx="16.3341" cy="117.333" r="1.66667" transform="rotate(180 16.3341 117.333)" fill="#3758F9" />
          <circle cx="16.3341" cy="102.667" r="1.66667" transform="rotate(180 16.3341 102.667)" fill="#3758F9" />
          <circle cx="16.3341" cy="88.0001" r="1.66667" transform="rotate(180 16.3341 88.0001)" fill="#3758F9" />
          <circle cx="16.3338" cy="73.3333" r="1.66667" transform="rotate(180 16.3338 73.3333)" fill="#3758F9" />
          <circle cx="16.3338" cy="45.0001" r="1.66667" transform="rotate(180 16.3338 45.0001)" fill="#3758F9" />
          <circle cx="16.3338" cy="16.0001" r="1.66667" transform="rotate(180 16.3338 16.0001)" fill="#3758F9" />
          <circle cx="16.3338" cy="59.0001" r="1.66667" transform="rotate(180 16.3338 59.0001)" fill="#3758F9" />
          <circle cx="16.3338" cy="30.6668" r="1.66667" transform="rotate(180 16.3338 30.6668)" fill="#3758F9" />
          <circle cx="16.3338" cy="1.66683" r="1.66667" transform="rotate(180 16.3338 1.66683)" fill="#3758F9" />
          <circle cx="1.66732" cy="132" r="1.66667" transform="rotate(180 1.66732 132)" fill="#3758F9" />
          <circle cx="1.66732" cy="117.333" r="1.66667" transform="rotate(180 1.66732 117.333)" fill="#3758F9" />
          <circle cx="1.66732" cy="102.667" r="1.66667" transform="rotate(180 1.66732 102.667)" fill="#3758F9" />
          <circle cx="1.66732" cy="88.0001" r="1.66667" transform="rotate(180 1.66732 88.0001)" fill="#3758F9" />
          <circle cx="1.66732" cy="73.3333" r="1.66667" transform="rotate(180 1.66732 73.3333)" fill="#3758F9" />
          <circle cx="1.66732" cy="45.0001" r="1.66667" transform="rotate(180 1.66732 45.0001)" fill="#3758F9" />
          <circle cx="1.66732" cy="16.0001" r="1.66667" transform="rotate(180 1.66732 16.0001)" fill="#3758F9" />
          <circle cx="1.66732" cy="59.0001" r="1.66667" transform="rotate(180 1.66732 59.0001)" fill="#3758F9" />
          <circle cx="1.66732" cy="30.6668" r="1.66667" transform="rotate(180 1.66732 30.6668)" fill="#3758F9" />
          <circle cx="1.66732" cy="1.66683" r="1.66667" transform="rotate(180 1.66732 1.66683)" fill="#3758F9" />
        </svg>
      </span>
    </div>
  `;

  insertTemplate(selector, html);

  // ===== Faq accordion
  const faqs = document.querySelectorAll(".single-faq");
  faqs.forEach((el) => {
    el.querySelector(".faq-btn").addEventListener("click", () => {
      el.querySelector(".icon").classList.toggle("rotate-180");
      el.querySelector(".faq-content").classList.toggle("hidden");
    });
  });
}

export function addPricing(selector = 'pricing') {
  const monthlyPrice = 50.00; // Monthly price
  const yearlyPrice = 500.00; // Yearly price

  let html = `
  <div class="container mx-auto">
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4">
          <div class="mx-auto mb-[60px] max-w-[510px] text-center">
            <span class="mb-2 block text-lg font-semibold text-primary">
              Pricing
            </span>
            <h2 class="mb-3 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]">
              Pricing Plans
            </h2>
            <p class="mb-3 text-base text-body-color dark:text-dark-6">
              Save <strong>~15%</strong> with annual billing.
            </p>
            <p class="flex items-center justify-center my-6">
              <label class="flex items-center cursor-pointer">
                <input type="radio" name="plan" value="monthly" class="sr-only" checked>
                <span class="span-monthly px-4 py-2 rounded-md dark:text-white text-white bg-primary">Monthly</span>
              </label>
              <label class="flex items-center cursor-pointer">
                <input type="radio" name="plan" value="yearly" class="sr-only">
                <span class="span-yearly px-4 py-2 rounded-md dark:text-white text-dark">Yearly</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div class="-mx-4 flex flex-wrap justify-center">
        <div class="w-full px-4 md:w-1/2 lg:w-1/3">
          <div
            class="relative z-10 mb-10 overflow-hidden rounded-xl bg-white px-8 py-10 shadow-pricing dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-14">
            <!--<p class="price-recommended hidden absolute right-[-50px] top-[60px] inline-block -rotate-90 rounded-bl-md rounded-tl-md bg-primary px-5 py-2 text-base font-medium text-white">
              Recommended
            </p>-->
            <span class="mb-5 block text-xl font-medium text-dark dark:text-white">
              Professional
            </span>
            <h2 class="mb-11 text-4xl font-semibold text-dark dark:text-white xl:text-[42px] xl:leading-[1.21]">
              <span class="text-xl font-medium">$</span>
              <span class="-ml-1 -tracking-[2px] price-plan-value">${monthlyPrice}</span>
              <span class="text-base font-normal text-body-color dark:text-dark-6 price-plan-text">
                / month
              </span>
            </h2>
            <div class="mb-[50px]">
              <h5 class="mb-5 text-lg font-medium text-dark dark:text-white">
                Features
              </h5>
              <div class="flex flex-col gap-[14px]">
                <p class="text-base text-body-color dark:text-dark-6">
                  30 days free trial
                </p>
                <p class="text-base text-body-color dark:text-dark-6">
                  Unlimitted projects
                </p>
                <p class="text-base text-body-color dark:text-dark-6">
                  5 min monitoring interval
                </p>
                <p class="text-base text-body-color dark:text-dark-6">
                  SSL & Domain validation
                </p>
              </div>
            </div>
            <a href="#"
              class="price-link inline-block rounded-md bg-primary px-7 py-3 text-center text-base font-medium text-white transition hover:bg-blue-dark">
              Subscribe Now
            </a>
          </div>
        </div>
        <div class="w-full px-4 md:w-1/2 lg:w-1/3">
          <div
            class="relative z-10 mb-10 overflow-hidden rounded-xl bg-white px-8 py-10 shadow-pricing dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-14">
            <span class="mb-5 block text-xl font-medium text-dark dark:text-white">
              Enterprise
            </span>
            <h2 class="mb-11 text-4xl font-semibold text-dark dark:text-white xl:text-[42px] xl:leading-[1.21]">
              <span class="text-xl font-medium"></span>
              <span class="-ml-1 -tracking-[2px]">Contact us</span>
              <span class="text-base font-normal text-body-color dark:text-dark-6">
              </span>
            </h2>
            <div class="mb-[50px]">
              <h5 class="mb-5 text-lg font-medium text-dark dark:text-white">
                Features
              </h5>
              <div class="flex flex-col gap-[14px]">
                <p class="text-base text-body-color dark:text-dark-6">
                  Custom domain
                </p>
                <p class="text-base text-body-color dark:text-dark-6">
                  Unlimitted projects
                </p>
                <p class="text-base text-body-color dark:text-dark-6">
                  30 sec monitoring interval
                </p>
                <p class="text-base text-body-color dark:text-dark-6">
                  Priority support
                </p>
              </div>
            </div>
            <a href="index.html#contact"
              class="inline-block rounded-md bg-primary px-7 py-3 text-center text-base font-medium text-white transition hover:bg-blue-dark">
              Contact us
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  insertTemplate(selector, html);

  const radios = document.querySelectorAll('input[name="plan"]');
  const pricePlanValue = document.querySelector('.price-plan-value');
  const pricePlanText = document.querySelector('.price-plan-text');
  const priceLink = document.querySelector('.price-link');
  const spanMonthly = document.querySelector('.span-monthly');
  const spanYearly = document.querySelector('.span-yearly');
  
  function setPriceButtonClass(span, isSelected = true) {
    if (isSelected) {
      span.classList.add('bg-primary', 'text-white');
      span.classList.remove('text-dark');
    }
    else {
      span.classList.remove('bg-primary', 'text-white');
      span.classList.add('text-dark');
    }
  }

  function setPriceButtonLink(url) {
    priceLink.setAttribute('href', url);
  }

  // Set initial state for payment link
  setPriceButtonLink(vars.monthlyPriceUrl);

  radios.forEach(radio => {
    radio.addEventListener('change', function () {
      if (this.value === 'monthly') {
        setPriceButtonClass(spanMonthly, true);
        setPriceButtonClass(spanYearly, false);
        setPriceButtonLink(vars.monthlyPriceUrl);

        // Show monthly prices
        pricePlanValue.textContent = monthlyPrice;
        pricePlanText.textContent = '/ month';
      }
      else {
        setPriceButtonClass(spanMonthly, false);
        setPriceButtonClass(spanYearly, true);
        setPriceButtonLink(vars.yearlyPriceUrl);

        // Show yearly prices
        pricePlanValue.textContent = yearlyPrice;
        pricePlanText.textContent = '/ year';
      }
    });
  });
}

export function addCta(selector = 'cta', headline = "Headline", message = "message", buttonText, buttonLink = vars.signUpUrl) {
  let html = `
  <div class="container mx-auto">
      <div class="relative overflow-hidden">
        <div class="-mx-4 flex flex-wrap items-stretch">
          <div class="w-full px-4">
            <div class="mx-auto max-w-[570px] text-center">
              <h2 class="mb-2.5 text-3xl font-bold text-white md:text-[38px] md:leading-[1.44]">
                <span>${headline}</span>
              </h2>
              <p class="mx-auto mb-6 max-w-[515px] text-base leading-[1.5] text-white">
                ${message}
              </p>
              <a href="${buttonLink}" target="_blank" class="inline-block rounded-md border border-transparent bg-secondary px-7 py-3 text-base font-medium text-dark transition hover:bg-[#0BB489]">
                ${buttonText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <span class="absolute left-0 top-0">
      </span>
      <span class="absolute bottom-0 right-0">
      </span>
    </div>
  `;

  insertTemplate(selector, html);
}

export function addAbout(selector = 'about', headline = "Headline", message = "message", link = "", content = "") {
  let html = `
  <div class="container">
      <div class="wow fadeInUp" data-wow-delay=".2s">
        <div class="-mx-4 flex flex-wrap items-center">
          <div class="w-full px-4 lg:w-1/2">
            <div class="mb-12 max-w-[540px] lg:mb-0">
              <h2
                class="mb-5 text-3xl font-bold leading-tight text-dark dark:text-white sm:text-[40px] sm:leading-[1.2]">
                ${headline}
              </h2>
              <p class="mb-10 text-base leading-relaxed text-body-color dark:text-dark-6">
                ${message}
              </p>

              <a href="${link}"
                class="inline-flex items-center justify-center rounded-md border border-primary bg-primary px-7 py-3 text-center text-base font-medium text-white hover:border-blue-dark hover:bg-blue-dark">
                Know More
              </a>
            </div>
          </div>

          <div class="w-full px-4 lg:w-1/2">
            <div class="-mx-2 flex flex-wrap sm:-mx-4 lg:-mx-2 xl:-mx-4">
              <div class="w-full px-2 sm:w-1 sm:px-4 lg:px-2 xl:px-4 mb-4 flex items-center justify-center">
                ${content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  insertTemplate(selector, html);
}

export function addFeatures(selector = 'features', features = []) {
  let columnsCount = Math.min(4, features.length);

  var featuresHtml = features.map(feature => {
    return `
    <div class="w-full px-4 md:w-1 lg:w-1/${columnsCount}">
          <div class="wow fadeInUp group mb-12" data-wow-delay=".1s">
            <div
              class="relative z-10 mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-[14px] bg-primary">
              <span
                class="absolute left-0 top-0 -z-[1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-[14px] bg-primary bg-opacity-20 duration-300 group-hover:rotate-45"></span>
              <i class="ph ${feature.icon} text-white text-[32px]"></i>
            </div>
            <h4 class="mb-3 text-xl font-bold text-dark dark:text-white">
              ${feature.title}
            </h4>
            <p class="mb-8 text-body-color dark:text-dark-6 lg:mb-9">
              ${feature.text}
            </p>
            <a href="${feature.link}"
              class="text-base font-medium text-dark hover:text-primary dark:text-white dark:hover:text-primary">
              Learn More
            </a>
          </div>
        </div>
    `;
  }).join("");

  let html = `
  <div class="container">
      <div class="-mx-4 flex flex-wrap">
        ${featuresHtml}
      </div>
    </div>
  `;

  insertTemplate(selector, html);
}

export function addHero(selector = 'home', headline, message) {
  let html = `
  <div class="container">
      <div class="-mx-4 flex flex-wrap items-center">
        <div class="w-full px-4">
          <div class="hero-content wow fadeInUp mx-auto max-w-[780px] text-center" data-wow-delay=".2s">
            <h1
              class="mb-6 text-3xl font-bold leading-snug text-white sm:text-4xl sm:leading-snug lg:text-5xl lg:leading-[1.2]">
              ${headline}
            </h1>
            <p class="mx-auto mb-9 max-w-[600px] text-base font-medium text-white sm:text-lg sm:leading-[1.44]">
              ${message}
            </p>
            <ul class="mb-10 flex flex-wrap items-center justify-center gap-5">
              <li>
                <a href="${vars.signInUrl}" target="_blank"
                  class="flex items-center gap-4 rounded-md bg-white/[0.12] px-6 py-[14px] text-base font-medium text-white transition duration-300 ease-in-out hover:bg-white hover:text-dark">
                  <i style="font-size: 24px" class="ph ph-cloud-check"></i>
                  Cloud App
                </a>
              </li>
              <li>
                <a href="${vars.dockerUrl}" target="_blank"
                  class="flex items-center gap-4 rounded-md bg-white/[0.12] px-6 py-[14px] text-base font-medium text-white transition duration-300 ease-in-out hover:bg-white hover:text-dark">
                  <i style="font-size: 24px" class="ph ph-terminal-window"></i>
                  Docker
                </a>
              </li>
              <li>
                <a href="${vars.monthlyPriceUrl}"
                  class="flex items-center gap-4 rounded-md bg-white px-6 py-[14px] text-base font-medium text-dark shadow-1 transition duration-300 ease-in-out hover:bg-dark hover:text-white">
                  <i style="font-size: 24px" class="ph ph-receipt"></i>
                  Subscribe Now
                </a>
              </li>
            </ul>
            <div>
              <p class="mb-2 text-center text-base text-sm text-white">
                Currently, we executed more than <strong>1,000,000+</strong> tests.
              </p>
            </div>
          </div>
        </div>

        <div class="w-full px-4">
          <div class="wow fadeInUp relative z-10 mx-auto max-w-[845px]" data-wow-delay=".25s">
            <div class="mt-16">
              <img
                src="assets/images/hero/hero-image-white.png"
                alt="hero"
                class="dark:hidden mx-auto max-w-full rounded-t-xl rounded-tr-xl"
              />
              <img
                src="assets/images/hero/hero-image-black.png"
                alt="hero"
                class="hidden dark:block mx-auto max-w-full rounded-t-xl rounded-tr-xl"
              />
            </div>
            <div class="absolute -left-9 bottom-0 z-[-1]">
              <svg width="134" height="106" viewBox="0 0 134 106" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="1.66667" cy="104" r="1.66667" transform="rotate(-90 1.66667 104)" fill="white" />
                <circle cx="16.3333" cy="104" r="1.66667" transform="rotate(-90 16.3333 104)" fill="white" />
                <circle cx="31" cy="104" r="1.66667" transform="rotate(-90 31 104)" fill="white" />
                <circle cx="45.6667" cy="104" r="1.66667" transform="rotate(-90 45.6667 104)" fill="white" />
                <circle cx="60.3333" cy="104" r="1.66667" transform="rotate(-90 60.3333 104)" fill="white" />
                <circle cx="88.6667" cy="104" r="1.66667" transform="rotate(-90 88.6667 104)" fill="white" />
                <circle cx="117.667" cy="104" r="1.66667" transform="rotate(-90 117.667 104)" fill="white" />
                <circle cx="74.6667" cy="104" r="1.66667" transform="rotate(-90 74.6667 104)" fill="white" />
                <circle cx="103" cy="104" r="1.66667" transform="rotate(-90 103 104)" fill="white" />
                <circle cx="132" cy="104" r="1.66667" transform="rotate(-90 132 104)" fill="white" />
                <circle cx="1.66667" cy="89.3333" r="1.66667" transform="rotate(-90 1.66667 89.3333)" fill="white" />
                <circle cx="16.3333" cy="89.3333" r="1.66667" transform="rotate(-90 16.3333 89.3333)" fill="white" />
                <circle cx="31" cy="89.3333" r="1.66667" transform="rotate(-90 31 89.3333)" fill="white" />
                <circle cx="45.6667" cy="89.3333" r="1.66667" transform="rotate(-90 45.6667 89.3333)" fill="white" />
                <circle cx="60.3333" cy="89.3338" r="1.66667" transform="rotate(-90 60.3333 89.3338)" fill="white" />
                <circle cx="88.6667" cy="89.3338" r="1.66667" transform="rotate(-90 88.6667 89.3338)" fill="white" />
                <circle cx="117.667" cy="89.3338" r="1.66667" transform="rotate(-90 117.667 89.3338)" fill="white" />
                <circle cx="74.6667" cy="89.3338" r="1.66667" transform="rotate(-90 74.6667 89.3338)" fill="white" />
                <circle cx="103" cy="89.3338" r="1.66667" transform="rotate(-90 103 89.3338)" fill="white" />
                <circle cx="132" cy="89.3338" r="1.66667" transform="rotate(-90 132 89.3338)" fill="white" />
                <circle cx="1.66667" cy="74.6673" r="1.66667" transform="rotate(-90 1.66667 74.6673)" fill="white" />
                <circle cx="1.66667" cy="31.0003" r="1.66667" transform="rotate(-90 1.66667 31.0003)" fill="white" />
                <circle cx="16.3333" cy="74.6668" r="1.66667" transform="rotate(-90 16.3333 74.6668)" fill="white" />
                <circle cx="16.3333" cy="31.0003" r="1.66667" transform="rotate(-90 16.3333 31.0003)" fill="white" />
                <circle cx="31" cy="74.6668" r="1.66667" transform="rotate(-90 31 74.6668)" fill="white" />
                <circle cx="31" cy="31.0003" r="1.66667" transform="rotate(-90 31 31.0003)" fill="white" />
                <circle cx="45.6667" cy="74.6668" r="1.66667" transform="rotate(-90 45.6667 74.6668)" fill="white" />
                <circle cx="45.6667" cy="31.0003" r="1.66667" transform="rotate(-90 45.6667 31.0003)" fill="white" />
                <circle cx="60.3333" cy="74.6668" r="1.66667" transform="rotate(-90 60.3333 74.6668)" fill="white" />
                <circle cx="60.3333" cy="31.0001" r="1.66667" transform="rotate(-90 60.3333 31.0001)" fill="white" />
                <circle cx="88.6667" cy="74.6668" r="1.66667" transform="rotate(-90 88.6667 74.6668)" fill="white" />
                <circle cx="88.6667" cy="31.0001" r="1.66667" transform="rotate(-90 88.6667 31.0001)" fill="white" />
                <circle cx="117.667" cy="74.6668" r="1.66667" transform="rotate(-90 117.667 74.6668)" fill="white" />
                <circle cx="117.667" cy="31.0001" r="1.66667" transform="rotate(-90 117.667 31.0001)" fill="white" />
                <circle cx="74.6667" cy="74.6668" r="1.66667" transform="rotate(-90 74.6667 74.6668)" fill="white" />
                <circle cx="74.6667" cy="31.0001" r="1.66667" transform="rotate(-90 74.6667 31.0001)" fill="white" />
                <circle cx="103" cy="74.6668" r="1.66667" transform="rotate(-90 103 74.6668)" fill="white" />
                <circle cx="103" cy="31.0001" r="1.66667" transform="rotate(-90 103 31.0001)" fill="white" />
                <circle cx="132" cy="74.6668" r="1.66667" transform="rotate(-90 132 74.6668)" fill="white" />
                <circle cx="132" cy="31.0001" r="1.66667" transform="rotate(-90 132 31.0001)" fill="white" />
                <circle cx="1.66667" cy="60.0003" r="1.66667" transform="rotate(-90 1.66667 60.0003)" fill="white" />
                <circle cx="1.66667" cy="16.3336" r="1.66667" transform="rotate(-90 1.66667 16.3336)" fill="white" />
                <circle cx="16.3333" cy="60.0003" r="1.66667" transform="rotate(-90 16.3333 60.0003)" fill="white" />
                <circle cx="16.3333" cy="16.3336" r="1.66667" transform="rotate(-90 16.3333 16.3336)" fill="white" />
                <circle cx="31" cy="60.0003" r="1.66667" transform="rotate(-90 31 60.0003)" fill="white" />
                <circle cx="31" cy="16.3336" r="1.66667" transform="rotate(-90 31 16.3336)" fill="white" />
                <circle cx="45.6667" cy="60.0003" r="1.66667" transform="rotate(-90 45.6667 60.0003)" fill="white" />
                <circle cx="45.6667" cy="16.3336" r="1.66667" transform="rotate(-90 45.6667 16.3336)" fill="white" />
                <circle cx="60.3333" cy="60.0003" r="1.66667" transform="rotate(-90 60.3333 60.0003)" fill="white" />
                <circle cx="60.3333" cy="16.3336" r="1.66667" transform="rotate(-90 60.3333 16.3336)" fill="white" />
                <circle cx="88.6667" cy="60.0003" r="1.66667" transform="rotate(-90 88.6667 60.0003)" fill="white" />
                <circle cx="88.6667" cy="16.3336" r="1.66667" transform="rotate(-90 88.6667 16.3336)" fill="white" />
                <circle cx="117.667" cy="60.0003" r="1.66667" transform="rotate(-90 117.667 60.0003)" fill="white" />
                <circle cx="117.667" cy="16.3336" r="1.66667" transform="rotate(-90 117.667 16.3336)" fill="white" />
                <circle cx="74.6667" cy="60.0003" r="1.66667" transform="rotate(-90 74.6667 60.0003)" fill="white" />
                <circle cx="74.6667" cy="16.3336" r="1.66667" transform="rotate(-90 74.6667 16.3336)" fill="white" />
                <circle cx="103" cy="60.0003" r="1.66667" transform="rotate(-90 103 60.0003)" fill="white" />
                <circle cx="103" cy="16.3336" r="1.66667" transform="rotate(-90 103 16.3336)" fill="white" />
                <circle cx="132" cy="60.0003" r="1.66667" transform="rotate(-90 132 60.0003)" fill="white" />
                <circle cx="132" cy="16.3336" r="1.66667" transform="rotate(-90 132 16.3336)" fill="white" />
                <circle cx="1.66667" cy="45.3336" r="1.66667" transform="rotate(-90 1.66667 45.3336)" fill="white" />
                <circle cx="1.66667" cy="1.66683" r="1.66667" transform="rotate(-90 1.66667 1.66683)" fill="white" />
                <circle cx="16.3333" cy="45.3336" r="1.66667" transform="rotate(-90 16.3333 45.3336)" fill="white" />
                <circle cx="16.3333" cy="1.66683" r="1.66667" transform="rotate(-90 16.3333 1.66683)" fill="white" />
                <circle cx="31" cy="45.3336" r="1.66667" transform="rotate(-90 31 45.3336)" fill="white" />
                <circle cx="31" cy="1.66683" r="1.66667" transform="rotate(-90 31 1.66683)" fill="white" />
                <circle cx="45.6667" cy="45.3336" r="1.66667" transform="rotate(-90 45.6667 45.3336)" fill="white" />
                <circle cx="45.6667" cy="1.66683" r="1.66667" transform="rotate(-90 45.6667 1.66683)" fill="white" />
                <circle cx="60.3333" cy="45.3338" r="1.66667" transform="rotate(-90 60.3333 45.3338)" fill="white" />
                <circle cx="60.3333" cy="1.66707" r="1.66667" transform="rotate(-90 60.3333 1.66707)" fill="white" />
                <circle cx="88.6667" cy="45.3338" r="1.66667" transform="rotate(-90 88.6667 45.3338)" fill="white" />
                <circle cx="88.6667" cy="1.66707" r="1.66667" transform="rotate(-90 88.6667 1.66707)" fill="white" />
                <circle cx="117.667" cy="45.3338" r="1.66667" transform="rotate(-90 117.667 45.3338)" fill="white" />
                <circle cx="117.667" cy="1.66707" r="1.66667" transform="rotate(-90 117.667 1.66707)" fill="white" />
                <circle cx="74.6667" cy="45.3338" r="1.66667" transform="rotate(-90 74.6667 45.3338)" fill="white" />
                <circle cx="74.6667" cy="1.66707" r="1.66667" transform="rotate(-90 74.6667 1.66707)" fill="white" />
                <circle cx="103" cy="45.3338" r="1.66667" transform="rotate(-90 103 45.3338)" fill="white" />
                <circle cx="103" cy="1.66707" r="1.66667" transform="rotate(-90 103 1.66707)" fill="white" />
                <circle cx="132" cy="45.3338" r="1.66667" transform="rotate(-90 132 45.3338)" fill="white" />
                <circle cx="132" cy="1.66707" r="1.66667" transform="rotate(-90 132 1.66707)" fill="white" />
              </svg>
            </div>
            <div class="absolute -right-6 -top-6 z-[-1]">
              <svg width="134" height="106" viewBox="0 0 134 106" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="1.66667" cy="104" r="1.66667" transform="rotate(-90 1.66667 104)" fill="white" />
                <circle cx="16.3333" cy="104" r="1.66667" transform="rotate(-90 16.3333 104)" fill="white" />
                <circle cx="31" cy="104" r="1.66667" transform="rotate(-90 31 104)" fill="white" />
                <circle cx="45.6667" cy="104" r="1.66667" transform="rotate(-90 45.6667 104)" fill="white" />
                <circle cx="60.3333" cy="104" r="1.66667" transform="rotate(-90 60.3333 104)" fill="white" />
                <circle cx="88.6667" cy="104" r="1.66667" transform="rotate(-90 88.6667 104)" fill="white" />
                <circle cx="117.667" cy="104" r="1.66667" transform="rotate(-90 117.667 104)" fill="white" />
                <circle cx="74.6667" cy="104" r="1.66667" transform="rotate(-90 74.6667 104)" fill="white" />
                <circle cx="103" cy="104" r="1.66667" transform="rotate(-90 103 104)" fill="white" />
                <circle cx="132" cy="104" r="1.66667" transform="rotate(-90 132 104)" fill="white" />
                <circle cx="1.66667" cy="89.3333" r="1.66667" transform="rotate(-90 1.66667 89.3333)" fill="white" />
                <circle cx="16.3333" cy="89.3333" r="1.66667" transform="rotate(-90 16.3333 89.3333)" fill="white" />
                <circle cx="31" cy="89.3333" r="1.66667" transform="rotate(-90 31 89.3333)" fill="white" />
                <circle cx="45.6667" cy="89.3333" r="1.66667" transform="rotate(-90 45.6667 89.3333)" fill="white" />
                <circle cx="60.3333" cy="89.3338" r="1.66667" transform="rotate(-90 60.3333 89.3338)" fill="white" />
                <circle cx="88.6667" cy="89.3338" r="1.66667" transform="rotate(-90 88.6667 89.3338)" fill="white" />
                <circle cx="117.667" cy="89.3338" r="1.66667" transform="rotate(-90 117.667 89.3338)" fill="white" />
                <circle cx="74.6667" cy="89.3338" r="1.66667" transform="rotate(-90 74.6667 89.3338)" fill="white" />
                <circle cx="103" cy="89.3338" r="1.66667" transform="rotate(-90 103 89.3338)" fill="white" />
                <circle cx="132" cy="89.3338" r="1.66667" transform="rotate(-90 132 89.3338)" fill="white" />
                <circle cx="1.66667" cy="74.6673" r="1.66667" transform="rotate(-90 1.66667 74.6673)" fill="white" />
                <circle cx="1.66667" cy="31.0003" r="1.66667" transform="rotate(-90 1.66667 31.0003)" fill="white" />
                <circle cx="16.3333" cy="74.6668" r="1.66667" transform="rotate(-90 16.3333 74.6668)" fill="white" />
                <circle cx="16.3333" cy="31.0003" r="1.66667" transform="rotate(-90 16.3333 31.0003)" fill="white" />
                <circle cx="31" cy="74.6668" r="1.66667" transform="rotate(-90 31 74.6668)" fill="white" />
                <circle cx="31" cy="31.0003" r="1.66667" transform="rotate(-90 31 31.0003)" fill="white" />
                <circle cx="45.6667" cy="74.6668" r="1.66667" transform="rotate(-90 45.6667 74.6668)" fill="white" />
                <circle cx="45.6667" cy="31.0003" r="1.66667" transform="rotate(-90 45.6667 31.0003)" fill="white" />
                <circle cx="60.3333" cy="74.6668" r="1.66667" transform="rotate(-90 60.3333 74.6668)" fill="white" />
                <circle cx="60.3333" cy="31.0001" r="1.66667" transform="rotate(-90 60.3333 31.0001)" fill="white" />
                <circle cx="88.6667" cy="74.6668" r="1.66667" transform="rotate(-90 88.6667 74.6668)" fill="white" />
                <circle cx="88.6667" cy="31.0001" r="1.66667" transform="rotate(-90 88.6667 31.0001)" fill="white" />
                <circle cx="117.667" cy="74.6668" r="1.66667" transform="rotate(-90 117.667 74.6668)" fill="white" />
                <circle cx="117.667" cy="31.0001" r="1.66667" transform="rotate(-90 117.667 31.0001)" fill="white" />
                <circle cx="74.6667" cy="74.6668" r="1.66667" transform="rotate(-90 74.6667 74.6668)" fill="white" />
                <circle cx="74.6667" cy="31.0001" r="1.66667" transform="rotate(-90 74.6667 31.0001)" fill="white" />
                <circle cx="103" cy="74.6668" r="1.66667" transform="rotate(-90 103 74.6668)" fill="white" />
                <circle cx="103" cy="31.0001" r="1.66667" transform="rotate(-90 103 31.0001)" fill="white" />
                <circle cx="132" cy="74.6668" r="1.66667" transform="rotate(-90 132 74.6668)" fill="white" />
                <circle cx="132" cy="31.0001" r="1.66667" transform="rotate(-90 132 31.0001)" fill="white" />
                <circle cx="1.66667" cy="60.0003" r="1.66667" transform="rotate(-90 1.66667 60.0003)" fill="white" />
                <circle cx="1.66667" cy="16.3336" r="1.66667" transform="rotate(-90 1.66667 16.3336)" fill="white" />
                <circle cx="16.3333" cy="60.0003" r="1.66667" transform="rotate(-90 16.3333 60.0003)" fill="white" />
                <circle cx="16.3333" cy="16.3336" r="1.66667" transform="rotate(-90 16.3333 16.3336)" fill="white" />
                <circle cx="31" cy="60.0003" r="1.66667" transform="rotate(-90 31 60.0003)" fill="white" />
                <circle cx="31" cy="16.3336" r="1.66667" transform="rotate(-90 31 16.3336)" fill="white" />
                <circle cx="45.6667" cy="60.0003" r="1.66667" transform="rotate(-90 45.6667 60.0003)" fill="white" />
                <circle cx="45.6667" cy="16.3336" r="1.66667" transform="rotate(-90 45.6667 16.3336)" fill="white" />
                <circle cx="60.3333" cy="60.0003" r="1.66667" transform="rotate(-90 60.3333 60.0003)" fill="white" />
                <circle cx="60.3333" cy="16.3336" r="1.66667" transform="rotate(-90 60.3333 16.3336)" fill="white" />
                <circle cx="88.6667" cy="60.0003" r="1.66667" transform="rotate(-90 88.6667 60.0003)" fill="white" />
                <circle cx="88.6667" cy="16.3336" r="1.66667" transform="rotate(-90 88.6667 16.3336)" fill="white" />
                <circle cx="117.667" cy="60.0003" r="1.66667" transform="rotate(-90 117.667 60.0003)" fill="white" />
                <circle cx="117.667" cy="16.3336" r="1.66667" transform="rotate(-90 117.667 16.3336)" fill="white" />
                <circle cx="74.6667" cy="60.0003" r="1.66667" transform="rotate(-90 74.6667 60.0003)" fill="white" />
                <circle cx="74.6667" cy="16.3336" r="1.66667" transform="rotate(-90 74.6667 16.3336)" fill="white" />
                <circle cx="103" cy="60.0003" r="1.66667" transform="rotate(-90 103 60.0003)" fill="white" />
                <circle cx="103" cy="16.3336" r="1.66667" transform="rotate(-90 103 16.3336)" fill="white" />
                <circle cx="132" cy="60.0003" r="1.66667" transform="rotate(-90 132 60.0003)" fill="white" />
                <circle cx="132" cy="16.3336" r="1.66667" transform="rotate(-90 132 16.3336)" fill="white" />
                <circle cx="1.66667" cy="45.3336" r="1.66667" transform="rotate(-90 1.66667 45.3336)" fill="white" />
                <circle cx="1.66667" cy="1.66683" r="1.66667" transform="rotate(-90 1.66667 1.66683)" fill="white" />
                <circle cx="16.3333" cy="45.3336" r="1.66667" transform="rotate(-90 16.3333 45.3336)" fill="white" />
                <circle cx="16.3333" cy="1.66683" r="1.66667" transform="rotate(-90 16.3333 1.66683)" fill="white" />
                <circle cx="31" cy="45.3336" r="1.66667" transform="rotate(-90 31 45.3336)" fill="white" />
                <circle cx="31" cy="1.66683" r="1.66667" transform="rotate(-90 31 1.66683)" fill="white" />
                <circle cx="45.6667" cy="45.3336" r="1.66667" transform="rotate(-90 45.6667 45.3336)" fill="white" />
                <circle cx="45.6667" cy="1.66683" r="1.66667" transform="rotate(-90 45.6667 1.66683)" fill="white" />
                <circle cx="60.3333" cy="45.3338" r="1.66667" transform="rotate(-90 60.3333 45.3338)" fill="white" />
                <circle cx="60.3333" cy="1.66707" r="1.66667" transform="rotate(-90 60.3333 1.66707)" fill="white" />
                <circle cx="88.6667" cy="45.3338" r="1.66667" transform="rotate(-90 88.6667 45.3338)" fill="white" />
                <circle cx="88.6667" cy="1.66707" r="1.66667" transform="rotate(-90 88.6667 1.66707)" fill="white" />
                <circle cx="117.667" cy="45.3338" r="1.66667" transform="rotate(-90 117.667 45.3338)" fill="white" />
                <circle cx="117.667" cy="1.66707" r="1.66667" transform="rotate(-90 117.667 1.66707)" fill="white" />
                <circle cx="74.6667" cy="45.3338" r="1.66667" transform="rotate(-90 74.6667 45.3338)" fill="white" />
                <circle cx="74.6667" cy="1.66707" r="1.66667" transform="rotate(-90 74.6667 1.66707)" fill="white" />
                <circle cx="103" cy="45.3338" r="1.66667" transform="rotate(-90 103 45.3338)" fill="white" />
                <circle cx="103" cy="1.66707" r="1.66667" transform="rotate(-90 103 1.66707)" fill="white" />
                <circle cx="132" cy="45.3338" r="1.66667" transform="rotate(-90 132 45.3338)" fill="white" />
                <circle cx="132" cy="1.66707" r="1.66667" transform="rotate(-90 132 1.66707)" fill="white" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  insertTemplate(selector, html);
}

export function addNav(selector = 'nav', menuItemCssClass, themeSwitcherCssClass, textDarkCssClass, logoCssClass, darkLogoCssClass, focusButtonColor) {
  let html = `
  <div class="container">
      <div class="relative -mx-4 flex items-center justify-between">
        <div class="w-60 max-w-full px-4">
          <a href="index.html" class="block w-full py-5 navbar-logo">
            <img src="assets/images/logo/logo.svg" alt="logo" style="height: 50px;" class="w-full ${logoCssClass}">
            <img src="assets/images/logo/logo-white.svg" alt="logo" style="height: 50px;" class="w-full ${darkLogoCssClass}">
          </a>
        </div>
        <div class="flex w-full items-center justify-between px-4">
          <div>
            <button id="navbarToggler"
              class="absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden">
              <span class="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
              <span class="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
              <span class="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
            </button>
            <nav id="navbarCollapse"
              class="absolute right-4 top-full hidden w-full max-w-[250px] rounded-lg bg-white py-5 shadow-lg dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:px-4 lg:py-0 lg:shadow-none dark:lg:bg-transparent xl:px-6">
              <ul class="blcok lg:flex 2xl:ml-20">
                <li class="submenu-item group relative">
                  <a href="#testing"
                    class="flex mx-8 py-2 text-base font-medium text-dark dark:text-white group-hover:text-primary lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 xl:ml-10 ${menuItemCssClass}">
                    Testing

                    <svg class="ml-2 fill-current" width="16" height="20" viewBox="0 0 16 20" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7.99999 14.9C7.84999 14.9 7.72499 14.85 7.59999 14.75L1.84999 9.10005C1.62499 8.87505 1.62499 8.52505 1.84999 8.30005C2.07499 8.07505 2.42499 8.07505 2.64999 8.30005L7.99999 13.525L13.35 8.25005C13.575 8.02505 13.925 8.02505 14.15 8.25005C14.375 8.47505 14.375 8.82505 14.15 9.05005L8.39999 14.7C8.27499 14.825 8.14999 14.9 7.99999 14.9Z" />
                    </svg>
                  </a>
                  <div
                    class="submenu relative left-0 top-full hidden w-[250px] rounded-sm bg-white p-4 transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark-2 lg:invisible lg:absolute lg:top-[110%] lg:block lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full">
                    <a href="ai-powered-testing.html"
                      class="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary">
                      AI-powered testing
                    </a>
                    <a href="test-automation.html"
                      class="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary">
                      Tests automation
                    </a>
                    <a href="api-testing.html"
                      class="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary">
                      API testing
                    </a>
                    <a href="domain-monitoring.html"
                      class="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary">
                      Domain testing
                    </a>
                    <a href="dmarc-monitoring.html"
                      class="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary">
                      DMARC testing
                    </a>
                  </div>
                </li>
                <li class="submenu-item group relative">
                  <a href="#monitoring"
                    class="flex mx-8 py-2 text-base font-medium text-dark dark:text-white group-hover:text-primary lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 xl:ml-10 ${menuItemCssClass}">
                    Monitoring

                    <svg class="ml-2 fill-current" width="16" height="20" viewBox="0 0 16 20" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7.99999 14.9C7.84999 14.9 7.72499 14.85 7.59999 14.75L1.84999 9.10005C1.62499 8.87505 1.62499 8.52505 1.84999 8.30005C2.07499 8.07505 2.42499 8.07505 2.64999 8.30005L7.99999 13.525L13.35 8.25005C13.575 8.02505 13.925 8.02505 14.15 8.25005C14.375 8.47505 14.375 8.82505 14.15 9.05005L8.39999 14.7C8.27499 14.825 8.14999 14.9 7.99999 14.9Z" />
                    </svg>
                  </a>
                  <div
                    class="submenu relative left-0 top-full hidden w-[250px] rounded-sm bg-white p-4 transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark-2 lg:invisible lg:absolute lg:top-[110%] lg:block lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full">
                    <a href="uptime-monitoring.html"
                      class="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary">
                      Uptime monitoring
                    </a>
                    <a href="website-monitoring.html"
                      class="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary">
                      Website monitoring
                    </a>
                    <a href="keyword-monitoring.html"
                      class="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary">
                      Keyword monitoring
                    </a>
                    <a href="ssl-monitoring.html"
                      class="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary">
                      SSL monitoring
                    </a>
                    <a href="tls-monitoring.html"
                      class="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary">
                      TLS monitoring
                    </a>
                    <a href="dns-monitoring.html"
                      class="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary">
                      DNS monitoring
                    </a>
                    <a href="domain-monitoring.html"
                      class="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary">
                      Domain monitoring
                    </a>
                    <a href="dmarc-monitoring.html"
                      class="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary">
                      DMARC monitoring
                    </a>
                  </div>
                </li>
                <li class="group relative">
                  <a href="index.html#pricing"
                    scrollTo="#pricing"
                    class="flex ud-menu-scroll mx-8 py-2 text-base font-medium text-dark dark:text-white group-hover:text-primary lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 xl:ml-10 ${menuItemCssClass}">
                    Pricing
                  </a>
                </li>
                <li class="submenu-item group relative">
                  <a href="#monitoring" class="flex mx-8 py-2 text-base font-medium text-dark dark:text-white group-hover:text-primary lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 xl:ml-10 ${menuItemCssClass}">
                    Integrations

                    <svg class="ml-2 fill-current" width="16" height="20" viewBox="0 0 16 20" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7.99999 14.9C7.84999 14.9 7.72499 14.85 7.59999 14.75L1.84999 9.10005C1.62499 8.87505 1.62499 8.52505 1.84999 8.30005C2.07499 8.07505 2.42499 8.07505 2.64999 8.30005L7.99999 13.525L13.35 8.25005C13.575 8.02505 13.925 8.02505 14.15 8.25005C14.375 8.47505 14.375 8.82505 14.15 9.05005L8.39999 14.7C8.27499 14.825 8.14999 14.9 7.99999 14.9Z" />
                    </svg>
                  </a>
                  <div
                    class="submenu relative left-0 top-full hidden w-[250px] rounded-sm bg-white p-4 transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark-2 lg:invisible lg:absolute lg:top-[110%] lg:block lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full">
                    <a href="jira-xray-integration.html"
                      target="_blank"
                      class="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary">
                      Jira Xray integration
                    </a>
                    <a href="https://docs.testlemon.com/pages/platform/integrations/github-integration/"
                      target="_blank"
                      class="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary">
                      GitHub integration
                    </a>
                    <a href="https://docs.testlemon.com/pages/platform/integrations/openai-integration/"
                      target="_blank"
                      class="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary">
                      OpenAI integration
                    </a>
                    <a href="https://docs.testlemon.com/pages/platform/integrations/slack-integration/"
                      target="_blank"
                      class="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary">
                      Slack integration
                    </a>
                    <a href="https://docs.testlemon.com/pages/platform/integrations/webhook-integration/"
                      target="_blank"
                      class="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary">
                      Webhook integration
                    </a>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
          <div class="flex items-center justify-end pr-16 lg:pr-0">
            <label for="themeSwitcher" class="inline-flex cursor-pointer items-center" aria-label="themeSwitcher"
              name="themeSwitcher">
              <input type="checkbox" name="themeSwitcher" id="themeSwitcher" class="sr-only" />
              <span class="block ${themeSwitcherCssClass}">
                <svg class="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.3125 1.50001C12.675 1.31251 12.0375 1.16251 11.3625 1.05001C10.875 0.975006 10.35 1.23751 10.1625 1.68751C9.93751 2.13751 10.05 2.70001 10.425 3.00001C13.0875 5.47501 14.0625 9.11251 12.975 12.525C11.775 16.3125 8.25001 18.975 4.16251 19.0875C3.63751 19.0875 3.22501 19.425 3.07501 19.9125C2.92501 20.4 3.15001 20.925 3.56251 21.1875C4.50001 21.75 5.43751 22.2 6.37501 22.5C7.46251 22.8375 8.58751 22.9875 9.71251 22.9875C11.625 22.9875 13.5 22.5 15.1875 21.5625C17.85 20.1 19.725 17.7375 20.55 14.8875C22.1625 9.26251 18.975 3.37501 13.3125 1.50001ZM18.9375 14.4C18.2625 16.8375 16.6125 18.825 14.4 20.0625C12.075 21.3375 9.41251 21.6 6.90001 20.85C6.63751 20.775 6.33751 20.6625 6.07501 20.55C10.05 19.7625 13.35 16.9125 14.5875 13.0125C15.675 9.56251 15 5.92501 12.7875 3.07501C17.5875 4.68751 20.2875 9.67501 18.9375 14.4Z" />
                </svg>
              </span>
              <span class="hidden dark:block ${textDarkCssClass}">
                <svg class="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_2172_3070)">
                    <path
                      d="M12 6.89999C9.18752 6.89999 6.90002 9.18749 6.90002 12C6.90002 14.8125 9.18752 17.1 12 17.1C14.8125 17.1 17.1 14.8125 17.1 12C17.1 9.18749 14.8125 6.89999 12 6.89999ZM12 15.4125C10.125 15.4125 8.58752 13.875 8.58752 12C8.58752 10.125 10.125 8.58749 12 8.58749C13.875 8.58749 15.4125 10.125 15.4125 12C15.4125 13.875 13.875 15.4125 12 15.4125Z" />
                    <path
                      d="M12 4.2375C12.45 4.2375 12.8625 3.8625 12.8625 3.375V1.5C12.8625 1.05 12.4875 0.637497 12 0.637497C11.55 0.637497 11.1375 1.0125 11.1375 1.5V3.4125C11.175 3.8625 11.55 4.2375 12 4.2375Z" />
                    <path
                      d="M12 19.7625C11.55 19.7625 11.1375 20.1375 11.1375 20.625V22.5C11.1375 22.95 11.5125 23.3625 12 23.3625C12.45 23.3625 12.8625 22.9875 12.8625 22.5V20.5875C12.8625 20.1375 12.45 19.7625 12 19.7625Z" />
                    <path
                      d="M18.1125 6.74999C18.3375 6.74999 18.5625 6.67499 18.7125 6.48749L19.9125 5.28749C20.25 4.94999 20.25 4.42499 19.9125 4.08749C19.575 3.74999 19.05 3.74999 18.7125 4.08749L17.5125 5.28749C17.175 5.62499 17.175 6.14999 17.5125 6.48749C17.6625 6.67499 17.8875 6.74999 18.1125 6.74999Z" />
                    <path
                      d="M5.32501 17.5125L4.12501 18.675C3.78751 19.0125 3.78751 19.5375 4.12501 19.875C4.27501 20.025 4.50001 20.1375 4.72501 20.1375C4.95001 20.1375 5.17501 20.0625 5.32501 19.875L6.52501 18.675C6.86251 18.3375 6.86251 17.8125 6.52501 17.475C6.18751 17.175 5.62501 17.175 5.32501 17.5125Z" />
                    <path
                      d="M22.5 11.175H20.5875C20.1375 11.175 19.725 11.55 19.725 12.0375C19.725 12.4875 20.1 12.9 20.5875 12.9H22.5C22.95 12.9 23.3625 12.525 23.3625 12.0375C23.3625 11.55 22.95 11.175 22.5 11.175Z" />
                    <path
                      d="M4.23751 12C4.23751 11.55 3.86251 11.1375 3.37501 11.1375H1.50001C1.05001 11.1375 0.637512 11.5125 0.637512 12C0.637512 12.45 1.01251 12.8625 1.50001 12.8625H3.41251C3.86251 12.8625 4.23751 12.45 4.23751 12Z" />
                    <path
                      d="M18.675 17.5125C18.3375 17.175 17.8125 17.175 17.475 17.5125C17.1375 17.85 17.1375 18.375 17.475 18.7125L18.675 19.9125C18.825 20.0625 19.05 20.175 19.275 20.175C19.5 20.175 19.725 20.1 19.875 19.9125C20.2125 19.575 20.2125 19.05 19.875 18.7125L18.675 17.5125Z" />
                    <path
                      d="M5.32501 4.125C4.98751 3.7875 4.46251 3.7875 4.12501 4.125C3.78751 4.4625 3.78751 4.9875 4.12501 5.325L5.32501 6.525C5.47501 6.675 5.70001 6.7875 5.92501 6.7875C6.15001 6.7875 6.37501 6.7125 6.52501 6.525C6.86251 6.1875 6.86251 5.6625 6.52501 5.325L5.32501 4.125Z" />
                  </g>
                  <defs>
                    <clipPath id="clip0_2172_3070">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </label>
            <div class="hidden sm:flex">
              <a href="${vars.signInUrl}" class="loginBtn px-[22px] py-2 text-base font-medium hover:opacity-70 ${textDarkCssClass}">
                Sign In
              </a>
              <a href="${vars.signUpUrl}" class="signUpBtn rounded-md px-6 py-2 text-base font-medium text-white duration-300 ease-in-out ${focusButtonColor}">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  insertTemplate(selector, html);

  // ======= Sticky
  window.onscroll = function () {
    const ud_header = document.querySelector(".ud-header");
    const sticky = ud_header.offsetTop;
    const logo = document.querySelectorAll(".header-logo");

    if (window.pageYOffset > sticky) {
      ud_header.classList.add("sticky");
    } else {
      ud_header.classList.remove("sticky");
    }

    if (logo.length) {
      // === logo change
      if (ud_header.classList.contains("sticky")) {
        document.querySelector(".header-logo").src =
          "assets/images/logo/logo.svg"
      } else {
        document.querySelector(".header-logo").src =
          "assets/images/logo/logo-white.svg"
      }
    }

    if (document.documentElement.classList.contains("dark")) {
      if (logo.length) {
        // === logo change
        if (ud_header.classList.contains("sticky")) {
          document.querySelector(".header-logo").src =
            "assets/images/logo/logo-white.svg"
        }
      }
    }

    // show or hide the back-top-top button
    const backToTop = document.querySelector(".back-to-top");
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  };

  // ===== responsive navbar
  let navbarToggler = document.querySelector("#navbarToggler");
  const navbarCollapse = document.querySelector("#navbarCollapse");

  navbarToggler.addEventListener("click", () => {
    navbarToggler.classList.toggle("navbarTogglerActive");
    navbarCollapse.classList.toggle("hidden");
  });

  //===== close navbar-collapse when a  clicked
  document
    .querySelectorAll("#navbarCollapse ul li:not(.submenu-item) a")
    .forEach((e) =>
      e.addEventListener("click", () => {
        navbarToggler.classList.remove("navbarTogglerActive");
        navbarCollapse.classList.add("hidden");
      })
    );

  // ===== Sub-menu
  const submenuItems = document.querySelectorAll(".submenu-item");
  submenuItems.forEach((el) => {
    el.querySelector("a").addEventListener("click", () => {
      el.querySelector(".submenu").classList.toggle("hidden");
    });
  });

  /* ========  themeSwitcher start ========= */

  // themeSwitcher
  const themeSwitcher = document.getElementById('themeSwitcher');

  // Theme Vars
  const userTheme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color0scheme: dark)').matches;

  // Initial Theme Check
  const themeCheck = () => {
    if (userTheme === 'dark' || (!userTheme && systemTheme)) {
      document.documentElement.classList.add('dark');
      return;
    }
  };

  // Manual Theme Switch
  const themeSwitch = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      return;
    }

    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  };

  // call theme switch on clicking buttons
  themeSwitcher.addEventListener('click', () => {
    themeSwitch();
  });

  // invoke theme check on initial load
  themeCheck();
  /* ========  themeSwitcher End ========= */

  // Highlight menu item on scroll
  // ==== for menu scroll
  const pageLink = document.querySelectorAll(".ud-menu-scroll");

  pageLink.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      // e.preventDefault();
      let element = document.querySelector(elem.getAttribute("scrollTo"));
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          offsetTop: 1 - 60,
        });
      }
    });
  });

  // section menu active
  function onScroll(event) {
    const sections = document.querySelectorAll(".ud-menu-scroll");
    const scrollPos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    for (let i = 0; i < sections.length; i++) {
      const currLink = sections[i];
      const val = currLink.getAttribute("scrollTo");
      const refElement = document.querySelector(val);

      // continue if element does not exist in this page
      if (!refElement)
        continue;

      const scrollTopMinus = scrollPos + 73;
      if (
        refElement.offsetTop <= scrollTopMinus &&
        refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
      ) {
        document
          .querySelector(".ud-menu-scroll")
          .classList.remove("active");
        currLink.classList.add("active");
      } else {
        currLink.classList.remove("active");
      }
    }
  }

  window.document.addEventListener("scroll", onScroll);
}

export function addBanner(selector = 'banner', headline = "Headline", message = "message", buttonText = "Start for FREE", bannerLink = vars.signInUrl) {
  let html = `
  <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-stroke/0 via-stroke to-stroke/0 dark:via-dark-3"></div>
      <div class="container">
        <div class="flex flex-wrap items-center -mx-4">
          <div class="w-full px-4">
            <div class="text-center">
              <h1 class="mb-4 text-3xl font-bold leading-snug text-white sm:text-4xl">
                ${headline}
              </h1>
              <p class="mb-5 text-base font-medium text-white sm:text-lg">
                ${message}
              </p>
              <ul class="mb-10 flex flex-wrap items-center justify-center gap-5">
              <li>
                <a href="${bannerLink}" target="_blank" class="inline-flex items-center justify-center rounded-md bg-white px-7 py-[14px] text-center text-base font-medium text-dark shadow-1 transition duration-300 ease-in-out hover:bg-gray-2 hover:text-body-color">
                  ${buttonText}
                </a>
              </li>
            </ul>
            </div>
          </div>
        </div>
      </div>
  `;

  insertTemplate(selector, html);
}