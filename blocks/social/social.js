import { decorateIcons } from '../../scripts/lib-franklin.js';
import { socials, addClipboardInteraction } from '../../scripts/utils.js';

function template(props) {
  return `
    <div class="page-utility-bar grid__container">
      <div class="grid__structure">
        ${props.highlighted ? '<hr class="divider divider--dark">' : ''}

        <div class="page-utility-bar__label">${props.title}</div>

        <div class="page-utility-bar__share-container">
          <div class="share">
            ${props.items.map((item) => `
            <a data-type="${item.type}" aria-label="${item.label}" class="plain-link share__link" target="_blank" href="${item.href}" title="${item.label}">
              <span class="icon icon-${item.icon}"></span>
            </a>
            `).join('')}
          </div>
        </div>

        <hr class="divider">

      </div>
    </div>
  `;
}

/**
 * decorates the social block
 * @param {Element} block The social block element
 */

export default async function decorate(block) {
  block.innerHTML = template({
    title: block.textContent.trim(),
    items: socials,
    highlighted: block.classList.contains('highlighted'),
  });

  decorateIcons(block, true);

  addClipboardInteraction(block);
}
