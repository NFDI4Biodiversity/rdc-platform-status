import services from './services.mjs';
import STATUS from './status.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

const TIMEOUT_MS = 10_000;

async function checkService(service) {
   let status = STATUS.UNKNOWN;

   try {
      const res = await fetch(service.checkUrl, { signal: AbortSignal.timeout(TIMEOUT_MS) });
      if (res.status !== 200) {
         status = STATUS.DOWN;
      } if (service.check) {
         status = await service.check(res) || STATUS.UNKNOWN;
      } else {
         // Without check function a 200 response means "UP".
         status = STATUS.UP;
      }
   } catch (err) {
      status = STATUS.UNKNOWN;
   }

   return {
      name: service.name,
      url: service.url,
      status,
   };
};

const results = await Promise.all(services.map(checkService));

const output = {
   generatedAt: new Date().toISOString(),
   services: results,
};

await writeFile('docs/status.json', JSON.stringify(output, null, 2) + '\n');
