import db from './connection.js';

// Determine if delete mode is active from command-line arguments
const deleteMode = process.argv.includes("--delete");

if (deleteMode) {
    console.log("Delete mode active: Dropping existing tables...");
    // Drop tables in reverse order of dependency to respect foreign key constraints
    await db.run(`DROP TABLE IF EXISTS specialization_abilities;`);
    await db.run(`DROP TABLE IF EXISTS specializations;`);
    await db.run(`DROP TABLE IF EXISTS class_abilities;`);
    await db.run(`DROP TABLE IF EXISTS classes;`);
    await db.run(`DROP TABLE IF EXISTS stats;`);
    await db.run(`DROP TABLE IF EXISTS items;`); // items must be dropped after its foreign key dependents
    console.log("Old tables dropped (if they existed).");
}

// DDL (Data Definition Language) - Create Tables
await db.exec(`
    -- Table for 'stats' (core character attributes like Strength, Agility)
    CREATE TABLE IF NOT EXISTS stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        archetype TEXT -- E.g., "Physical", "Mental", "Social"
    );

    -- Table for 'classes' (e.g., character classes like Warrior, Mage)
    CREATE TABLE IF NOT EXISTS classes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        archetype TEXT -- E.g., "Melee DPS", "Spellcaster"
    );

    -- Table for 'class_abilities' (abilities directly tied to a class)
    CREATE TABLE IF NOT EXISTS class_abilities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        class_id INTEGER NOT NULL,              -- Foreign Key linking to classes table
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        archetype TEXT,                         -- E.g., "Active", "Passive"
        FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
    );

    -- Table for 'specializations' (sub-classes or specific paths within a class)
    CREATE TABLE IF NOT EXISTS specializations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        class_id INTEGER NOT NULL,              -- Foreign Key linking to classes table
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        archetype TEXT,                         -- E.g., "Berserker", "Pyromancer"
        FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
    );

    -- Table for 'specialization_abilities' (abilities tied to a specific specialization)
    CREATE TABLE IF NOT EXISTS specialization_abilities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        specialization_id INTEGER NOT NULL,     -- Foreign Key linking to specializations table
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        archetype TEXT,                         -- E.g., "Ultimate", "Buff"
        FOREIGN KEY (specialization_id) REFERENCES specializations(id) ON DELETE CASCADE
    );

    -- Table: 'items' (consolidated for all item types)
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        archetype TEXT,
        rarity TEXT,
        armor INTEGER,
        block_chance REAL,   -- New Column
        block_value INTEGER, -- New Column
        dps REAL, -- Changed from TEXT to REAL
        speed REAL,
        type TEXT, -- E.g., "Weapon", "Armor", "Jewellery"
        subtype TEXT, -- New Column (e.g., "Sword", "Helmet", "Ring")
        strength_requirement INTEGER,
        agility_requirement INTEGER,
        intelligence_requirement INTEGER,
        active_effects TEXT,
        enchantment TEXT,
        padding TEXT, -- Specific to armor
        weapon_oil TEXT, -- Specific to weapon
        lore_text TEXT
    );
`);

console.log("Database schema created or verified.");

// DML (Data Manipulation Language) - Seeding (initial data)
// Using INSERT OR IGNORE to handle cases where data might already exist due to previous runs.

console.log("Mechanics insertion removed as requested.");

// Example: Inserting Stats
await db.run('INSERT OR IGNORE INTO stats (name, description, archetype) VALUES (?, ?, ?);', 'Strength', 'Measures physical power.', 'Physical');
await db.run('INSERT OR IGNORE INTO stats (name, description, archetype) VALUES (?, ?, ?);', 'Agility', 'Measures quickness and reflexes.', 'Physical');
await db.run('INSERT OR IGNORE INTO stats (name, description, archetype) VALUES (?, ?, ?);', 'Intelligence', 'Measures mental prowess.', 'Mental');
console.log(`Inserted Stats.`);

// Removed Example: Inserting Sub Stats linked to Stats
console.log("Sub Stats insertion removed as requested.");

// Example: Inserting Classes
await db.run('INSERT OR IGNORE INTO classes (name, description, archetype) VALUES (?, ?, ?);', 'Warrior', 'A master of melee combat, focusing on strength and endurance.', 'Melee DPS');
await db.run('INSERT OR IGNORE INTO classes (name, description, archetype) VALUES (?, ?, ?);', 'Rogue', 'A stealthy fighter specializing in swift attacks and evasion.', 'Melee DPS');
await db.run('INSERT OR IGNORE INTO classes (name, description, archetype) VALUES (?, ?, ?);', 'Mage', 'Wields elemental magic to deal damage from afar.', 'Spellcaster');
console.log(`Inserted Classes.`);

