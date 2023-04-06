/* eslint-disable no-unused-expressions */
/* global describe before it */

import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';

let scripts;

document.body.innerHTML = await readFile({ path: './dummy.html' });
document.head.innerHTML = await readFile({ path: './head.html' });

describe('Delayed functionality', () => {
  before(async () => {
    scripts = await import('../../scripts/delayed.js');
    document.body.innerHTML = await readFile({ path: './body.html' });
  });

  it('Checks the Cookie Consent ID', async () => {
    expect(scripts.getCookieConsentID('www.zeiss.com'))
      .to.equal('8993cba0-8683-43f1-9904-d63a3e023a9c');
    expect(scripts.getCookieConsentID('www.zeiss.de'))
      .to.equal('11dcda2f-5845-4860-b4c1-a3e63d9f163f');
    expect(scripts.getCookieConsentID('localhost'))
      .to.equal('8993cba0-8683-43f1-9904-d63a3e023a9c-test');
  });

  it('Checks that the Cookie Consent script is added', async () => {
    // Set up of 'mocks'
    const mylinkattrs = {};
    const myalink = {};
    myalink.setAttribute = (k, v) => { mylinkattrs[k] = v; };

    const createdAttributes = {};
    const created = {};
    created.setAttribute = (k, v) => { createdAttributes[k] = v; };
    const appendedChildren = [];
    const doc = {};
    doc.head = {};
    doc.head.appendChild = (c) => appendedChildren.push(c);
    doc.createElement = (name) => (name === 'script' ? created : undefined);
    doc.querySelector = (q) => (q === "a[aria-label='Trackingeinstellungen'], a[aria-label='Tracking Preferences']" ?
      myalink : undefined);

    // Preconditions
    expect(appendedChildren.length).to.equal(0, 'Precondition');

    // The invocation being tested
    scripts.loadCookieConsent(doc, 'www.zeiss.com');

    // Assertions about the behaviour
    expect(appendedChildren.length).to.equal(1);
    expect(appendedChildren[0]).to.equal(created);

    expect(createdAttributes.src).to.equal('https://cdn.cookielaw.org/scripttemplates/otSDKStub.js');
    expect(createdAttributes.type).to.equal('text/javascript');
    expect(createdAttributes.charset).to.equal('UTF-8');
    expect(createdAttributes['data-document-language']).to.equal('true');
    expect(createdAttributes['data-domain-script']).to.equal('8993cba0-8683-43f1-9904-d63a3e023a9c');

    expect(mylinkattrs.href).to.equal('#');
    expect(mylinkattrs.onclick).to.equal('OneTrust.ToggleInfoDisplay();');
  });
});
