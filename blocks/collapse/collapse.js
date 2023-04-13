function addCollapseListener(collapseBlock) {
  const expandableText = collapseBlock.querySelector('div:nth-child(2)');
  const collapsibleSection = collapseBlock.parentElement.parentElement;
  const expandButton = collapseBlock.querySelector('div:nth-child(3)');
  const collapseButton = collapseBlock.querySelector('div:nth-child(4)');
  const arrowUpElement = document.createElement('div');
  if (!expandButton && !collapseButton) return;
  arrowUpElement.classList.add('arrow', 'down');
  expandButton.querySelector('div').appendChild(arrowUpElement);
  const arrowDownElement = document.createElement('div');
  arrowDownElement.classList.add('arrow', 'up');
  collapseButton.querySelector('div').appendChild(arrowDownElement);

  expandButton.addEventListener('click', (e) => {
    const height = collapseBlock.querySelector('div:nth-child(2) > div').clientHeight
        + collapseButton.getBoundingClientRect().height
        + parseFloat(getComputedStyle(expandableText).paddingBottom);
    expandableText.style.height = `${height}px`;
    collapsibleSection.classList.remove('collapsed-text');
    collapsibleSection.classList.add('expanded-text');
    e.preventDefault();
  });

  collapseButton.addEventListener('click', (e) => {
    expandableText.style.height = '0';
    collapsibleSection.classList.add('collapsed-text');
    collapsibleSection.classList.remove('expanded-text');
    e.preventDefault();
  });
}

export default function decorate(block) {
  addCollapseListener(block);
}
