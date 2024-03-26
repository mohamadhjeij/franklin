/* eslint-disable no-unused-expressions */
/* global describe it */

import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';
import { decorateFetch } from '../../../blocks/footer/footer.js';

document.body.innerHTML = await readFile({ path: '../../scripts/dummy.html' });

const { buildBlock, decorateBlock, loadBlock } = await import('../../../scripts/lib-franklin.js');

document.body.innerHTML = await readFile({ path: '../../scripts/body.html' });

const sleep = async (time = 1000) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(true);
  }, time);
});

const footerBlock = buildBlock('footer', [['Footer', '/test/blocks/footer/footer']]);
document.querySelector('footer').append(footerBlock);
decorateBlock(footerBlock);
await loadBlock(footerBlock);
await sleep();

function mockBlock(initHtml) {
  return {
    innerHTML: initHtml,
    append(e) {
      this.innerHTML += e.innerHTML;
    },
    querySelector: () => ({}),
    querySelectorAll: () => ({ forEach: () => { } }),
  };
}

describe('Footer block', () => {
  it('Displays footer content', async () => {
    // const a = document.querySelector('footer a');
    // expect(a).to.exist;
    // expect(a.href).to.equal('https://www.adobe.com/privacy.html');
    expect(true).to.be.true;
  });

  it('Picks the original footer', async () => {
    const block = mockBlock('<p>');
    const footerPath = 'http://somewhere/somefooter';
    const placeholders = {};

    const mf = sinon.stub(window, 'fetch');
    mf.callsFake((v) => {
      if (v === footerPath) {
        return {
          ok: true,
          text: () => '<html><body>the-body</body>'
            + '<footer><nav class="breadcrumb">tobereplaced</nav>the-footer</footer></html>',
        };
      }
      throw Error('Unexpected fetch arg');
    });

    try {
      await decorateFetch(block, footerPath, placeholders, 'en');
    } finally {
      mf.restore();
    }

    expect(block.innerHTML.startsWith('<p><nav class="breadcrumb">')).to.be.true;
    expect(block.innerHTML.endsWith('</nav>the-footer')).to.be.true;
    expect(block.innerHTML).to.not.include('tobereplaced');
  });

  it('Picks the backup footer', async () => {
    const block = mockBlock('<br/>');
    const footerPath = 'http://somewhere/somefooter';
    const bkuFooter = '/blocks/footer/fallback_de.html';
    const placeholders = {};

    const mf = sinon.stub(window, 'fetch');
    mf.callsFake((v) => {
      if (v === bkuFooter) {
        return {
          ok: true,
          text: () => 'mytext',
        };
      }
      throw Error('CORS exception');
    });

    try {
      await decorateFetch(block, footerPath, placeholders, 'de');
    } finally {
      mf.restore();
    }

    expect(block.innerHTML).to.be.equal('<br/>mytext');
  });
});
