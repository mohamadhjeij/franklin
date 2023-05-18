import { decorateIcons } from '../../scripts/lib-franklin.js';

function setLeftRightButton(carouselDiv) {
  const rightButton = document.createElement('div');
  rightButton.classList.add('swiper-button-next', 'slideshow__navigation-button', 'slideshow__navigation-button--next');
  const rightButtonSpan = document.createElement('span');
  rightButtonSpan.classList.add('icon', 'icon-chevron-right');
  rightButton.appendChild(rightButtonSpan);

  const leftButton = document.createElement('div');
  leftButton.classList.add('swiper-button-prev', 'slideshow__navigation-button', 'slideshow__navigation-button--right', 'swiper-button-disabled');
  const leftButtonSpan = document.createElement('span');
  leftButtonSpan.classList.add('icon', 'icon-chevron-left');
  leftButton.appendChild(leftButtonSpan);

  carouselDiv.appendChild(rightButton);
  carouselDiv.appendChild(leftButton);
}

function setSlideShowPaginationWrapper(carouselDiv, props) {
  const slideShowWrapper = document.createElement('div');
  slideShowWrapper.classList.add('slideshow__pagination-wrapper');

  const slideShowBar = document.createElement('div');
  slideShowBar.classList.add('slideshow__pagination-bar');

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'slideshow__pagination', 'swiper-pagination-clickable', 'swiper-pagination-bullets');

  props.items.forEach((ele, index) => {
    const span = document.createElement('span');
    span.classList.add('slideshow__pagination-bullet');

    if (index === 0) {
      span.classList.add('slideshow__pagination-bullet--active');
    }

    swiperPagination.appendChild(span);
  });

  slideShowBar.appendChild(swiperPagination);

  const paginationBullet = document.createElement('span');
  paginationBullet.classList.add('slideshow__pagination-bullet', 'slideshow__pagination-bullet--animated');
  paginationBullet.style.width = `${(100 / props.items.length)}%`;

  slideShowBar.appendChild(paginationBullet);
  slideShowWrapper.appendChild(slideShowBar);

  carouselDiv.appendChild(slideShowWrapper);
}

function template(props, block) {
  block.classList.add('image-slideshow', 'grid__container');

  if (props && props.items) {
    const ul = document.createElement('ul');
    ul.classList.add('slideshow__list', 'swiper-wrapper');

    props.items.forEach((ele, index) => {
      const li = document.createElement('li');
      li.classList.add('slideshow__item', 'swiper-slide');
      if (index === 0) {
        li.classList.add('swiper-slide-active');
      }

      const imageDiv = document.createElement('div');
      imageDiv.innerHTML = ele.image;

      li.appendChild(imageDiv);

      if (ele.copyright || ele.label) {
        const copyRightAndCaptionDiv = document.createElement('div');
        copyRightAndCaptionDiv.classList.add('lazy-image__figcaption', 'text--caption', 'lazy-image');

        if (ele.copyright) {
          const copyrightSpan = document.createElement('span');
          const copyrightSpanText = document.createElement('span');
          copyrightSpanText.classList.add('lazy-image__copyright-text');
          copyrightSpanText.textContent = ele.copyright;

          copyrightSpan.appendChild(copyrightSpanText);
          copyrightSpan.classList.add('lazy-image__copyright');
          copyRightAndCaptionDiv.appendChild(copyrightSpan);
        }

        if (ele.label) {
          const captionSpan = document.createElement('span');
          const captionP = document.createElement('p');
          captionP.textContent = ele.label;

          captionSpan.appendChild(captionP);
          captionSpan.classList.add('lazy-image__caption');
          copyRightAndCaptionDiv.appendChild(captionSpan);
        }

        li.appendChild(copyRightAndCaptionDiv);
      }

      ul.appendChild(li);
    });

    block.appendChild(ul);
    setLeftRightButton(block);
    setSlideShowPaginationWrapper(block, props);
  }
}

function addSwiperListener(carousel) {
  const activeSlideClass = 'swiper-slide-active';
  const activePaginationClass = 'slideshow__pagination-bullet--active';

  const slides = carousel.querySelector('.slideshow__list');
  const pagination = carousel.querySelector('.swiper-pagination');
  const animatedPagination = carousel.querySelector('.slideshow__pagination-bullet--animated');

  slides.style.transitionDuration = '300ms';

  const nextButton = carousel.querySelector('.swiper-button-next');
  const prevButton = carousel.querySelector('.swiper-button-prev');

  const getIndex = () => {
    const activeSlide = carousel.querySelector(`.${activeSlideClass}`);
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
    return {
      image: image.outerHTML,
      label,
      copyright,
    };
  });

  block.innerHTML = '';
  template({ items }, block);
  decorateIcons(block, true);
  addSwiperListener(block);
}
