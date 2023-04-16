# Zeiss Franklin POC
POC for Zeiss

## Environments
- Preview: https://main--zeiss--hlxsites.hlx.page/de/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/zeiss-trumpf-und-fraunhofer-mit-deutschem-zukunftspreis-ausgezeichnet
- Live: https://main--zeiss--hlxsites.hlx.live/de/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/zeiss-trumpf-und-fraunhofer-mit-deutschem-zukunftspreis-ausgezeichnet

## Installation

```sh
npm i
```

## Tests

```sh
npm tst
```
### Debugging tests
```sh
npm run test:watch
```
Or to debug a specific test
```sh
npm i -g --save-dev @web/test-runner
web-test-runner test/blocks/hero/hero.test.js --node-resolve --watch
```
[Refer here for more details](https://modern-web.dev/guides/test-runner/watch-and-debug/)

## Local development

1. Install the [Helix CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/helix-cli`
1. Start Helix Pages Proxy: `hlx up` (opens your browser at `http://localhost:3000`)
1. Go to http://localhost:3000/de/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/zeiss-trumpf-und-fraunhofer-mit-deutschem-zukunftspreis-ausgezeichnet
1. Open the `{repo}` directory in your favorite IDE and start coding :)
