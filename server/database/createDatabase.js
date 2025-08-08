import db from './connection.js';

// Determine if delete mode is active from command-line arguments
const deleteMode = process.argv.includes("--delete");

if (deleteMode) {
    console.log("Delete mode active: Dropping existing tables...");
    await db.run(`DROP TABLE IF EXISTS users;`);
    await db.run(`DROP TABLE IF EXISTS creature_drops;`);
    await db.run(`DROP TABLE IF EXISTS object_drops;`);
    await db.run(`DROP TABLE IF EXISTS creatures;`);
    await db.run(`DROP TABLE IF EXISTS objects;`);
    await db.run(`DROP TABLE IF EXISTS zones;`);
    await db.run(`DROP TABLE IF EXISTS vendor_materials;`);
    await db.run(`DROP TABLE IF EXISTS items;`);
    await db.run(`DROP TABLE IF EXISTS profession_materials;`);
    await db.run(`DROP TABLE IF EXISTS professions;`);
    await db.run(`DROP TABLE IF EXISTS specializations;`);
    await db.run(`DROP TABLE IF EXISTS cooldowns;`);
    await db.run(`DROP TABLE IF EXISTS ability_to_cooldowns`);
    await db.run(`DROP TABLE IF EXISTS effect_to_states;`);
    await db.run(`DROP TABLE IF EXISTS ability_to_states;`);
    await db.run(`DROP TABLE IF EXISTS states;`);
    await db.run(`DROP TABLE IF EXISTS effect_to_triggered_effects;`);
    await db.run(`DROP TABLE IF EXISTS ability_to_effects;`);
    await db.run(`DROP TABLE IF EXISTS ability_effects;`);
    await db.run(`DROP TABLE IF EXISTS abilities;`);
    await db.run(`DROP TABLE IF EXISTS class_stats;`);
    await db.run(`DROP TABLE IF EXISTS classes;`);
    await db.run(`DROP TABLE IF EXISTS stats;`);
    console.log("Old tables dropped (if they existed).");
}

await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    );
`);

await db.exec(`
    -- Table for 'stats' (core character attributes like Strength, Agility)
    CREATE TABLE IF NOT EXISTS stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        archetype TEXT -- "Strength", "Agility", "Intelligence"
    );
`);

await db.exec(`
    -- Table for 'classes'
    CREATE TABLE IF NOT EXISTS classes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        archetype TEXT, -- "Strength", "Agility", "Intelligence"
        offensive_mult REAL DEFAULT 1,
        defensive_mult REAL DEFAULT 1
    );
`);

await db.exec(`
    CREATE TABLE IF NOT EXISTS class_stats (
        class_id INTEGER NOT NULL,
        stat_id INTEGER NOT NULL,
        base_value INTEGER DEFAULT 0,
        per_level_gain INTEGER DEFAULT 0,
        PRIMARY KEY (class_id, stat_id),
        FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
        FOREIGN KEY (stat_id) REFERENCES stats(id) ON DELETE CASCADE
    );
`);

await db.exec(`
    CREATE TABLE IF NOT EXISTS cooldowns (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL UNIQUE,      -- "One-Handed Global Cooldown", "Two-Handed Global Cooldown"
        duration REAL NOT NULL DEFAULT 1.5
    );
`);

await db.run(`
    CREATE TABLE IF NOT EXISTS resources (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        default_max_value REAL NOT NULL,
        default_regen_rate REAL NOT NULL
    );
`);

await db.run(`
    -- This table links classes to the resources they use.
    CREATE TABLE IF NOT EXISTS class_resources (
        class_id INTEGER NOT NULL,
        resource_id INTEGER NOT NULL,
        PRIMARY KEY (class_id, resource_id),
        FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
        FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE
    );
`);

await db.exec(`
    CREATE TABLE IF NOT EXISTS abilities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        class_id INTEGER NOT NULL,
        spec_id INTEGER,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        archetype TEXT,
        level_req INTEGER,
        ability_type TEXT,
        cooldown REAL DEFAULT 0,
        resource_id INTEGER,
        resource_cost INTEGER DEFAULT 0,
        cast_time REAL DEFAULT 0,
        range INTEGER DEFAULT 0,
        hand_required TEXT,
        school TEXT,
        positional_req TEXT,
        FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
        FOREIGN KEY (spec_id) REFERENCES specializations(id) ON DELETE SET NULL,
        FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE SET NULL
    );
