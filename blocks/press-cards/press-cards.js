import { fetchPlaceholders } from '../../scripts/lib-franklin.js';
import { getLocale } from '../../scripts/utils.js';

function formatBytes(bytes, decimals = 1) {
  if (!+bytes) return '0 Bytes';
  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

export default async function decorate(block) {
  const locale = getLocale();
  const placeholders = await fetchPlaceholders(`/${locale}`);
  /* format headers */
  if (block.querySelector('h2')) {
    block.querySelector('h2').classList.add('headline');
    block.querySelector('h2').classList.add('headline__main');
    block.querySelector('h2').classList.add('headline--align-center');
    block.querySelector('h2').classList.add('hl-l');
    block.querySelector('h2').classList.add('hl--sub-xs');
  }

  block.querySelectorAll('h3').forEach((h3) => {
    h3.classList.add('headline');
    h3.classList.add('headline__main');
    h3.classList.add('hl-xs');
    h3.classList.add('spacing--s');
  });

  block.querySelectorAll('h4').forEach((h4) => {
    h4.classList.add('headline__sub');
    h4.classList.add('hl-sub');
  });
  const [headline] = block.children;
  block.removeChild(headline);
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'press-cards-card-image';
      } else {
        div.className = 'press-cards-card-body';
        div.classList.add('text');
        div.classList.add('text--body-m');
        div.classList.add('spacing--s');
        const downloadInfoElement = document.createElement('div');
        const downloadButton = div.querySelector('.button-container');
        div.parentElement.querySelector('.press-cards-card-image').href = downloadButton.querySelector('a').href;
        const downloadButtonIconElement = document.createElement('span');
        downloadButtonIconElement.innerHTML = `
          <span>
             <span>Download</span>
           </span>   
           <svg class="download-item-icon" focusable="false" xmlns:xlink="http://www.w3.org/1999/xlink"">
             <use xlink:href="/icons/symbols-sprite.svg#svgsymbol-external-link"></use>
            </svg>`;
        downloadButton.querySelector('a').replaceChildren(...downloadButtonIconElement.children);
        downloadInfoElement.innerHTML = `
         <div class="press-cards-info-data">
           <span class="press-cards-info-label text--bold">${placeholders.columnpages}:</span>
           <span class="press-cards-info-value">1</span>
         </div>
           <div class="press-cards-info-data">
             <span class="press-cards-info-label text--bold">${placeholders.columnfilesize}:</span>
             <span class="press-cards-info-value"></span>
           </div>
          </div>`;
        downloadInfoElement.classList.add('press-cards-item-info', 'text--body-m');
        div.insertBefore(downloadInfoElement, downloadButton);
      }
    });
    ul.append(li);
  });
  block.textContent = '';
  block.append(...headline.children);
  block.append(ul);
  block.querySelectorAll('.press-cards-card-body').forEach((pressCardBody) => fetch(pressCardBody.querySelector('a').href)
    .then((req) => req.blob())
    .then((blob) => {
      pressCardBody.querySelectorAll('.press-cards-info-value')[1].textContent = formatBytes(blob.size);
    }));
}
