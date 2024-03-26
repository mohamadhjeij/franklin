/* eslint-disable no-unused-expressions */
/* global describe it */

import { assert, expect } from '@esm-bundle/chai';
import { readFile } from '@web/test-runner-commands';
import decorate from '../../../blocks/contact/contact.js';
import { getLocale } from '../../../scripts/utils.js';
import loadPlaceholders from '../../test-utlis.js';

document.write(await readFile({ path: './contact.plain.html' }));
const locale = getLocale();
await loadPlaceholders(`/${locale}`);

const block = document.querySelector('.contact');
await decorate(block);

describe('Contact Block', () => {
  it('Profile Item Should be present', async () => {
    assert.isDefined(block.querySelector('.profile-collection__item'));
  });

  it('Name Should be present', async () => {
    expect(block.querySelector('.headline__main').textContent).to.be.equal('Jeannine Rapp');
  });

  it('SubHeading Should be present', async () => {
    expect(block.querySelector('.headline__sub').textContent).to.be.equal('Head of Communication & Implementation of Group Initiatives');
  });

  it('Three Profile Contacts Should be present', async () => {
    expect(block.querySelectorAll('.profile__contact-item-link').length).to.be.equal(3);
  });
});