`);

await db.exec(`
    CREATE TABLE IF NOT EXISTS ability_to_cooldowns (
        ability_id INTEGER NOT NULL,
        cooldown_id INTEGER NOT NULL,
        PRIMARY KEY (ability_id, cooldown_id),
        FOREIGN KEY (ability_id) REFERENCES abilities(id) ON DELETE CASCADE,
        FOREIGN KEY (cooldown_id) REFERENCES cooldowns(id) ON DELETE CASCADE
    ); 
`);

await db.exec(`
    CREATE TABLE IF NOT EXISTS ability_effects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        effect_type TEXT,
        school TEXT,
        value REAL DEFAULT 0,
        value_per_level REAL DEFAULT 0,
        tick_rate REAL DEFAULT 0,
        duration REAL DEFAULT 0,
        scaling_type TEXT,                            -- "magical", "physical", "none"
        scaling_value REAL DEFAULT 0,
        is_stackable INTEGER DEFAULT 0,
        is_removable INTEGER DEFAULT 1,
        applied_state_id INTEGER,
        FOREIGN KEY (applied_state_id) REFERENCES states(id) ON DELETE SET NULL
    );
`);

await db.exec(`
    CREATE TABLE IF NOT EXISTS ability_to_effects (
        ability_id INTEGER NOT NULL,
        effect_id INTEGER NOT NULL,
        order_index INTEGER DEFAULT 0,              -- Defines the order of multiple effects
        delay_seconds REAL DEFAULT 0,               -- Defines the delay before this effect triggers
        PRIMARY KEY (ability_id, effect_id),
        FOREIGN KEY (ability_id) REFERENCES abilities(id) ON DELETE CASCADE,
        FOREIGN KEY (effect_id) REFERENCES ability_effects(id) ON DELETE CASCADE
    );
`);

await db.exec(`
    CREATE TABLE IF NOT EXISTS effect_to_triggered_effects (
        source_effect_id INTEGER NOT NULL,
        triggered_effect_id INTEGER NOT NULL,
        order_index INTEGER DEFAULT 0,              -- Defines the order of chained effects
        delay_seconds REAL DEFAULT 0,               -- Defines the delay before the triggered effect fires
        PRIMARY KEY (source_effect_id, triggered_effect_id),
        FOREIGN KEY (source_effect_id) REFERENCES ability_effects(id) ON DELETE CASCADE,
        FOREIGN KEY (triggered_effect_id) REFERENCES ability_effects(id) ON DELETE CASCADE
    );
`);

await db.exec(`
    CREATE TABLE IF NOT EXISTS states (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,      -- e.g., "Cat Form", "Defensive Stance", "Stealth"
        description TEXT
    );
`);

await db.exec(`
    CREATE TABLE IF NOT EXISTS ability_to_states (
        ability_id INTEGER NOT NULL,
        state_id INTEGER NOT NULL,
        PRIMARY KEY (ability_id, state_id),
        FOREIGN KEY (ability_id) REFERENCES abilities(id) ON DELETE CASCADE,
        FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE CASCADE
    );
`);

await db.exec(`
    CREATE TABLE IF NOT EXISTS effect_to_states (
        effect_id INTEGER NOT NULL,
        state_id INTEGER NOT NULL,
        PRIMARY KEY (effect_id, state_id),
        FOREIGN KEY (effect_id) REFERENCES ability_effects(id) ON DELETE CASCADE,
        FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE CASCADE
    );
`);

await db.exec(`
    CREATE TABLE IF NOT EXISTS specializations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        class_id INTEGER NOT NULL,                      
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        archetype TEXT,                                 
        FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
    );
`);

await db.exec(`
    -- Table: 'professions'
    CREATE TABLE IF NOT EXISTS professions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT
    );
