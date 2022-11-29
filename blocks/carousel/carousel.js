export default async function decorate(block) {
  const buttons = document.createElement('div');
  buttons.className = 'carousel-buttons';
  [...block.children].forEach((row, i) => {
    const classes = ['image', 'text'];
    classes.forEach((e, j) => {
      if (row.children[j]) row.children[j].classList.add(`carousel-${e}`);
    });
    /* buttons */
    const button = document.createElement('button');
    if (!i) button.classList.add('selected');
    button.onclick = () => {
      block.scrollTo({ top: 0, left: row.offsetLeft - row.parentNode.offsetLeft, behavior: 'smooth' });
      [...buttons.children].forEach((r) => r.classList.remove('selected'));
      button.classList.add('selected');
    };
    buttons.append(button);
  });

  const nav = document.createElement('div');
  nav.className = 'carousel-nav';

  const next = document.createElement('button');
  next.innerHTML = '<span class="icon icon-arrow"/>';
  next.className = 'carousel-next';
  next.onclick = () => {
    let current = buttons.querySelector('.selected') || buttons.firstElementChild;
    if (current === buttons.lastElementChild) {
      current = buttons.firstElementChild;
    } else {
      current = current.nextElementSibling;
    }
    current.click();
  };

  const prev = next.cloneNode(true);
  prev.className = 'carousel-prev';
  prev.onclick = () => {
    let current = buttons.querySelector('.selected') || buttons.firstElementChild;
    if (current === buttons.firstElementChild) {
      current = buttons.lastElementChild;
    } else {
      current = current.previousElementSibling;
    }
    current.click();
  };
  nav.append(prev, next);
  block.parentElement.append(nav);

  block.parentElement.append(buttons);
}