// Example: Inserting Class Abilities
// Fetch class IDs if they already exist
const warriorRow = await db.get('SELECT id FROM classes WHERE name = ?;', 'Warrior');
const rogueRow = await db.get('SELECT id FROM classes WHERE name = ?;', 'Rogue');
const mageRow = await db.get('SELECT id FROM classes WHERE name = ?;', 'Mage');

const currentWarriorClassId = warriorRow ? warriorRow.id : null;
const currentRogueClassId = rogueRow ? rogueRow.id : null;
const currentMageClassId = mageRow ? mageRow.id : null;

if (currentWarriorClassId) {
    await db.run('INSERT OR IGNORE INTO class_abilities (class_id, name, description, archetype) VALUES (?, ?, ?, ?);', currentWarriorClassId, 'Charge', 'Rushes to an enemy, stunning them.', 'Active');
    await db.run('INSERT OR IGNORE INTO class_abilities (class_id, name, description, archetype) VALUES (?, ?, ?, ?);', currentWarriorClassId, 'Battle Shout', 'Increases attack power for a short duration.', 'Buff');
} else { console.log('Warrior class not found for Class Abilities insertion.'); }
if (currentRogueClassId) {
    await db.run('INSERT OR IGNORE INTO class_abilities (class_id, name, description, archetype) VALUES (?, ?, ?, ?);', currentRogueClassId, 'Stealth', 'Enters a hidden state, becoming undetectable.', 'Active');
} else { console.log('Rogue class not found for Class Abilities insertion.'); }
if (currentMageClassId) {
    await db.run('INSERT OR IGNORE INTO class_abilities (class_id, name, description, archetype) VALUES (?, ?, ?, ?);', currentMageClassId, 'Arcane Missiles', 'Fires a volley of arcane projectiles.', 'Active');
} else { console.log('Mage class not found for Class Abilities insertion.'); }
console.log("Inserted Class Abilities.");

// Example: Inserting Specializations
// Fetch class IDs if they already exist
const currentWarriorClassIdForSpec = warriorRow ? warriorRow.id : null;
const currentMageClassIdForSpec = mageRow ? mageRow.id : null;

if (currentWarriorClassIdForSpec) {
    await db.run('INSERT OR IGNORE INTO specializations (class_id, name, description, archetype) VALUES (?, ?, ?, ?);', currentWarriorClassIdForSpec, 'Arms Warrior', 'Focuses on two-handed weapons and powerful strikes.', 'Weapon Master');
    await db.run('INSERT OR IGNORE INTO specializations (class_id, name, description, archetype) VALUES (?, ?, ?, ?);', currentWarriorClassIdForSpec, 'Fury Warrior', 'Dual-wields weapons in a frenzied assault.', 'Dual-Wielding');
} else { console.log('Warrior class not found for Specializations insertion.'); }

if (currentMageClassIdForSpec) {
    await db.run('INSERT OR IGNORE INTO specializations (class_id, name, description, archetype) VALUES (?, ?, ?, ?);', currentMageClassIdForSpec, 'Fire Mage', 'Specializes in fire spells and explosive damage.', 'Elemental');
} else { console.log('Mage class not found for Specializations insertion.'); }
console.log(`Inserted Specializations.`);

// Example: Inserting Specialization Abilities
// Fetch specialization IDs if they already exist
const armsWarriorRow = await db.get('SELECT id FROM specializations WHERE name = ?;', 'Arms Warrior');
const furyWarriorRow = await db.get('SELECT id FROM specializations WHERE name = ?;', 'Fury Warrior');
const fireMageRow = await db.get('SELECT id FROM specializations WHERE name = ?;', 'Fire Mage');

const currentArmsWarriorSpecId = armsWarriorRow ? armsWarriorRow.id : null;
const currentFuryWarriorSpecId = furyWarriorRow ? furyWarriorRow.id : null;
const currentFireMageSpecId = fireMageRow ? fireMageRow.id : null;

