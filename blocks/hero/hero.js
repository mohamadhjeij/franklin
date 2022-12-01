/* eslint-disable comma-dangle */
import { decorateIcons } from '../../scripts/lib-franklin.js';

function template(info) {
  return `<div class="general-article-stage">
    <div class="grid__container" xmlns="http://www.w3.org/1999/html">
        <div class="grid__structure">
            <div class="grid__column grid__column--100">
                <hr class="divider divider--dark">
            </div>
            <div class="grid__column general-article-stage__column-content">
                <div class="headline hl-xxl hl--sub-m">
                    <span>
                        <span class="headline__eyebrow text--eyebrow">Presseinformation</span>
                        <h2>
                            <span class="headline__main" data-js-select="Headline_main">${info.Main}</span>
                        </h2>
                        <h3 class="headline__sub hl--sub">${info.Sub}</h3>
                    </span>
                </div>
                <div class="general-article-stage__details text--eyebrow">
                    ${info.Date}
                    · ${info.Duration} Lesedauer
                </div>
                <div class="general-article-stage__share">
                    <div class="share" data-module="Share">
                        <a aria-label="Diese Website per E-Mail teilen" class="plain-link share__link" href="mailto:?subject=ZEISS%2C%20TRUMPF%20und%20Fraunhofer%20mit%20Deutschem%20Zukunftspreis%20ausgezeichnet&amp;body=EUV-Lithographie%20erm%C3%B6glicht%20Chips%20f%C3%BCr%20modernste%20Smartphones%20und%20automatisiertes%20Fahren.%20Weltweit%20f%C3%BChrende%20Fertigungstechnologie%20st%C3%A4rkt%20deutsch-europ%C3%A4ische%20Position%20im%20globalen%20Halbleitergesch%C3%A4ft%0D%0A%0D%0Ahttps://www.zeiss.de/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/zeiss-trumpf-und-fraunhofer-mit-deutschem-zukunftspreis-ausgezeichnet.html" title="Diese Website per E-Mail teilen" >
                            <span class="icon icon-mail">
                            </span>
                        </a>
                        <a aria-label="Link in die Zwischenablage kopieren" class="plain-link share__link" data-js-select="Share_copy-to-clipboard" href="https://www.zeiss.de/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/zeiss-trumpf-und-fraunhofer-mit-deutschem-zukunftspreis-ausgezeichnet.html" title="Link in die Zwischenablage kopieren" >          
                            <span class="icon icon-content_copy">
                            </span>
                        </a>
                        <a aria-label="Diese Website auf LinkedIn teilen" class="plain-link share__link" href="https://www.linkedin.com/shareArticle?mini=true&amp;url=https://www.zeiss.de/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/zeiss-trumpf-und-fraunhofer-mit-deutschem-zukunftspreis-ausgezeichnet.html&amp;title=ZEISS%2C%20TRUMPF%20und%20Fraunhofer%20mit%20Deutschem%20Zukunftspreis%20ausgezeichnet&amp;summary=EUV-Lithographie%20erm%C3%B6glicht%20Chips%20f%C3%BCr%20modernste%20Smartphones%20und%20automatisiertes%20Fahren.%20Weltweit%20f%C3%BChrende%20Fertigungstechnologie%20st%C3%A4rkt%20deutsch-europ%C3%A4ische%20Position%20im%20globalen%20Halbleitergesch%C3%A4ft" target="_blank" title="Diese Website auf LinkedIn teilen" >
                            <span class="icon icon-linkedin ">
                            </span>
                        </a>
                        <a aria-label="Diese Website auf Twitter teilen" class="plain-link share__link" href="https://twitter.com/intent/tweet?url=https://www.zeiss.de/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/zeiss-trumpf-und-fraunhofer-mit-deutschem-zukunftspreis-ausgezeichnet.html&amp;text=ZEISS%2C%20TRUMPF%20und%20Fraunhofer%20mit%20Deutschem%20Zukunftspreis%20ausgezeichnet" target="_blank" title="Diese Website auf Twitter teilen" >
                            <span class="icon icon-twitter">                          
                            </span>
                        </a>
                        <a aria-label="Diese Website auf Facebook teilen" class="plain-link share__link" href="https://www.facebook.com/sharer/sharer.php?u=https://www.zeiss.de/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/zeiss-trumpf-und-fraunhofer-mit-deutschem-zukunftspreis-ausgezeichnet.html" target="_blank" title="Diese Website auf Facebook teilen">          
                            <span class="icon icon-facebook icon--symbol">
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;
}

export default async function decorate(block) {
  const req = await fetch('/de/semiconductor-manufacturing-technology/news-und-events/query-index.json');
  if (req.ok) {
    const res = await req.json();
    const pub = res.data.find((entry) => entry.path === window.location.pathname);
    let dateString = '';
    if (pub && pub.publicationDate) {
      dateString = pub.publicationDate;
    }
    let timeString = '';
    if (pub && pub.readingTime) {
      timeString = `${pub.readingTime}.`;
    }
    block.innerHTML = template(
      {
        Date: dateString,
        Duration: timeString,
        Main: block.querySelector('h1').textContent,
        Sub: block.querySelector('h2').textContent
      }
    );

    decorateIcons(block, true);
  }
}
