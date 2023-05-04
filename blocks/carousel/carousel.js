import { decorateIcons } from '../../scripts/lib-franklin.js';

function template(props) {
  return `
    <div class="image-slideshow grid__container">
      <div class="grid__structure">
        <div class="grid__column grid__column--100 image-slideshow__wrapper">
          <div>
            <div class="thumbnail-slideshow thumbnail-slideshow--left-aligned">
              <div class="slideshow thumbnail-slideshow__main slideshow--navigation-recenter">
                <div class="slideshow__container swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
                  <ul class="slideshow__list swiper-wrapper">

                    ${props.items.map((item, i) => `
                    <li class="slideshow__item swiper-slide ${i === 0 ? 'swiper-slide-active' : ''}">
                      <div class="thumbnail-slideshow-item">
                        <div class="thumbnail-slideshow-item__media">
                          <div class="thumbnail-slideshow-item__image">
                            <div class="slideshow-item">
                              <div class="slideshow-item__main">
                                <figure class="lazy-image lazy-image--ratio-16_9 lazy-image--loaded">
                                  <div class="lazy-image__image-container">
                                    ${item.image}
                                  </div>
                                  <div class="lazy-image__active-image-indicator"></div>
                                  <figcaption class="lazy-image__figcaption text--caption">
                                    ${(() => {
    if (item.copyright) {
      return `
      <span class="lazy-image__copyright">
        <span class="lazy-image__copyright-text ">${item.copyright}</span>
      </span>
      `;
    }
    return '';
  })()}

                                    <span class="lazy-image__caption">
                                      <p>${item.label}</p>
                                    </span>
                                  </figcaption>
                                </figure>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="thumbnail-slideshow-item__media-indicator"></div>
                      </div>
                    </li>

                    `).join('')}

                  </ul>

                  <div class="swiper-button-next slideshow__navigation-button slideshow__navigation-button--next" role="navigation">
                    <span class="icon icon-chevron-right"></span>
                  </div>

                  <div class="swiper-button-prev slideshow__navigation-button slideshow__navigation-button--right swiper-button-disabled" role="navigation">
                    <span class="icon icon-chevron-left"></span>
                  </div>

                  <div class="slideshow__pagination-wrapper">
                    <div class="slideshow__pagination-bar">
                      <div class="swiper-pagination slideshow__pagination swiper-pagination-clickable swiper-pagination-bullets" role="navigation">
                        ${props.items.map((_, index) => `
                          <span class="slideshow__pagination-bullet ${index === 0 ? 'slideshow__pagination-bullet--active' : ''}"></span>
                        `).join('')}
                      </div>

                      <span class="slideshow__pagination-bullet slideshow__pagination-bullet--animated" style="width: ${100 / props.items.length}%; left: 0%;"></span>
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

function addSwiperListener(carousel) {
  const activeSlideClass = 'swiper-slide-active';
  const activePaginationClass = 'slideshow__pagination-bullet--active';

  const slides = carousel.querySelector('.thumbnail-slideshow__main .slideshow__list');
  const pagination = carousel.querySelector('.thumbnail-slideshow__main .slideshow__pagination');
  const animatedPagination = carousel.querySelector('.thumbnail-slideshow__main .slideshow__pagination-bullet--animated');

  slides.style.transitionDuration = '300ms';

  const nextButton = carousel.querySelector('.swiper-button-next');
  const prevButton = carousel.querySelector('.swiper-button-prev');

  const getIndex = () => {
    const activeSlide = slides.querySelector(`.${activeSlideClass}`);
    const activePagination = pagination.querySelector(`.${activePaginationClass}`);
    const index = Array.from(slides.children).indexOf(activeSlide);

    return { index, activeSlide, activePagination };
  };

  const swipe = (op) => {
    const { index, activeSlide, activePagination } = getIndex();
    const toIndex = index + op;

    activeSlide.classList.remove(activeSlideClass);
    slides.children[toIndex].classList.add(activeSlideClass);

    activePagination.classList.remove(activePaginationClass);
    pagination.children[toIndex].classList.add(activePaginationClass);

    if (index < toIndex) {
      nextButton.classList.toggle('swiper-button-disabled', !slides.children[toIndex + 1]);
      prevButton.classList.toggle('swiper-button-disabled', !slides.children[index]);
    } else {
      prevButton.classList.toggle('swiper-button-disabled', !slides.children[toIndex - 1]);
      nextButton.classList.toggle('swiper-button-disabled', !slides.children[index]);
    }

    const slideWidth = slides.getBoundingClientRect().width;
    slides.style.transform = `translate3d(-${slideWidth * toIndex}px, 0px, 0px)`;

    const slidesPercentage = 100 / slides.children.length;
    animatedPagination.style.left = `${slidesPercentage * toIndex}%`;
  };

  nextButton.onclick = () => {
    swipe(1);
  };

  prevButton.onclick = () => {
    swipe(-1);
  };

  pagination.onclick = (event) => {
    const bullet = event.target;
    if (!bullet.classList.contains(activePaginationClass)) {
      const newIndex = Array.from(pagination.children).indexOf(bullet);
      const { index } = getIndex();

      if (newIndex > index) {
        swipe(newIndex - index);
      } else {
        swipe(-1 * (index - newIndex));
      }
    }
  };
}

export default async function decorate(block) {
  const items = Array.from(block.querySelectorAll(':scope > div')).map((item) => {
    const image = item.querySelector('picture');
    image.classList.add('lazy-image__image');
    image.classList.add('lazy-image__target-image');

    const label = item.querySelector('div:last-of-type').textContent;

    let copyright;
    if (item.querySelector('div:first-of-type p:last-of-type')) {
      copyright = item.querySelector('div:first-of-type p:last-of-type').textContent;
      if (copyright.startsWith && copyright.startsWith('©')) {
        copyright = copyright.substring(1);
      }
    }

    const img = image.querySelector('img');
    if (img) {
      img.alt = img.alt || label;
      img.title = img.title || label;
    }

    return {
      image: image.outerHTML,
      label,
      copyright,
    };
  });

  block.innerHTML = template({ items });

  decorateIcons(block, true);

  addSwiperListener(block.querySelector('.image-slideshow'));
}
