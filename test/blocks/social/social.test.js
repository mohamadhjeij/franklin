/* global describe it */
import { readFile } from '@web/test-runner-commands';
import { assert } from '@esm-bundle/chai';
import { decorate } from '../../../blocks/social/social.js';

document.body.innerHTML = await readFile({ path: './social.plain.html' });
describe('Social block', () => {
  it('Decorates block', async () => {
    try {
      const block = document.querySelector('.social');
      await decorate(block);
      // This expectation is based on the meta tags in the social.plain.html file
      assert.isDefined(block.querySelector('.page-utility-bar__share-container'));
      assert.isDefined(block.querySelector('.page-utility-bar__label'));
    } catch (e) {
      assert.fail(e);
    }
  });
});
