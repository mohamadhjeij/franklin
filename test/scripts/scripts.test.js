/* eslint-disable no-unused-expressions */
/* global describe before it */

import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';

let scripts;

document.body.innerHTML = await readFile({ path: './dummy.html' });
document.head.innerHTML = await readFile({ path: './head.html' });

describe('Core Helix features', () => {
  before(async () => {
    scripts = await import('../../scripts/scripts.js');
    document.body.innerHTML = await readFile({ path: './body.html' });
  });

  it('Initializes window.hlx', async () => {
    // simulate code base path and turn on lighthouse
    /* needs fixing
    document.head.appendChild(document.createElement('script')).src = '/foo/scripts/scripts.js';
    window.history.pushState({}, '', `${window.location.href}&lighthouse=on`);

    expect(window.hlx.codeBasePath).to.equal('/foo');
    expect(window.hlx.lighthouse).to.equal(true);

    // test error handling
    const url = sinon.stub(window, 'URL');

    // cleanup
    url.restore();
    window.hlx.codeBasePath = '';
    window.hlx.lighthouse = false;
    Array.from(document.querySelectorAll('script')).pop().remove();
    */
  });

  it('Adds favicon', async () => {
    scripts.addFavIcon('/foo.svg');
    const $favIcon = document.querySelector('link[rel="icon"]');
    expect($favIcon.getAttribute('href')).to.equal('/foo.svg');
  });

  it('Handles Text-Media autoblocks', async () => {
    let insertedElement;
    let beforeElement;
    const parentEnclosingDiv = {};
    parentEnclosingDiv.insertBefore = (s, e) => {
      insertedElement = s;
      beforeElement = e;
    };

    const enclosingDiv = {};
    enclosingDiv.parentElement = parentEnclosingDiv;

    const parentP = {};

    const picture = {};
    const captionP = {};
    picture.parentElement = parentP;

    parentP.parentElement = enclosingDiv;
    parentP.nextElementSibling = captionP;

    const emChild = {};
    emChild.localName = 'em';
    captionP.children = [{}, emChild];
    captionP.parentElement = parentP;

    const mockMain = {};
    mockMain.querySelectorAll = () => [picture];

    let blockName;
    let blockObj;
    const mockBBFunction = (n, e) => {
      blockName = n;
      blockObj = e;

      return document.createElement('myblock');
    };

    scripts.buildTextMediaBlock(mockMain, mockBBFunction);

    expect(insertedElement).to.not.be.undefined;
    expect(beforeElement).to.equal(enclosingDiv);

    expect(blockName).to.equal('text-media');
    expect(blockObj.elems).to.eql([parentP, captionP]);

    expect(insertedElement.lastChild.localName).to.equal('myblock',
      'Should have appended the block to the section');
  });

  it('No Text-Media autoblock when no <em>', async () => {
    let insertedElement;
    let beforeElement;
    const parentEnclosingDiv = {};
    parentEnclosingDiv.insertBefore = (s, e) => {
      insertedElement = s;
      beforeElement = e;
    };

    const enclosingDiv = {};
    enclosingDiv.parentElement = parentEnclosingDiv;

    const parentP = {};

    const picture = {};
    const captionP = {};
    picture.parentElement = parentP;

    parentP.parentElement = enclosingDiv;
    parentP.nextElementSibling = captionP;

    const emChild = {};
    emChild.localName = 'strong';
    captionP.children = [{}, emChild];
    captionP.parentElement = parentP;

    const mockMain = {};
    mockMain.querySelectorAll = () => [picture];

    let blockName;
    let blockObj;
    const mockBBFunction = (n, e) => {
      blockName = n;
      blockObj = e;

      return document.createElement('myblock');
    };

    scripts.buildTextMediaBlock(mockMain, mockBBFunction);

    expect(insertedElement).to.be.undefined;
    expect(blockName).to.be.undefined;
    expect(blockObj).to.undefined;
  });
});
