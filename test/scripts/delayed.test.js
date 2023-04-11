/* eslint-disable no-unused-expressions */
/* global describe before it */

import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';

const PATH = '/de/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/zeiss-trumpf-und-fraunhofer-mit-deutschem-zukunftspreis-ausgezeichnet';

let delayed;

document.body.innerHTML = await readFile({ path: './dummy.html' });
document.head.innerHTML = await readFile({ path: './head.html' });

describe('Delayed customer features', () => {
  before(async () => {
    delayed = await import('../../scripts/delayed.js');
    document.body.innerHTML = await readFile({ path: './body.html' });
  });

  it('Define Page Environment', async () => {
    expect(delayed.pageEnvironment('unknown')).to.equal('publish');
    expect(delayed.pageEnvironment('www.zeiss.de')).to.equal('prod_publish');
    expect(delayed.pageEnvironment('localhost')).to.equal('local_publish');
  });

  it('Undefined Path Item', async () => {
    expect(delayed.pathItem(PATH, 100)).to.equal('');
  });

  it('Define Content Hierarchy', async () => {
    expect(delayed.pathItem(PATH, 3)).to.equal('news-und-events');
  });

  it('Define Page Pool', async () => {
    expect(delayed.pathItem(PATH, 4)).to.equal('smt-pressemeldung');
  });

  it('Checks the Cookie Consent ID', async () => {
    expect(delayed.getCookieConsentID('www.zeiss.com'))
      .to.equal('8993cba0-8683-43f1-9904-d63a3e023a9c');
    expect(delayed.getCookieConsentID('www.zeiss.de'))
      .to.equal('11dcda2f-5845-4860-b4c1-a3e63d9f163f');
    expect(delayed.getCookieConsentID('localhost'))
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
    doc.querySelector = (q) => (q === "a[aria-label='Trackingeinstellungen'], a[aria-label='Tracking Preferences']"
      ? myalink : undefined);

    // Preconditions
    expect(appendedChildren.length).to.equal(0, 'Precondition');

    // The invocation being tested
    delayed.loadCookieConsent(doc, 'www.zeiss.com');

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
