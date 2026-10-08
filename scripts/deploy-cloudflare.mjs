import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const databaseName = 'cheap-chef-affordable-db';
const bucketName = 'cheap-chef-affordable-media';
const configPath = 'wrangler.generated.json';
const wrangler = ['dlx', 'wrangler@4'];

function run(args, options = {}) {
  return execFileSync('pnpm', [...wrangler, ...args], {
    encoding: 'utf8',
    stdio: options.capture ? ['ignore', 'pipe', 'inherit'] : 'inherit',
  });
}

if (!process.env.CLOUDFLARE_API_TOKEN || !process.env.CLOUDFLARE_ACCOUNT_ID) {
  throw new Error('Cloudflare deployment credentials are not available to the build.');
}

let databases = JSON.parse(run(['d1', 'list', '--json'], { capture: true }));
let database = databases.find((item) => item.name === databaseName);
if (!database) {
  run(['d1', 'create', databaseName, '--location', 'enam']);
  databases = JSON.parse(run(['d1', 'list', '--json'], { capture: true }));
  database = databases.find((item) => item.name === databaseName);
}
if (!database?.uuid) throw new Error('Cloudflare D1 database could not be created or located.');

let buckets = [];
try {
  buckets = JSON.parse(run(['r2', 'bucket', 'list', '--json'], { capture: true }));
} catch {
  // Older Wrangler output may not support JSON. Creating an existing bucket is harmlessly retried below.
}
if (!buckets.some((item) => (item.name || item.bucket_name) === bucketName)) {
  try { run(['r2', 'bucket', 'create', bucketName, '--location', 'enam']); }
  catch (error) {
    if (!String(error?.message || '').toLowerCase().includes('already')) throw error;
  }
}

const config = {
  $schema: 'node_modules/wrangler/config-schema.json',
  name: 'cheap-chef-affordable',
  main: 'dist/server/index.js',
  compatibility_date: '2026-10-08',
  assets: {
    directory: 'dist/client',
    binding: 'ASSETS',
    not_found_handling: 'single-page-application',
    run_worker_first: ['/api/*'],
  },
  d1_databases: [{
    binding: 'DB',
    database_name: databaseName,
    database_id: database.uuid,
    migrations_dir: 'drizzle',
  }],
  r2_buckets: [{ binding: 'MEDIA', bucket_name: bucketName }],
  vars: { AI_DAILY_LIMIT: '20' },
};

writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`, { mode: 0o600 });
run(['d1', 'migrations', 'apply', databaseName, '--remote', '--config', configPath]);
run(['deploy', '--config', configPath]);
