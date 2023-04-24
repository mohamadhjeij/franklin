/* eslint-disable no-unused-expressions */
/* global describe before it */

import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { splitChildDiv } from '../../scripts/scripts.js';

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
    let removedChild;
    parentEnclosingDiv.removeChild = (c) => {
      removedChild = c;
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
    enclosingDiv.children = [parentP, captionP];

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

    expect(insertedElement.lastChild.localName).to
      .equal('myblock', 'Should have appended the block to the section');

    expect(removedChild).to.equal(enclosingDiv);
  });

  it('No Text-Media autoblock when no <em>', async () => {
    let insertedElement;
    const parentEnclosingDiv = {};
    parentEnclosingDiv.insertBefore = (s) => {
      insertedElement = s;
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
    enclosingDiv.children = [parentP, captionP];

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

  it('Test splitChildDiv with only picture and caption', async () => {
    const pdiv = document.createElement('div');
    const div = document.createElement('div');
    const ppict = document.createElement('p');
    const picture = document.createElement('picture');
    const pcapt = document.createElement('p');
    const em = document.createElement('em');

    ppict.append(picture);
    pcapt.append(em);
    div.append(ppict, pcapt);
    pdiv.append(div);

    const res = splitChildDiv(div, 0, 2);
    expect(pdiv.children.length).to.be.equal(1);
    expect(pdiv.children[0]).to.be.equal(res);
    expect(res.children.length).to.be.equal(2);
    expect(res.children[0]).to.be.equal(ppict);
    expect(res.children[1]).to.be.equal(pcapt);
  });

  it('Test splitChildDiv other and picture', async () => {
    const pdiv = document.createElement('div');
    const div = document.createElement('div');
    const pother = document.createElement('p');
    const ppict = document.createElement('p');
    const picture = document.createElement('picture');
    const pcapt = document.createElement('p');
    const em = document.createElement('em');

    ppict.append(picture);
    pcapt.append(em);
    div.append(pother, ppict, pcapt);
    pdiv.append(div);

    const res = splitChildDiv(div, 1, 3);
    expect(pdiv.children.length).to.be.equal(2);
    const preDiv = pdiv.children[0];
    expect(preDiv.children.length).to.be.equal(1);
    expect(preDiv.children[0]).to.be.equal(pother);
    expect(pdiv.children[1]).to.be.equal(res);
  });

  it('Test splitChildDiv picture and other', async () => {
    const pdiv = document.createElement('div');
    const div = document.createElement('div');
    const ppict = document.createElement('p');
    const picture = document.createElement('picture');
    const pcapt = document.createElement('p');
    const em = document.createElement('em');
    const pother1 = document.createElement('p');
    const pother2 = document.createElement('p');

    ppict.append(picture);
    pcapt.append(em);
    div.append(ppict, pcapt, pother1, pother2);
    pdiv.append(div);

    const res = splitChildDiv(div, 0, 2);
    expect(pdiv.children.length).to.be.equal(2);
    expect(pdiv.children[0]).to.be.equal(res);
    const postDiv = pdiv.children[1];
    expect(postDiv.children.length).to.be.equal(2);
    expect(postDiv.children[0]).to.be.equal(pother1);
    expect(postDiv.children[1]).to.be.equal(pother2);
  });

  it('Test splidChildDiv other-picture-other', async () => {
    const pdiv = document.createElement('div');
    const div = document.createElement('div');
    const pother = document.createElement('p');
    const ppict = document.createElement('p');
    const picture = document.createElement('picture');
    const pcapt = document.createElement('p');
    const em = document.createElement('em');
    const pother1 = document.createElement('p');
    const pother2 = document.createElement('p');

    ppict.append(picture);
    pcapt.append(em);
    div.append(pother, ppict, pcapt, pother1, pother2);
    pdiv.append(div);

    const res = splitChildDiv(div, 1, 3);
    expect(pdiv.children.length).to.be.equal(3);
    const preDiv = pdiv.children[0];
    expect(preDiv.children.length).to.be.equal(1);
    expect(preDiv.children[0]).to.be.equal(pother);
    expect(pdiv.children[1]).to.be.equal(res);
    const postDiv = pdiv.children[2];
    expect(postDiv.children.length).to.be.equal(2);
    expect(postDiv.children[0]).to.be.equal(pother1);
    expect(postDiv.children[1]).to.be.equal(pother2);
  });
});
