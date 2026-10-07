CREATE TABLE recipe_cache (
  cache_key TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  expires_at TEXT NOT NULL
);

CREATE TABLE saved_recipes (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  meal_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, meal_id)
);

CREATE TABLE recipe_imports (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  source_url TEXT NOT NULL,
  title TEXT NOT NULL,
  ingredients TEXT NOT NULL DEFAULT '[]',
  steps TEXT NOT NULL DEFAULT '[]',
  source_caption TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE community_posts (
  id TEXT PRIMARY KEY,
  community_slug TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipe_id TEXT,
  meal_name TEXT NOT NULL,
  caption TEXT NOT NULL DEFAULT '',
  image_key TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE community_likes (
  post_id TEXT NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (post_id, user_id)
);

CREATE TABLE community_tries (
  community_slug TEXT NOT NULL,
  meal_name TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (community_slug, meal_name, user_id)
);

CREATE INDEX idx_recipe_cache_expires ON recipe_cache(expires_at);
CREATE INDEX idx_saved_recipes_user_created ON saved_recipes(user_id, created_at DESC);
CREATE INDEX idx_recipe_imports_user_created ON recipe_imports(user_id, created_at DESC);
CREATE INDEX idx_community_posts_community_created ON community_posts(community_slug, created_at DESC);
CREATE INDEX idx_community_likes_post ON community_likes(post_id);
CREATE INDEX idx_community_tries_meal ON community_tries(community_slug, meal_name);
