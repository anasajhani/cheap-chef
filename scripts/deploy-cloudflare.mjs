import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const configPath = 'wrangler.generated.json';
const wrangler = ['dlx', 'wrangler@4'];
const bucketName = 'cheap-chef-affordable-media';

function run(args, options = {}) {
  return execFileSync('pnpm', [...wrangler, ...args], {
    encoding: 'utf8',
    stdio: options.capture ? ['ignore', 'pipe', 'inherit'] : 'inherit',
  });
}

const config = {
  $schema: 'node_modules/wrangler/config-schema.json',
  name: 'cheap-chef',
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
    database_name: 'cheap-chef-affordable-db',
    migrations_dir: 'drizzle',
  }],
  r2_buckets: [{ binding: 'MEDIA', bucket_name: bucketName }],
  vars: { AI_DAILY_LIMIT: '20' },
};

writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`, { mode: 0o600 });

const buckets = JSON.parse(run(['r2', 'bucket', 'list', '--json'], { capture: true }));
if (!buckets.some((item) => (item.name || item.bucket_name) === bucketName)) {
  run(['r2', 'bucket', 'create', bucketName]);
}

run(['deploy', '--config', configPath]);
run(['d1', 'migrations', 'apply', 'DB', '--remote', '--config', configPath]);
