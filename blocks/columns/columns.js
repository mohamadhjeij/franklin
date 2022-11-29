export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);
  [...block.children[0].children].forEach((child) => {
    const img = child.querySelector('p > picture > img');
    const path = new URL(img.src, window.location).pathname;
    const downloadP = child.firstElementChild.nextElementSibling;
    downloadP.remove();
    const download = document.createElement('a');
    download.text = downloadP.textContent;
    download.href = path;
    child.append(download);

    function formatBytes(bytes, decimals = 2) {
      if (!+bytes) return '0 Bytes';
      const k = 1000;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
      const text = document.createElement('span');
      text.textContent = `${formatBytes(xhr.response.size)}`;
      child.firstElementChild.append(text);
    };
    xhr.send();
  });
}
