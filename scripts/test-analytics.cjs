const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function loadAnalytics() {
  const publicationSource = fs.readFileSync('src/data/publication.ts', 'utf8');
  const publicationContext = { exports: {}, URL };
  vm.runInNewContext(ts.transpileModule(publicationSource, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, publicationContext);
  const source = fs.readFileSync('src/lib/analytics.ts', 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const values = new Map(), events = [], requests = [], beacons = [];
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  let lock = Promise.resolve();
  const context = {
    exports: {}, process: { env: {} }, URL, Intl, Date,
    require: name => { assert.equal(name, '@/data/publication'); return publicationContext.exports; },
    window: { localStorage: storage, dispatchEvent: event => events.push(event) },
    navigator: {
      locks: { request: (_key, callback) => { const next = lock.then(callback); lock = next.catch(() => {}); return next; } },
      sendBeacon: (url, body) => { beacons.push({ url, body }); return true; },
    },
    crypto: { randomUUID: () => `event-${events.length}` },
    CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } },
    fetch: (url, options) => { requests.push({ url, options }); return Promise.resolve({ ok: true }); },
  };
  vm.runInNewContext(code, context);
  return { api: context.exports, publication: publicationContext.exports, context, values, storage, events, requests, beacons };
}

(async () => {
  const { api, publication, context, values, storage, events, requests, beacons } = loadAnalytics();
  const { CLICK_STORAGE_KEY, dateKey, clickSeries, incrementLocalClicks, readLocalClicks, normalizeClickData, totalClicks, clickCsv, trackArxivClick, analyticsConfig, sendClickEvent, httpsEndpoint } = api;
  const { arxivPublication, isArxivPublished } = publication;
  const releasedUrl = 'https://arxiv.org/abs/2601.12345';
  const event = { event: 'arxiv_click', event_id: 'test', occurred_at: '2026-10-14T00:00:00Z', source: 'bottom_cta', destination: releasedUrl };

  values.set('physicalai:arxiv-clicks:v1', JSON.stringify({ version: 1, daily: { '2026-10-14': 4 }, updatedAt: null }));
  analyticsConfig.eventEndpoint = 'https://analytics.example.test/events';
  await trackArxivClick(arxivPublication.url);
  sendClickEvent(event);
  assert.equal(totalClicks(readLocalClicks(storage)), 0, 'Earlier placeholder records must not enter the release count');
  assert.equal(values.has(CLICK_STORAGE_KEY), false, 'Unreleased clicks must not write records');
  assert.equal(events.length + requests.length + beacons.length, 0, 'Unreleased clicks must not dispatch or transmit events');
  arxivPublication.published = true;
  assert.equal(isArxivPublished(), false, 'The placeholder cannot enable tracking even with the release switch on');
  await trackArxivClick(arxivPublication.url);
  assert.equal(values.has(CLICK_STORAGE_KEY), false);
  arxivPublication.url = releasedUrl;
  arxivPublication.published = false;
  await trackArxivClick(releasedUrl);
  assert.equal(values.has(CLICK_STORAGE_KEY), false, 'A real URL alone must not start counting before release');
  arxivPublication.published = true;
  assert.equal(isArxivPublished(), true);
  await trackArxivClick('https://arxiv.org/abs/0000.00000');
  assert.equal(events.length, 0, 'A stale placeholder tab must not start recording');
  analyticsConfig.eventEndpoint = null;

  assert.equal(dateKey(new Date('2026-10-13T15:59:59Z')), '2026-10-13');
  assert.equal(dateKey(new Date('2026-10-13T16:00:00Z')), '2026-10-14');
  incrementLocalClicks(storage, new Date('2026-10-13T15:59:59Z'));
  incrementLocalClicks(storage, new Date('2026-10-13T16:00:00Z'));
  incrementLocalClicks(storage, new Date('2026-10-13T16:01:00Z'));
  assert.equal(readLocalClicks(storage).daily['2026-10-13'], 1);
  assert.equal(readLocalClicks(storage).daily['2026-10-14'], 2);
  assert.equal(totalClicks(readLocalClicks(storage)), 3, 'A new reader must see persisted counts');
  const series = clickSeries(readLocalClicks(storage), 7, new Date('2026-10-13T16:00:00Z'));
  assert.equal(series[0].date, '2026-10-08');
  assert.equal(series[6].date, '2026-10-14');
  assert.equal(series[5].clicks, 1);
  assert.equal(series[6].clicks, 2);
  assert.equal(clickSeries(readLocalClicks(storage), 7, new Date('2027-01-01T01:00:00Z'))[0].date, '2026-12-26');
  assert.equal(clickCsv(readLocalClicks(storage)), 'date,arxiv_clicks\n2026-10-13,1\n2026-10-14,2\n');
  const clean = normalizeClickData({ version: 1, daily: { '2026-02-30': 3, '2026-10-14': 2, '2026-10-15': -1, '2026-10-16': '9', bad: 8 }, updatedAt: 'bad' });
  assert.equal(Object.keys(clean.daily).length, 1);
  assert.equal(clean.daily['2026-10-14'], 2);
  assert.equal(clean.updatedAt, null);
  values.set(CLICK_STORAGE_KEY, 'broken json');
  assert.equal(totalClicks(readLocalClicks(storage)), 0);
  values.delete(CLICK_STORAGE_KEY);

  await Promise.all(Array.from({ length: 5 }, () => trackArxivClick(releasedUrl)));
  assert.equal(totalClicks(readLocalClicks(storage)), 5, 'Concurrent clicks must not overwrite each other');
  assert.equal(events.length, 5);
  assert.equal(events[0].detail.event, 'arxiv_click');
  assert.equal(events[0].detail.source, 'bottom_cta');
  assert.equal(events[0].detail.local_recorded, true);
  assert.equal(requests.length + beacons.length, 0, 'Default tracking must stay browser-local');
  delete context.navigator.locks;
  await trackArxivClick(releasedUrl);
  assert.equal(totalClicks(readLocalClicks(storage)), 6, 'Browsers without Web Locks still record clicks');
  context.window.localStorage = { getItem: () => null, setItem: () => { throw new Error('quota exceeded'); } };
  await assert.doesNotReject(() => trackArxivClick(releasedUrl));
  assert.equal(events.at(-1).detail.local_recorded, false);

  assert.equal(httpsEndpoint('http://example.test/events'), null);
  assert.equal(httpsEndpoint('https://user:secret@example.test/events'), null);
  analyticsConfig.eventEndpoint = 'https://analytics.example.test/events';
  sendClickEvent(event);
  assert.equal(beacons.length, 1);
  assert.equal(JSON.parse(beacons[0].body).event_id, 'test');
  assert.equal(requests.length, 0, 'A queued beacon must not be sent a second time');
  context.navigator.sendBeacon = () => false;
  sendClickEvent(event);
  assert.equal(requests.length, 1);
  assert.equal(requests[0].options.keepalive, true);
  assert.equal(requests[0].options.credentials, 'omit');
  context.fetch = () => Promise.reject(new Error('offline'));
  assert.doesNotThrow(() => sendClickEvent(event));
  analyticsConfig.eventEndpoint = null;
  delete context.window;
  await assert.doesNotReject(() => trackArxivClick(releasedUrl));

  const linkSource = fs.readFileSync('src/components/arxiv-link.tsx', 'utf8');
  const linkCode = ts.transpileModule(linkSource, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const linkContext = { exports: {}, require: name => name === '@/lib/analytics' ? { trackArxivClick: () => { activations++; return Promise.resolve(); } } : require(name) };
  let activations = 0;
  vm.runInNewContext(linkCode, linkContext);
  const link = linkContext.exports.ArxivLink({ href: 'https://arxiv.org/abs/0000.00000', children: 'Read on arXiv' });
  link.props.onClick({ button: 0 }); // Primary click and keyboard activation.
  link.props.onClick({ button: 1 }); // Middle clicks belong only to auxclick.
  link.props.onAuxClick({ button: 1 });
  link.props.onClick({ button: 2 });
  link.props.onAuxClick({ button: 2 });
  assert.equal(activations, 2, 'Primary and middle clicks each count once; right clicks do not count');
  console.log('PASS: release gate, placeholder exclusion, legacy-record isolation, date boundaries, persistence, aggregation, CSV, concurrent clicks, storage failures, transport fallback');
})().catch(error => { console.error(error); process.exitCode = 1; });
