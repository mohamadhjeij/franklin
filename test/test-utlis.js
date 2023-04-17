import { readFile } from '@web/test-runner-commands';

const { toCamelCase } = await import('../scripts/lib-franklin.js');

export default async function loadPlaceholders(locale) {
  const json = JSON.parse(await readFile({ path: `../../resources/${locale}/placeholders.json` }));
  window.placeholders = window.placeholders || {};
  const placeholders = {};
  json.data.forEach((placeholder) => {
    placeholders[toCamelCase(placeholder.Key)] = placeholder.Text;
  });
  window.placeholders[locale] = placeholders;
  window.placeholders[`${locale}-loaded`] = true;
}
