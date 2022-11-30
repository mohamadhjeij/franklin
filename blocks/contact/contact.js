import { decorateIcons } from '../../scripts/lib-franklin.js';

function template(entry) {
  return `<div>
  <div>PRESSEKONTAKT</div>
  <div>${entry.Name}</div>
  <div>${entry.Org}</div>
  <ul>
  <li><a href="tel:${entry.Phone}">${entry.Phone}</a></li>
  <li><a href="mailTo:${entry.Email}">${entry.Email}</a></li>
  <li><a href="${entry.vCard}">vCard herunterladen</a></li>
  </ul>
  </div>`;
}

export default async function decorate(block) {
  const map = new Map();
  [...block.firstElementChild.querySelector('ul').children].forEach((li) => {
    const child = li.querySelector('a');
    const parent = child.parentElement;
    parent.removeChild(child);
    map.set(child.text, parent);
  });

  const req = await fetch('/contacts.json');
  if (req.ok) {
    const res = await req.json();
    res.data.forEach((entry) => {
      if (map.get(entry.Email)) {
        map.get(entry.Email).innerHTML = template(entry);
      }
    });
  }
}