if (currentArmsWarriorSpecId) {
    await db.run('INSERT OR IGNORE INTO specialization_abilities (specialization_id, name, description, archetype) VALUES (?, ?, ?, ?);', currentArmsWarriorSpecId, 'Mortal Strike', 'A devastating blow that inflicts a healing reduction.', 'Key Ability');
} else { console.log('Arms Warrior specialization not found for Specialization Abilities insertion.'); }
if (currentFuryWarriorSpecId) {
    await db.run('INSERT OR IGNORE INTO specialization_abilities (specialization_id, name, description, archetype) VALUES (?, ?, ?, ?);', currentFuryWarriorSpecId, 'Rampage', 'Unleashes a series of quick, powerful attacks.', 'Rage Spender');
} else { console.log('Fury Warrior specialization not found for Specialization Abilities insertion.'); }
if (currentFireMageSpecId) {
    await db.run('INSERT OR IGNORE INTO specialization_abilities (specialization_id, name, description, archetype) VALUES (?, ?, ?, ?);', currentFireMageSpecId, 'Pyroblast', 'Launches a massive fireball, igniting the target.', 'High Damage');
} else { console.log('Fire Mage specialization not found for Specialization Abilities insertion.'); }
console.log("Inserted Specialization Abilities.");

// DML: Inserting Items (Armor, Weapons, Jewellery consolidated)
// Iron Sword
await db.run('INSERT OR IGNORE INTO items (name, description, archetype, rarity, armor, block_chance, block_value, dps, speed, type, subtype, strength_requirement, agility_requirement, intelligence_requirement, active_effects, enchantment, padding, weapon_oil, lore_text) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
    'Iron Sword', 'A sturdy, basic sword.', 'Melee', 'Common', null, null, null, 4.5, 1.2, 'Weapon', 'Sword', 10, 0, 0, null, null, null, null, 'Forged by local blacksmiths.');
console.log(`Inserted Iron Sword.`);

// Leather Vest
await db.run('INSERT OR IGNORE INTO items (name, description, archetype, rarity, armor, block_chance, block_value, dps, speed, type, subtype, strength_requirement, agility_requirement, intelligence_requirement, active_effects, enchantment, padding, weapon_oil, lore_text) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
    'Leather Vest', 'Light and flexible leather armor.', 'Light', 'Common', 5, null, null, null, null, 'Armor', 'Chest', 0, 8, 0, null, null, 'Soft leather lining', null, 'Used by scouts and rogues.');
console.log(`Inserted Leather Vest.`);

// Staff of Arcane Power
await db.run('INSERT OR IGNORE INTO items (name, description, archetype, rarity, armor, block_chance, block_value, dps, speed, type, subtype, strength_requirement, agility_requirement, intelligence_requirement, active_effects, enchantment, padding, weapon_oil, lore_text) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
    'Staff of Arcane Power', 'A staff imbued with raw magical energy.', 'Magic', 'Uncommon', null, null, null, 7.0, 0.8, 'Weapon', 'Staff', 0, 0, 15, 'Increased spell damage', 'Arcane Burst', null, null, 'Once wielded by a powerful archmage.');
console.log(`Inserted Staff of Arcane Power.`);

// Chainmail Armor
await db.run('INSERT OR IGNORE INTO items (name, description, archetype, rarity, armor, block_chance, block_value, dps, speed, type, subtype, strength_requirement, agility_requirement, intelligence_requirement, active_effects, enchantment, padding, weapon_oil, lore_text) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
    'Chainmail Armor', 'Heavy armor made of interlinked metal rings.', 'Heavy', 'Rare', 20, null, null, null, null, 'Armor', 'Chest', 15, 0, 0, 'Damage Reduction', null, 'Thick cloth', null, 'Standard issue for front-line soldiers.');
console.log(`Inserted Chainmail Armor.`);

// Simple Ring
await db.run('INSERT OR IGNORE INTO items (name, description, archetype, rarity, armor, block_chance, block_value, dps, speed, type, subtype, strength_requirement, agility_requirement, intelligence_requirement, active_effects, enchantment, padding, weapon_oil, lore_text) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
    'Simple Ring', 'A plain silver ring.', 'Ring', 'Common', null, null, null, null, null, 'Jewellery', 'Ring', 0, 2, 0, null, null, null, null, 'Often given as a token of friendship.');
console.log(`Inserted Simple Ring.`);

// Amulet of Wisdom
await db.run('INSERT OR IGNORE INTO items (name, description, archetype, rarity, armor, block_chance, block_value, dps, speed, type, subtype, strength_requirement, agility_requirement, intelligence_requirement, active_effects, enchantment, padding, weapon_oil, lore_text) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
    'Amulet of Wisdom', 'An ancient amulet granting insight.', 'Amulet', 'Epic', null, null, null, null, null, 'Jewellery', 'Necklace', 0, 0, 5, 'Increased XP gain', 'Glyph of Knowledge', null, null, 'Belonged to a reclusive scholar.');
console.log(`Inserted Amulet of Wisdom.`);

// Important: Close the database connection when done
db.close((err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Database connection closed.');
    }
});
