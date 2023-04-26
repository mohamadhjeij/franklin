/* eslint-disable no-unused-expressions */
/* global describe it */

import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import decorate from '../../../blocks/columns-new/columns-new.js';
import { getLocale } from '../../../scripts/utils.js';
import loadPlaceholders from '../../test-utlis.js';

document.write(await readFile({ path: './columns-new.plain.html' }));
const locale = getLocale();
await loadPlaceholders(`/${locale}`);

const block = document.querySelector('.columns-new');
await decorate(block);

describe('Columns New Block', () => {
  it('Decorates block', async () => {
    expect(block.classList.contains('columns-new-2-cols')).to.equal(true);
  });

  it('Caption Span', async () => {
    expect(block.querySelector('.caption')).not.to.be.null;
    expect(block.querySelector('.caption')).not.to.be.undefined;
  });

  it('Caption Copyright', async () => {
    expect(block.querySelector('.copyright')).not.to.be.null;
    expect(block.querySelector('.copyright')).not.to.be.undefined;
  });
});
