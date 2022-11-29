export default function decorate(block) {
  [...block.children].forEach((child) => {
    const toggle = document.createElement('div');
    toggle.classList.add('toggle');
    const decapitalize = ([first, ...rest], upperRest = false) => first.toLowerCase() + (upperRest ? rest.join('').toUpperCase() : rest.join(''));
    const button = document.createElement('button');
    button.textContent = `Mehr Informationen ${decapitalize(child.querySelector('div > div > h2').textContent)}`;
    button.onclick = () => {
      if (![...child.classList].includes('toggle')) {
        child.classList.add('toggle');
      } else {
        child.classList = [...child.classList].filter((item) => item !== 'toggle');
      }
    };
    toggle.appendChild(button);
    block.insertBefore(toggle, child.nextSibling);
  });
}
