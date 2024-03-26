import { readFile } from '@web/test-runner-commands';

export default async function loadPlaceholders() {
  const json = JSON.parse(await readFile({ path: '../../resources/placeholders.json' }));
  window.placeholders = window.placeholders || {};
  const placeholders = {};
  const KEY = 'Key';
  const TRANSLATION_KEY = 'translation';

  json.data.forEach((entry) => {
    Object.keys(entry).forEach((localeKey) => {
      if (localeKey !== KEY) {
        if (placeholders[localeKey]) {
          placeholders[localeKey][entry.Key.toLowerCase()] = entry[localeKey];
        } else {
          placeholders[localeKey] = {
            [entry.Key.toLowerCase()]: entry[localeKey],
          };
        }
      }
    });
  });

  window.placeholders[TRANSLATION_KEY] = placeholders;
  window.placeholders[`${TRANSLATION_KEY}-loaded`] = true;
}
