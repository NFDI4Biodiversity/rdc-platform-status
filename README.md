# RDC Platform Status

Status page for NFDI4Biodiversity RDC platform services, published via GitHub Pages.

A GitHub Action runs every 30 minutes, checks each service in
[`src/services.mjs`](src/services.mjs), and writes the result to
[`docs/status.json`](docs/status.json), which is committed back to the repo.

## Adding a service

Add an entry to `src/services.mjs`:

```js
{
  name: 'Service name',
  // link shown on the status page
  url: 'https://service.example/',
  // endpoint that is actually queried
  checkUrl: 'https://service.example/health',
  check: async (res) => {
    // optional: inspect `res` and return one of the STATUS values
    // from src/status.mjs (UP, INCIDENT, DOWN, UNKNOWN).
    // If omitted, a 200 response is treated as UP and anything else as DOWN.
  },
},
```

## Running locally

```sh
node src/index.js
```

This writes `docs/status.json` with the current status of all services.
