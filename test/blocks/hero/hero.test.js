/* eslint-disable no-unused-expressions */
/* global describe it */

import { expect, assert } from '@esm-bundle/chai';
import decorate, { addBackLink } from '../../../blocks/hero/hero.js';

describe('Hero block', () => {
  it('Decorates block', async () => {
    try {
      const block = document.createElement('div');
      await decorate(block);
    } catch (e) {
      assert.fail(e);
    }
  });

  it('Adds backlink, ruler and eyebrow', () => {
    const block = document.createElement('div');
    const ph = {
      pressrelease: 'PressRel',
      newseventsbase: 'news/events',
      backtonewsevents: 'back to overview',
    };
    addBackLink(block, 'de', ph, 'news/events/someevent');

    const createdP = block.querySelector('.headline-brow');
    expect(createdP.innerHTML).to.equal('PressRel');

    const createdHR = block.querySelector('.back-link-line');
    expect(createdHR.localName).to.equal('hr');

    const createdLink = block.querySelector('.back-link');
    expect(createdLink.getAttribute('href')).to.equal('/de/news/events/');
    expect(createdLink.innerHTML).to.equal('back to overview');

    const createdLinkArrow = block.querySelector('.back-link-icon');
    expect(createdLinkArrow.getAttribute('href')).to.equal('/de/news/events/');
    expect(createdLinkArrow.children[0].localName).to
      .equal('svg', 'Link should contain an icon');
  });

  it('Backlink only on subpages', () => {
    const block = document.createElement('div');
    const ph = { newseventsbase: 'n/e/b' };

    expect(block.childElementCount).to.equal(0, 'Precondition');
    addBackLink(block, 'de', ph, '/foo/n/e/b');
    expect(block.childElementCount).to
      .equal(0, 'Should not add backlink on overview page');
  });
});
