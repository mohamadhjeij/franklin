// eslint-disable-next-line import/no-cycle
import { sampleRUM, getMetadata } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

/**
 * Define the environment based on the hostname
 * @param {*} hostname
 * @returns
 */
export function pageEnvironment(hostname) {
  switch (hostname) {
    case 'www.zeiss.de':
    case 'www.zeiss.com':
      return 'prod_publish';
    case 'localhost':
      return 'local_publish';
    default:
      return 'publish';
  }
}

export function pathItem(pathname, index) {
  // Capture the path item at the given index
  return pathname.split('/')[index] || '';
}

// eslint-disable-next-line import/prefer-default-export
export function getCookieConsentID(hostname) {
  if (hostname === undefined) {
    return undefined;
  }

  // The zeiss.com cookie ID
  let csID = '8993cba0-8683-43f1-9904-d63a3e023a9c';
  if (hostname.endsWith('.zeiss.de')) {
    // zeiss.de has a different cookie ID
    csID = '11dcda2f-5845-4860-b4c1-a3e63d9f163f';
  } else if (!hostname.endsWith('.zeiss.com')) {
    // The OneTrust documentation specifies to suffix the ID with -test when running in
    // a dev or stage testing domain
    // https://about.gitlab.com/handbook/marketing/digital-experience/onetrust-cookie-consent/
    csID += '-test';
  }
  return csID;
}

export function loadCookieConsent(doc, hostname) {
  const csID = getCookieConsentID(hostname);

  const cookieScript = doc.createElement('script');
  cookieScript.setAttribute('src', 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js');
  cookieScript.setAttribute('data-document-language', 'true');
  cookieScript.setAttribute('type', 'text/javascript');
  cookieScript.setAttribute('charset', 'UTF-8');
  cookieScript.setAttribute('data-domain-script', csID);
  doc.head.appendChild(cookieScript);

  const alink = doc.querySelector("a[aria-label='Trackingeinstellungen'], a[aria-label='Tracking Preferences']");
  if (alink) {
    alink.setAttribute('href', '#');
    alink.setAttribute('onclick', 'OneTrust.ToggleInfoDisplay();');
  }
}

function loadGoogleTagManager(href) {
  // Initialize the data layer
  /* eslint no-undef: "error" */
  const url = new URL(href);
  const locale = getMetadata('locale');
  const pageCountry = {
    en: 'INT',
    de: 'DE',
  };
  const conf = {
    pageArea: 'web',
    pageCountry: pageCountry[locale],
    pageEnvironment: pageEnvironment(url.hostname),
    pageIdentifier: 'main',
    pageLanguage: locale,
    pageLocation: 'ALL_General-Article_002',
    pageName: url.pathname,
    pagePool: pathItem(url.pathname, 4),
    pageTags: '',
    contentHierarchy1: pathItem(url.pathname, 3),
    productName: '',
  };
  window.dataLayer = [conf];

  // Include the manager
  // eslint-disable-next-line
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WWQQS7V');
}

// The OneTrust website says to define this function like this.
// eslint-disable-next-line no-unused-vars
function OptanonWrapper() { }

loadCookieConsent(document, window.location.hostname);
loadGoogleTagManager(window.location.href);
