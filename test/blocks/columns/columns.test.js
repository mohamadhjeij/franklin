/* eslint-disable no-unused-expressions */
/* global describe it */

import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import decorate from '../../../blocks/columns/columns.js';
import { getLocale } from '../../../scripts/utils.js';
import loadPlaceholders from '../../test-utlis.js';

document.write(await readFile({ path: './columns.plain.html' }));
const locale = getLocale();
await loadPlaceholders(`${locale}`);

const block = document.querySelector('.columns');
await decorate(block);

describe('Columns Block', () => {
  it('Decorates block', async () => {
    expect(block.classList.contains('columns-2-cols')).to.equal(true);
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
