import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const configPath = 'wrangler.generated.json';
const wrangler = ['dlx', 'wrangler@4'];

function run(args, options = {}) {
  return execFileSync('pnpm', [...wrangler, ...args], {
    encoding: 'utf8',
    stdio: options.capture ? ['ignore', 'pipe', 'inherit'] : 'inherit',
  });
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
    database_name: 'cheap-chef-affordable-db',
    migrations_dir: 'drizzle',
  }],
  r2_buckets: [{ binding: 'MEDIA' }],
  vars: { AI_DAILY_LIMIT: '20' },
};

writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`, { mode: 0o600 });
run(['d1', 'migrations', 'apply', 'DB', '--remote', '--config', configPath]);
run(['deploy', '--config', configPath]);
