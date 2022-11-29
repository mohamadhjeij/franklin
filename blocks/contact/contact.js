export default function decorate(block) {
  const map = new Map();
  [...block.firstElementChild.querySelector('ul').children].forEach((li) => {
    const child = li.querySelector('a');
    const parent = child.parentElement;
    parent.removeChild(child);
    map.set(child.text, parent);
  });

  const xhr = new XMLHttpRequest();
  xhr.open('GET', new URL('/contacts.json', window.location), true);
  xhr.responseType = 'json';
  xhr.onload = () => {
    xhr.response.data.forEach((entry) => {
      if (map.get(entry.Email)) {
        const wrapper = document.createElement('div');
        wrapper.textContent = 'PRESSEKONTAKT';
        const name = document.createElement('div');
        name.textContent = entry.Name;
        wrapper.appendChild(name);
        const org = document.createElement('div');
        org.textContent = entry.Org;
        wrapper.appendChild(org);
        const list = document.createElement('ul');
        wrapper.appendChild(list);
        const phone = document.createElement('a');
        phone.href = `tel:${entry.Phone}`;
        phone.text = entry.Phone;
        let li = document.createElement('li');
        li.appendChild(phone);
        list.appendChild(li);
        const mail = document.createElement('a');
        mail.href = `mailTo:${entry.Email}`;
        mail.text = entry.Email;
        li = document.createElement('li');
        li.appendChild(mail);
        list.appendChild(li);
        const vcard = document.createElement('a');
        vcard.href = entry.vCard;
        vcard.text = 'vCard herunterladen';
        li = document.createElement('li');
        li.appendChild(vcard);
        list.appendChild(li);
        const parent = map.get(entry.Email);
        parent.appendChild(wrapper);
      }
    });
  };
  xhr.send();
}
