import { decorateIcons } from '../../scripts/lib-franklin.js';

function template(props) {
  return `
    <div class="downloads-wrapper">
      <div class="downloads">
      
        <div class="grid__container downloads__headline-grid">
          <div class="grid__structure">
              <div class="grid__column grid__column--100">
                <div class="module-headline">
                  <div class="grid__structure">
                    <div class="grid__column module-headline--column">
                      <div class="headline hl-l headline--align-center hl--sub-xs">
                        <span class="headline__main heading-slot"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          <div class="downloads__tabs downloads__tabs--no-tabs">
            <div class="tabs-horizontal tabs-horizontal--js-init">
              <div>
                <div class="item">
                  <div class="assets">
                    <div class="grid__container">
                      <div class="assets__collapsable-area">
                        <div class="slideshow slideshow--assets assets__slideshow slideshow--navigation-recenter slideshow--hide-interaction">
                          <div class="slideshow__container swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
                            <ul class="slideshow__list swiper-wrapper">
                            
                              ${props.items.map((item) => `
                              <li class="slideshow__item">
                              
                                <div class="download-item download-item--landscape">
                                  <div class="download-item__image">
                                    <a class="plain-link download-item__image-link" href="${item.href}">
                                      <figure class="lazy-image lazy-image--ratio-3_2 lazy-image--position-top elevation--highlight lazy-image--loaded">
                                        <div class="lazy-image__image-container" >
                                          ${item.image}
                                        </div>
                                        <div class="lazy-image__active-image-indicator"></div>
                                      </figure>
                                    </a>
                                  </div>
  
                                  <div class="download-item__content">
                                    <div class="download-item__info text--body-m">
                                      <div class="download-item__info-data">
                                        <span class="download-item__info-label text--bold">Dateigröße:</span>
                                        <span class="download-item__info-value download-size-slot"></span>
                                      </div>
                                    </div>
                                    
                                    <div class="button-link button-link--link">
                                      <a class=" button-link--icon  button-link--internal" href="${item.href}" download="${item.name}">
                                        <span class="button-link__content">
                                          <span>
                                            <span>Download</span>
                                          </span>
                                          <span class="icon icon-internal-link"></span>
                                        </span>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                
                              </li>
                              `).join('')}
                              
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  `;
}

function formatBytes(bytes, decimals = 1) {
  if (!+bytes) return '0 Bytes';
  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

export default function decorate(block) {
  const heading = block.querySelector('h2');
  const pictures = Array.from(block.querySelectorAll('picture'));

  const unoptimize = (src) => {
    const url = new URL(src);
    url.search = '';
    return url.toString();
  };

  const items = pictures.map((picture) => {
    picture.classList.add('lazy-image__image');
    picture.classList.add('lazy-image__target-image');

    const img = picture.querySelector('img');
    const name = img.alt;
    img.alt = `Vorschaubild von ${name}`;
    img.title = 'Download';

    return {
      name,
      image: picture.outerHTML,
      href: unoptimize(img.src),
    };
  });

  block.innerHTML = template({ items });

  decorateIcons(block, true);

  // Insert the heading back in the respective slot for navigation scroll tracking
  block.querySelector('.heading-slot').append(heading);

  // Update download-size-slot in non-blocking manner
  pictures.forEach((picture, index) => {
    const { src } = picture.querySelector('img');

    fetch(unoptimize(src)).then((req) => req.blob()).then((blob) => {
      block.querySelector(`li.slideshow__item:nth-child(${index + 1}) .download-size-slot`).textContent = formatBytes(blob.size);
    });
  });
}
