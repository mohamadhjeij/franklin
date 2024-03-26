/* eslint-disable no-unused-expressions */
/* global describe it */

import { assert } from '@esm-bundle/chai';
import { readFile } from '@web/test-runner-commands';
import decorate from '../../../blocks/carousel/carousel.js';
import { getLocale } from '../../../scripts/utils.js';
import loadPlaceholders from '../../test-utlis.js';

document.write(await readFile({ path: './carousel.plain.html' }));
const locale = getLocale();
await loadPlaceholders(`/${locale}`);

const block = document.querySelector('.carousel');
await decorate(block);

describe('Carousel Block', () => {
  it('SlideShow Pagination Should Exists', async () => {
    assert.isDefined(block.querySelector('.slideshow__pagination-wrapper'));
  });

  it('Swiper button Prev', async () => {
    assert.isDefined(block.querySelector('.swiper-button-prev'));
  });

  it('Swiper button Next', async () => {
    assert.isDefined(block.querySelector('.swiper-button-next'));
  });
});
