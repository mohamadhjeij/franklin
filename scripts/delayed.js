// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

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

// The OneTrust website says to define this function like this.
// eslint-disable-next-line no-unused-vars
function OptanonWrapper() { }

export function loadCookieConsent(doc, hostname) {
  const csID = getCookieConsentID(hostname);

  const cookieScript = doc.createElement('script');
  cookieScript.setAttribute('src', 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js');
  cookieScript.setAttribute('data-document-language', 'true');
  cookieScript.setAttribute('type', 'text/javascript');
  cookieScript.setAttribute('charset', 'UTF-8');
  cookieScript.setAttribute('data-domain-script', csID);
  doc.head.appendChild(cookieScript);

  const alink = doc.querySelector("a[aria-label='Trackingeinstellungen']");
  if (alink) {
    alink.setAttribute('href', '#');
    alink.setAttribute('onclick', 'OneTrust.ToggleInfoDisplay();');
  }
}

loadCookieConsent(document, window.location.hostname);
