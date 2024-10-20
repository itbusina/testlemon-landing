const trackingID = 'G-XXXXXXX'; // TODO: set Google Analytics Tag here

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
function handleGDPRConsent(consentGiven) {
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