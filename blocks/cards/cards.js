function template(props) {
  return `
  <div class="text-media-grid grid__container">
  <div data-target-id="textMediaGrid-101653481">
    <div class="text-media-grid__item-group lazy-image--ratio-1_1">
      <div class="text-media-grid__items text-media-grid__items--count-${props.items.length}">
      ${props.items.map((item) => `
        <div class="text-media-item-vertical grid__structure text-media-item-vertical--fullwidth">
          <div class="grid__column grid__column--100 text-media-item-vertical__media ">
            <div class="media-component">
              <div class="media media--image">
                <figure data-module="LazyImage" class="lazy-image lazy-image--ratio-1_1 lazy-image--position-top lazy-image--loaded">
                  <div class="lazy-image__image-container" data-js-select="LazyImage_image-container">
                    <noscript>
                    ${item.picture.querySelector('img').outerHTML}
                    </noscript>
                    ${item.picture.outerHTML}
                  </div>
                  <div class="lazy-image__active-image-indicator"></div>
                </figure>
              </div>
            </div>
          </div>
          <div class="grid__column text-media-item-vertical__text ">
            <div class="text text--body-m spacing--s">
              <p>${item.text}</p>
            </div>
          </div>
        </div>
        `)}
      </div>
    </div>
  </div>
</div>
  `;
}
export default function decorate(block) {
  const items = [];
  [...block.children].forEach((row) => {
    const picture = row.querySelector('picture');
    picture.querySelector('img').classList.add('lazy-image__image');
    const text = row.querySelector('div:last-child').textContent;
    const item = {
      picture,
      text,
    };
    items.push(item);
  });
  block.innerHTML = template({ items });
}
