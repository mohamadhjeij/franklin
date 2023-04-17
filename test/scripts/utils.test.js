/* global describe it */
import { expect } from '@esm-bundle/chai';
import { getFormattedDate } from '../../scripts/utils.js';

describe('Utils Script', () => {
  it('Tests getFormattedDate', async () => {
    expect(getFormattedDate(new Date('2020-03-25T07:00:00+0100'), 'en')).to.equal('25 March 2020');
    expect(getFormattedDate(new Date('2020-03-25T07:00:00+0100'), 'de')).to.equal('25. März 2020');
  });
});
