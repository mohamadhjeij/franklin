import { decorateIcons, fetchPlaceholders } from '../../scripts/lib-franklin.js';
import { getLocale } from '../../scripts/utils.js';

function setProfileHeading(profileItem, placeholders, item) {
  const profileHeadline = document.createElement('div');
  profileHeadline.classList.add('headline', 'hl-xs', 'profile__headline');

  const span = document.createElement('span');
  span.classList.add('headline__eyebrow', 'text--eyebrow');
  span.textContent = placeholders.contactheadline;

  const heading3 = document.createElement('h3');
  const innerSpan = document.createElement('span');
  innerSpan.classList.add('headline__main');
  innerSpan.textContent = item.Name;
  heading3.appendChild(innerSpan);

  profileHeadline.appendChild(span);
  profileHeadline.appendChild(heading3);

  if (item.Org) {
    const heading4 = document.createElement('h4');
    heading4.classList.add('headline__sub', 'hl--sub');
    heading4.textContent = item.Org;
    profileHeadline.appendChild(heading4);
  }

  profileItem.appendChild(profileHeadline);
}

function addListItem(ariaLabel, href, target, title, spanClassList, spanLabel, ul) {
  const li = document.createElement('li');
  li.classList.add('profile__contact-item');

  const anchorTag = document.createElement('a');
  anchorTag.classList.add('plain-link', 'profile__contact-item-link');
  anchorTag['aria-label'] = ariaLabel;
  anchorTag.href = href;
  anchorTag.title = title;

  if (target) {
    anchorTag.target = target;
  }

  const spanPhone = document.createElement('span');
  spanClassList.forEach((x) => {
    spanPhone.classList.add(x);
  });

  const spanPhoneLabel = document.createElement('span');
  spanPhoneLabel.classList.add('profile__contact-item-label');
  spanPhoneLabel.textContent = spanLabel;

  anchorTag.appendChild(spanPhone);
  anchorTag.appendChild(spanPhoneLabel);

  li.appendChild(anchorTag);
  ul.appendChild(li);
}

function setProfileContact(profileItem, placeholders, item) {
  const profileContact = document.createElement('div');
  profileContact.classList.add('profile__contact');

  const ul = document.createElement('ul');
  ul.classList.add('profile__contact-list');

  addListItem(placeholders.contacttelephon, `tel:${item.Phone}`, '', placeholders.contacttelephon, ['icon', 'icon-phone'], item.Phone, ul);
  addListItem(placeholders.contactemail, `mailto:${item.Email}`, '', placeholders.contactemail, ['icon', 'icon-mail', 'icon--symbol'], item.Email, ul);
  addListItem('vCard', item.vCard, '_blank', 'vCard', ['icon', 'icon-file-download'], placeholders.contactvcard, ul);
  profileContact.appendChild(ul);
  profileItem.appendChild(profileContact);
}

function template(block, items, placeholders) {
  block.classList.add('profile-collection__settings', 'grid__container', `primary-count-${items.length}`, 'grid__structure', 'profile-collection__structure', 'profile-collection__structure--primary');

  items.forEach((item) => {
    const profileItem = document.createElement('div');
    profileItem.classList.add('profile-collection__item');
    setProfileHeading(profileItem, placeholders, item);
    setProfileContact(profileItem, placeholders, item);
    block.appendChild(profileItem);
  });
}

export default async function decorate(block) {
  const locale = getLocale();
  const placeholders = await fetchPlaceholders(`${locale}`);
  const contacts = [];
  block.querySelectorAll('a').forEach((a) => {
    contacts.push(a.href);
  });

  const reqs = await Promise.all(contacts.map((contact) => fetch(contact)));

  const items = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const req of reqs) {
    if (req.ok) {
      // eslint-disable-next-line no-await-in-loop
      const res = await req.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(res, 'text/html');
      items.push(
        {
          Name: doc.querySelector('html > head > title') ? doc.querySelector('html > head > title').text : undefined,
          Email: doc.querySelector('html > head > meta[name="email"]') ? doc.querySelector('html > head > meta[name="email"]').content : undefined,
          Org: doc.querySelector('html > head > meta[name="org"]') ? doc.querySelector('html > head > meta[name="org"]').content : undefined,
          Phone: doc.querySelector('html > head > meta[name="phone"]') ? doc.querySelector('html > head > meta[name="phone"]').content : undefined,
          vCard: doc.querySelector('html > head > meta[name="vcard"]') ? doc.querySelector('html > head > meta[name="vcard"]').content : undefined,
        },
      );
    }
  }

  block.innerHTML = '';
  template(block, items, placeholders);

  decorateIcons(block, true);
}
