import { PGlite } from '@electric-sql/pglite';
import pg from 'pg';
export async function database({url=process.env.DATABASE_URL, directory=process.env.DATABASE_DIR || '.data'}={}) {
  const db = url ? new pg.Pool({connectionString:url}) : new PGlite(directory);
  await db.query(`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, profile JSONB NOT NULL DEFAULT '{}', pantry JSONB NOT NULL DEFAULT '{}', created_at TIMESTAMPTZ DEFAULT NOW())`);
  await db.query(`CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, expires_at TIMESTAMPTZ NOT NULL)`);
  await db.query(`CREATE TABLE IF NOT EXISTS plans (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, data JSONB NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW())`);
  await db.query(`CREATE TABLE IF NOT EXISTS chats (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, role TEXT NOT NULL, text TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW())`);
  await db.query(`CREATE TABLE IF NOT EXISTS usage (user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, day TEXT NOT NULL, calls INTEGER NOT NULL, PRIMARY KEY(user_id,day))`);
  async function transaction(fn){
    if(!url)return db.transaction(tx=>fn({query:(...args)=>tx.query(...args)}));
    const client=await db.connect();
    try{await client.query('BEGIN');const result=await fn(client);await client.query('COMMIT');return result;}
    catch(e){await client.query('ROLLBACK');throw e;}finally{client.release();}
  }
  return {query:(...args)=>db.query(...args),transaction,close:()=>url?db.end():db.close()};
}