`);

await db.exec(`
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        type TEXT NOT NULL, -- E.g., "Weapon", "Armor", "Jewellery", "Backpack", "Storage Ring"
        subtype TEXT, -- E.g., "Long Sword", "Medium Armor", "Ring"
        item_slot TEXT, -- E.g., "Main Hand", "Head", "Finger", "Back"
        archetype TEXT, -- "Strength", "Agility" or "Intelligence"
        weight REAL DEFAULT 0.0,

        -- rarity is defining how good the item is
        rarity TEXT,    -- if crafted :      "Novice",   "Apprentice",   "Experienced",  "Expert",   "Master"
                        -- if not crafted:   "Common",   "Uncommon",     "Rare",         "Epic",     "Legendary"

        -- lore_text is lore for unique items. most items from dungeons and raids are unique, but crafted items are not.
        is_unique BOOLEAN,
        lore_text TEXT,
        
        -- Flag to indicate if it was crafted
        is_crafted BOOLEAN DEFAULT 0, -- 1 for crafted, 0 for found/pre-defined
        
        -- Material Links (nullable, only populated if is_crafted = 1)
        material_1_id INTEGER REFERENCES profession_materials(id) DEFAULT NULL,
        material_2_id INTEGER REFERENCES profession_materials(id) DEFAULT NULL,
        material_3_id INTEGER REFERENCES profession_materials(id) DEFAULT NULL,
        material_4_id INTEGER REFERENCES profession_materials(id) DEFAULT NULL,
        material_5_id INTEGER REFERENCES profession_materials(id) DEFAULT NULL,
        material_6_id INTEGER REFERENCES profession_materials(id) DEFAULT NULL,

        material_1_name TEXT REFERENCES profession_materials(name) DEFAULT NULL,
        material_2_name TEXT REFERENCES profession_materials(name) DEFAULT NULL,
        material_3_name TEXT REFERENCES profession_materials(name) DEFAULT NULL,
        material_4_name TEXT REFERENCES profession_materials(name) DEFAULT NULL,
        material_5_name TEXT REFERENCES profession_materials(name) DEFAULT NULL,
        material_6_name TEXT REFERENCES profession_materials(name) DEFAULT NULL,
        
        -- Stat Requirements (derived from materials for crafted, set directly for found)
        strength_requirement INTEGER DEFAULT 0,
        agility_requirement INTEGER DEFAULT 0,
        intelligence_requirement INTEGER DEFAULT 0,

        -- Stat Bonuses (final values on the item)
        -- Strength
        strength INTEGER DEFAULT 0,
        stamina INTEGER DEFAULT 0,
        endurance INTEGER DEFAULT 0,
        conditioning INTEGER DEFAULT 0,
        toughness INTEGER DEFAULT 0,
        -- Agility
        agility INTEGER DEFAULT 0,
        dexterity INTEGER DEFAULT 0,
        celerity INTEGER DEFAULT 0,
        grace INTEGER DEFAULT 0,
        -- Intelligence
        intelligence INTEGER DEFAULT 0,
        acuity INTEGER DEFAULT 0,
        alacrity INTEGER DEFAULT 0,
        clarity INTEGER DEFAULT 0,
        essence INTEGER DEFAULT 0,
        spirit INTEGER DEFAULT 0,
        aura INTEGER DEFAULT 0,
        
        -- Combat/Defensive Properties (final values on the item)
        armor INTEGER DEFAULT 0,
        magic_resistance INTEGER DEFAULT 0,
        physical_resistance INTEGER DEFAULT 0,
        dps REAL DEFAULT 0.0,
        dps_percent REAL DEFAULT 0.0,
        attack_speed REAL DEFAULT 0.0,
        attack_speed_percent REAL DEFAULT 0.0,
        critical_strike_chance REAL DEFAULT 0.0,
        critical_strike_damage REAL DEFAULT 0.0,
        block_chance REAL DEFAULT 0.0,
        block_value INTEGER DEFAULT 0,
        dodge_chance REAL DEFAULT 0.0,
        parry_chance REAL DEFAULT 0.0,
        parry_value INTEGER DEFAULT 0,
        deflection_chance REAL DEFAULT 0.0,
        deflection_value INTEGER DEFAULT 0,
        aura_value INTEGER DEFAULT 0,

        -- Special Attributes
        active_effects TEXT, -- Combined effects from materials or unique item effect
        enchantment TEXT,
        padding TEXT, -- Specific to armor
        oil TEXT -- Specific to weapon
    );
