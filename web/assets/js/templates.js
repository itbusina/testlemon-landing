export function cookieConsentTemplate(privacyUrl) {
    return `
        <div id="gdpr-banner" class="text-xs fixed bottom-8 left-4 z-[999] inline-flex items-center gap-[10px] rounded-lg bg-white px-[14px] py-2 shadow-2 dark:bg-dark-2 sm:left-9">
            <span class="font-medium text-dark-3 dark:text-dark-6">This website uses cookies.<br /><a href="${privacyUrl}"
                style="text-decoration: underline;">Learn more</a>
            </span>
            <span class="block h-4 w-px bg-stroke dark:bg-dark-3"></span>
            <button class="font-medium text-primary dark:text-white" onclick="handleGDPRConsent(true)">Accept</button>
            <span class="block h-4 w-px bg-stroke dark:bg-dark-3"></span>
            <button class="font-medium text-dark-3 dark:text-dark-6" onclick="handleGDPRConsent(false)">Reject</button>
        </div>
    `;
}