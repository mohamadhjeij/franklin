import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

function template(props) {
  return `
  <div class="text-media-grid grid__container">
  <div data-target-id="textMediaGrid-101653481">
    <div class="text-media-grid__item-group lazy-image--ratio-1_1">
      <div class="text-media-grid__items text-media-grid__items--count-${props.items.length}">
        <div class="text-media-item-vertical grid__structure text-media-item-vertical--fullwidth">
          <div class="grid__column grid__column--100 text-media-item-vertical__media ">
            <div class="media-component">
              <div class="media media--image">
                <figure data-module="LazyImage" class="lazy-image lazy-image--ratio-1_1 lazy-image--position-top lazy-image--loaded">
                  <div class="lazy-image__image-container" data-js-select="LazyImage_image-container">
                    <noscript>
                      <img class="lazy-image__image" src="https://www.zeiss.de/content/dam/z/media/pressphotos/awards-and-events/kingslake-award-uebergabe_prev.jpg/_jcr_content/renditions/original.image_file.1618.1618.0,225,1618,1843.file/kingslake-award-uebergabe_prev.jpg"/>
                    </noscript>
                    <img class="lazy-image__image lazy-image__target-image " data-js-select="LazyImage_image" src="https://www.zeiss.de/content/dam/z/media/pressphotos/awards-and-events/kingslake-award-uebergabe_prev.jpg/_jcr_content/renditions/original.image_file.1440.1440.0,225,1618,1843.file/kingslake-award-uebergabe_prev.jpg" data-src="{&quot;xsmall&quot;:&quot;https://www.zeiss.de/content/dam/z/media/pressphotos/awards-and-events/kingslake-award-uebergabe_prev.jpg/_jcr_content/renditions/original.image_file.100.100.0,225,1618,1843.file/kingslake-award-uebergabe_prev.jpg&quot;,&quot;small&quot;:&quot;https://www.zeiss.de/content/dam/z/media/pressphotos/awards-and-events/kingslake-award-uebergabe_prev.jpg/_jcr_content/renditions/original.image_file.360.360.0,225,1618,1843.file/kingslake-award-uebergabe_prev.jpg&quot;,&quot;medium&quot;:&quot;https://www.zeiss.de/content/dam/z/media/pressphotos/awards-and-events/kingslake-award-uebergabe_prev.jpg/_jcr_content/renditions/original.image_file.768.768.0,225,1618,1843.file/kingslake-award-uebergabe_prev.jpg&quot;,&quot;large&quot;:&quot;https://www.zeiss.de/content/dam/z/media/pressphotos/awards-and-events/kingslake-award-uebergabe_prev.jpg/_jcr_content/renditions/original.image_file.1024.1024.0,225,1618,1843.file/kingslake-award-uebergabe_prev.jpg&quot;,&quot;xlarge&quot;:&quot;https://www.zeiss.de/content/dam/z/media/pressphotos/awards-and-events/kingslake-award-uebergabe_prev.jpg/_jcr_content/renditions/original.image_file.1280.1280.0,225,1618,1843.file/kingslake-award-uebergabe_prev.jpg&quot;,&quot;xxlarge&quot;:&quot;https://www.zeiss.de/content/dam/z/media/pressphotos/awards-and-events/kingslake-award-uebergabe_prev.jpg/_jcr_content/renditions/original.image_file.1440.1440.0,225,1618,1843.file/kingslake-award-uebergabe_prev.jpg&quot;,&quot;max&quot;:&quot;https://www.zeiss.de/content/dam/z/media/pressphotos/awards-and-events/kingslake-award-uebergabe_prev.jpg/_jcr_content/renditions/original.image_file.1618.1618.0,225,1618,1843.file/kingslake-award-uebergabe_prev.jpg&quot;}">
                  </div>
                  <div class="lazy-image__active-image-indicator"></div>
                </figure>
              </div>
            </div>
          </div>
          <div class="grid__column text-media-item-vertical__text ">
            <div class="text text--body-m spacing--s">
              <p>Bei der Preisverleihung des SPIE Rudolf &amp; Hilda Kingslake Awards in Optical Design (von links): Dr. Kafai Lai (SPIE Fellow Member sowie Adjunct Professor an der Universität Hong Kong); Willi Ulrich (Preisträger); Dr. Donis G. Flagello (President und CEO von SPIE Leadership sowie CEO von Nikon Research)</p>
            </div>
          </div>
        </div>
        <div class="text-media-item-vertical grid__structure text-media-item-vertical--fullwidth">
          <div class="grid__column grid__column--100 text-media-item-vertical__media ">
            <div class="media-component">
              <div class="media media--image">
                <figure data-module="LazyImage" class="lazy-image lazy-image--ratio-1_1 lazy-image--position-top lazy-image--loaded">
                  <div class="lazy-image__image-container" data-js-select="LazyImage_image-container">
                    <noscript>
                      <img class="lazy-image__image" src="https://www.zeiss.de/content/dam/z/media/pressphotos/awards-and-events/kingslake-award_willi_ulrich_prev.jpg/_jcr_content/renditions/original.image_file.1440.1440.0,50,1440,1490.file/kingslake-award_willi_ulrich_prev.jpg"/>
                    </noscript>
                    <img class="lazy-image__image lazy-image__target-image " data-js-select="LazyImage_image" src="https://www.zeiss.de/content/dam/z/media/pressphotos/awards-and-events/kingslake-award_willi_ulrich_prev.jpg/_jcr_content/renditions/original.image_file.1440.1440.0,50,1440,1490.file/kingslake-award_willi_ulrich_prev.jpg" data-src="{&quot;xsmall&quot;:&quot;https://www.zeiss.de/content/dam/z/media/pressphotos/awards-and-events/kingslake-award_willi_ulrich_prev.jpg/_jcr_content/renditions/original.image_file.100.100.0,50,1440,1490.file/kingslake-award_willi_ulrich_prev.jpg&quot;,&quot;small&quot;:&quot;https://www.zeiss.de/content/dam/z/media/pressphotos/awards-and-events/kingslake-award_willi_ulrich_prev.jpg/_jcr_content/renditions/original.image_file.360.360.0,50,1440,1490.file/kingslake-award_willi_ulrich_prev.jpg&quot;,&quot;medium&quot;:&quot;https://www.zeiss.de/content/dam/z/media/pressphotos/awards-and-events/kingslake-award_willi_ulrich_prev.jpg/_jcr_content/renditions/original.image_file.768.768.0,50,1440,1490.file/kingslake-award_willi_ulrich_prev.jpg&quot;,&quot;large&quot;:&quot;https://www.zeiss.de/content/dam/z/media/pressphotos/awards-and-events/kingslake-award_willi_ulrich_prev.jpg/_jcr_content/renditions/original.image_file.1024.1024.0,50,1440,1490.file/kingslake-award_willi_ulrich_prev.jpg&quot;,&quot;xlarge&quot;:&quot;https://www.zeiss.de/content/dam/z/media/pressphotos/awards-and-events/kingslake-award_willi_ulrich_prev.jpg/_jcr_content/renditions/original.image_file.1280.1280.0,50,1440,1490.file/kingslake-award_willi_ulrich_prev.jpg&quot;,&quot;xxlarge&quot;:&quot;https://www.zeiss.de/content/dam/z/media/pressphotos/awards-and-events/kingslake-award_willi_ulrich_prev.jpg/_jcr_content/renditions/original.image_file.1440.1440.0,50,1440,1490.file/kingslake-award_willi_ulrich_prev.jpg&quot;,&quot;max&quot;:&quot;https://www.zeiss.de/content/dam/z/media/pressphotos/awards-and-events/kingslake-award_willi_ulrich_prev.jpg/_jcr_content/renditions/original.image_file.1440.1440.0,50,1440,1490.file/kingslake-award_willi_ulrich_prev.jpg&quot;}">
                  </div>
                  <div class="lazy-image__active-image-indicator"></div>
                </figure>
              </div>
            </div>
          </div>
          <div class="grid__column text-media-item-vertical__text ">
            <div class="text text--body-m spacing--s">
              <p>Der ehemalige Zeissianer Willi Ulrich freut sich über die Auszeichnung mit dem Rudolf and Hilda Kingslake Award in Optical Design 2023, der nicht nur ihn persönlich, sondern auch das gesamte ZEISS Team und Management ehrt.<br></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `;
}
export default function decorate(block) {
  const items = [];
  [...block.children].forEach((row) => {
    const picture = row.querySelector('picture');
    const text = document.createElement('p');
    text.innerHTML = row.querySelector('div:last-child');
    const item = {
      picture,
      text,
    };
    items.push(item);
  });
  block.innerHTML = template({ items });
}
