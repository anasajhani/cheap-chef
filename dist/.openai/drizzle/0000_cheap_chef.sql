CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  profile TEXT NOT NULL DEFAULT '{}',
  pantry TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE sessions (
  token TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL
);
CREATE TABLE plans (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  data TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE chats (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE usage (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  day TEXT NOT NULL,
  calls INTEGER NOT NULL,
  PRIMARY KEY(user_id, day)
);
CREATE TABLE pending_actions (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  data TEXT NOT NULL,
  plan_id TEXT,
  plan_hash TEXT NOT NULL,
  profile_hash TEXT NOT NULL,
  expires_at TEXT NOT NULL
);
CREATE TABLE store_results (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  data TEXT NOT NULL,
  expires_at TEXT NOT NULL
);
CREATE TABLE rate_limits (
  bucket TEXT PRIMARY KEY,
  count INTEGER NOT NULL,
  expires_at TEXT NOT NULL
);
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);
CREATE INDEX idx_plans_user_created ON plans(user_id, created_at DESC);
CREATE INDEX idx_chats_user_created ON chats(user_id, created_at DESC);
CREATE INDEX idx_pending_actions_expires ON pending_actions(expires_at);
CREATE INDEX idx_store_results_expires ON store_results(expires_at);
CREATE INDEX idx_rate_limits_expires ON rate_limits(expires_at);
PRAGMA optimize;
