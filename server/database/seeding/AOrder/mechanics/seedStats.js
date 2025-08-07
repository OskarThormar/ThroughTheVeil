import db from '../../../connection.js';

// The seed runner expects a default function to be exported.
// This async function will populate the 'stats' table.
export default async function seedStats() {
    try {
        // Clear existing data to prevent duplicate entries on re-run.
        await db.run("DELETE FROM stats");

        const insertStmt = await db.prepare(`
            INSERT INTO stats (name, description, archetype)
            VALUES (?, ?, ?);
        `);

        // --- Strength Archetype Stats ---
        await insertStmt.run("Strength", "Attack power, block value, and block chance", "Strength");
        await insertStmt.run("Endurance", "Maximum health", "Strength");
        await insertStmt.run("Stamina", "Maximum physical resources and physical resource generation", "Strength");
        await insertStmt.run("Conditioning", "Increases armor from items and effects", "Strength");
        await insertStmt.run("Toughness", "Damage interval", "Strength");

        // --- Agility Archetype Stats ---
        await insertStmt.run("Agility", "Attack power and critical strike chance", "Agility");
        await insertStmt.run("Dexterity", "Physical hit", "Agility");
        await insertStmt.run("Celerity", "Attack speed, dodge chance, and block chance", "Agility");
        await insertStmt.run("Grace", "Physical resource cost", "Agility");
        
        // --- Intelligence Archetype Stats ---
        await insertStmt.run("Intelligence", "Spell power", "Intelligence");
        await insertStmt.run("Acuity", "Spell critical strike chance", "Intelligence");
        await insertStmt.run("Alacrity", "Spell haste", "Intelligence");
        await insertStmt.run("Clarity", "Spell hit", "Intelligence");
        await insertStmt.run("Essence", "Resource cost of magical abilities", "Intelligence");
        await insertStmt.run("Spirit", "Maximum magical resources and magical resource generation", "Intelligence");
        await insertStmt.run("Aura", "Slowly regenerating magical shield", "Intelligence");

        await insertStmt.finalize();

        console.log("Stats table seeded successfully!");
    } catch (error) {
        console.error("Error seeding stats table:", error);
    }
}
