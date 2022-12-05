/**
 * Build figcaption element
 * @param {Element} pEl The original element to be placed in figcaption.
 * @returns figCaptionEl Generated figcaption
 */
 export function buildCaption(pEl, figCaptionEl) {
  if (!figCaptionEl) {
    figCaptionEl = document.createElement('figcaption');
  }
  pEl.classList.add('caption');
  figCaptionEl.append(pEl);

  return figCaptionEl;
}

/**
 * Build figure element
 * @param {Element} blockEl The original element to be placed in figure.
 * @returns figEl Generated figure
 */
 function buildFigure(blockEl) {
  const figEl = document.createElement('figure');
  figEl.classList.add('figure');
  let figElCaption;
  [...blockEl.children].forEach((child) => {
    const clone = child.cloneNode(true);
    // picture, video, or embed link is NOT wrapped in P tag
    if (clone.nodeName === 'PICTURE' || clone.nodeName === 'VIDEO' || clone.nodeName === 'A') {
      figEl.prepend(clone);
    } else {
      // content wrapped in P tag(s)
      const picture = clone.querySelector('picture');
      if (picture) {
        figEl.prepend(picture);
      }
      const video = clone.querySelector('video');
      if (video) {
        figEl.prepend(video);
      }
      const caption = clone.querySelector('em');
      if (caption) {
        if (!figElCaption) {
          figElCaption = buildCaption(caption);
          figEl.append(figElCaption);
        } else {
          buildCaption(caption, figElCaption);
        }
      }
      const link = clone.querySelector('a');
      if (link) {
        const img = figEl.querySelector('picture') || figEl.querySelector('video');
        if (img) {
          // wrap picture or video in A tag
          link.textContent = '';
          link.append(img);
        }
        figEl.prepend(link);
      }
    }
  });
  return figEl;
}

export default function decorateImage(blockEl) {
  const blockCount = blockEl.firstElementChild.childElementCount;
  const figEl = buildFigure(blockEl.firstElementChild.firstElementChild);
  blockEl.innerHTML = '';
  blockEl.append(figEl);
}