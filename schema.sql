-- schema.sql

-- Table to store core user account information.
CREATE TABLE Players (
    id TEXT PRIMARY KEY, -- Unique player identifier (e.g., from an auth provider)
    email TEXT UNIQUE NOT NULL, -- Player's email for identification
    created_at INTEGER NOT NULL -- Timestamp of account creation (Unix epoch)
);

-- Table to store the dynamic state of each player's character.
CREATE TABLE PlayerState (
    player_id TEXT PRIMARY KEY,
    nakshatra_id INTEGER NOT NULL, -- ID corresponding to one of the 27 Nakshatras (1-27)
    karma_score INTEGER NOT NULL DEFAULT 0,
    dharmic_profile TEXT DEFAULT '''{}''', -- JSON object to store dharmic affinities, e.g., '''{"kula_dharma": 10}'''
    current_location_id INTEGER, -- Foreign key to a (future) Locations table
    active_quests TEXT, -- JSON array of active quest IDs, e.g., '["q1_main", "q5_side"]'
    FOREIGN KEY (player_id) REFERENCES Players(id) ON DELETE CASCADE
);

-- Table to manage player inventories.
CREATE TABLE PlayerInventory (
    player_id TEXT NOT NULL,
    item_id INTEGER NOT NULL, -- Foreign key to a (future) Items table
    quantity INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY (player_id, item_id),
    FOREIGN KEY (player_id) REFERENCES Players(id) ON DELETE CASCADE
);

-- Table to store persistent conversation histories with NPCs for the AI memory system.
CREATE TABLE NPC_Conversations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id TEXT NOT NULL,
    npc_id TEXT NOT NULL, -- Unique identifier for the NPC (e.g., 'rishi_vashistha')
    history TEXT NOT NULL, -- JSON array storing conversation turns, e.g., '[{"role": "user", "content": "..."},...]'
    last_updated INTEGER NOT NULL,
    UNIQUE (player_id, npc_id),
    FOREIGN KEY (player_id) REFERENCES Players(id) ON DELETE CASCADE
);