`);

await db.exec(`
    CREATE TABLE IF NOT EXISTS profession_materials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        rarity TEXT,
        type TEXT, -- E.g., "Botanical", "Ore", "Leather"
        subtype TEXT,
        weight REAL DEFAULT 0.0, -- NEW: Weight of the material

        -- Stat Bonuses (flat values)
        -- Strength
        strength_bonus INTEGER DEFAULT 0,
        stamina_bonus INTEGER DEFAULT 0,
        endurance_bonus INTEGER DEFAULT 0,
        conditioning_bonus INTEGER DEFAULT 0,
        toughness_bonus INTEGER DEFAULT 0,

        -- Agility
        agility_bonus INTEGER DEFAULT 0,
        dexterity_bonus INTEGER DEFAULT 0,
        celerity_bonus INTEGER DEFAULT 0,
        grace_bonus INTEGER DEFAULT 0,

        -- Intelligence
        intelligence_bonus INTEGER DEFAULT 0,
        acuity_bonus INTEGER DEFAULT 0,
        alacrity_bonus INTEGER DEFAULT 0,
        clarity_bonus INTEGER DEFAULT 0,
        essence_bonus INTEGER DEFAULT 0,
        spirit_bonus INTEGER DEFAULT 0,
        aura_bonus INTEGER DEFAULT 0,

        -- Stat Bonuses (percentage values, primarily for catalysts)
        strength_percent_bonus REAL DEFAULT 0.0,
        agility_percent_bonus REAL DEFAULT 0.0,
        intelligence_percent_bonus REAL DEFAULT 0.0,

        -- Innate material statistics
        armor_flat_bonus INTEGER DEFAULT 0,
        armor_percent_bonus REAL DEFAULT 0.0,
        magic_resistance_bonus INTEGER DEFAULT 0,
        physical_resistance_bonus INTEGER DEFAULT 0,
        dps_bonus REAL DEFAULT 0.0,
        dps_percent_bonus REAL DEFAULT 0.0,
        attack_speed_bonus REAL DEFAULT 0.0,
        attack_speed_percent_bonus REAL DEFAULT 0.0,
        crit_chance_bonus REAL DEFAULT 0.0,
        crit_damage_bonus REAL DEFAULT 0.0,
        block_chance_bonus REAL DEFAULT 0.0,
        block_value_bonus INTEGER DEFAULT 0,
        dodge_chance_bonus REAL DEFAULT 0.0,
        parry_chance_bonus REAL DEFAULT 0.0,
        parry_value_bonus INTEGER DEFAULT 0,
        deflection_chance_bonus REAL DEFAULT 0.0,
        deflection_value_bonus INTEGER DEFAULT 0,
        aura_value_bonus INTEGER DEFAULT 0,

        -- Special Attributes
        active_effect_text TEXT, -- Describes any special effects
        lore_text TEXT
    );
`);

await db.exec(`
    CREATE TABLE IF NOT EXISTS vendor_materials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        rarity TEXT,
        type TEXT
    );
`);

await db.exec(`
    CREATE TABLE IF NOT EXISTS zones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        recommended_level_min INTEGER,
        recommended_level_max INTEGER,
        type TEXT, 
        lore_text TEXT
    );
`);

await db.exec(`
    CREATE TABLE IF NOT EXISTS creatures (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        level INTEGER,
        health INTEGER,
        attack INTEGER,
        defense INTEGER,
        type TEXT,
        zone_id INTEGER REFERENCES zones(id) NOT NULL, -- Foreign key to zones table
        xp_reward INTEGER
    );
`);

await db.exec(`
    CREATE TABLE IF NOT EXISTS objects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        type TEXT, -- E.g., "Container", "Resource Node", "Interactable"
        zone_id INTEGER REFERENCES zones(id) NOT NULL, -- Foreign key to zones table
        respawn_time_seconds INTEGER, -- For resource nodes/chests
        requires_key BOOLEAN DEFAULT 0, -- E.g., for locked chests
        min_skill_level INTEGER DEFAULT 0, -- E.g., for mining/herbalism
        lore_text TEXT
    );
`);

await db.exec(`
    -- Links creatures to the items they can drop, with drop chances and quantities.
    CREATE TABLE IF NOT EXISTS creature_drops (
        creature_id INTEGER NOT NULL REFERENCES creatures(id),
        item_id INTEGER NOT NULL REFERENCES items(id),
        drop_chance_percent REAL NOT NULL, -- E.g., 0.05 for 5%, 1.0 for 100%
        min_quantity INTEGER DEFAULT 1,
        max_quantity INTEGER DEFAULT 1,
        PRIMARY KEY (creature_id, item_id) -- Composite primary key to ensure unique drop rules per creature-item pair
    );
`);

await db.exec(`
    -- Links objects to the items they can drop, with drop chances and quantities.
    CREATE TABLE IF NOT EXISTS object_drops (
        object_id INTEGER NOT NULL REFERENCES objects(id),
        item_id INTEGER NOT NULL REFERENCES items(id),
        drop_chance_percent REAL NOT NULL,
        min_quantity INTEGER DEFAULT 1,
        max_quantity INTEGER DEFAULT 1,
        PRIMARY KEY (object_id, item_id) -- Composite primary key to ensure unique drop rules per object-item pair
    );
`);

console.log("Database schema created or verified.");

// Important: Close the database connection when done
db.close((err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Database connection closed.');
    }
});
