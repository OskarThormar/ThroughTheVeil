/*
import db from '../../connection.js'; // Ensure this path is correct for your database connection

export default async function seedZonesAndCreatures() {
    console.log('Seeding zones and creatures...');

    try {
        const zones = [
            // Germanic Zones
            {
                name: 'Fjörlund',
                description: 'A sprawling, mist-shrouded ancient forest where colossal trees grow intertwined, their roots drawing deep on primal energies. Strange, resonant calls echo through its depths, hinting at creatures of immense size and power that guard the lifeblood of the woods, often vibrating with subtle psychic hums.',
                recommended_level_min: 40,
                recommended_level_max: 50,
                type: 'Ancient Forest',
                lore_text: 'Whispers of ancient guardians and untold power permeate the very air of Fjörlund.'
            },
            {
                name: 'Wolvesgaard',
                description: 'A vast, windswept plain and rolling hills, crisscrossed by ancient game trails and punctuated by solitary, jagged peaks. The very air pulses with an ancient, predatory hum, a psychic call to the wild from the numerous, intelligent beasts that claim this expansive hunting ground.',
                recommended_level_min: 30,
                recommended_level_max: 45,
                type: 'Plains',
                lore_text: 'Only the most cunning hunters survive the wild, untamed expanse of Wolvesgaard.'
            },
            {
                name: 'Draugen\'s Deep',
                description: 'A sunken, abyssal valley shrouded in perpetual twilight, its depths filled with ancient, stagnant waters and chilling air. Whispers carry on the currents, hinting at immense, hidden treasures and the psychic wrath of restless spirits who guard their hoards from beyond the veil.',
                recommended_level_min: 35,
                recommended_level_max: 50,
                type: 'Abyssal Valley',
                lore_text: 'The restless dead here guard secrets best left undisturbed.'
            },
            {
                name: 'Runehelm',
                description: 'A secluded mountain valley encircled by towering peaks that scrape the heavens, its slopes dotted with colossal runestones that glow faintly with an inner, arcane light. The energy here empowers mental clarity but also attracts beings drawn to raw magical power and ancient knowledge.',
                recommended_level_min: 35,
                recommended_level_max: 50,
                type: 'Mountain Valley',
                lore_text: 'Ancient runes hum with untold power, attracting both scholars and those who seek to exploit it.'
            },
            // Roman Zones
            {
                name: 'Aurelia Fossa',
                description: 'A vast, luminous canyon, its sheer walls shimmering with veins of unknown, radiant ore, casting a golden light into the chasm\'s abyssal depths. Powerful elemental currents surge through its confines, and its air crackles with latent, raw magical energy.',
                recommended_level_min: 35,
                recommended_level_max: 50,
                type: 'Luminous Canyon',
                lore_text: 'The very earth here seems to breathe magic, illuminating secrets and dangers alike.'
            },
            {
                name: 'Vesperia Silva',
                description: 'A sprawling, ancient forest where twilight seems to perpetually cling to the deep glades and gnarled trees, even at noon. Strange, luminescent flora lights scattered clearings, and the pervasive stillness suggests hidden eyes and profound, quiet magic that can lull or confuse the mind.',
                recommended_level_min: 20,
                recommended_level_max: 35,
                type: 'Twilight Forest',
                lore_text: 'Lost travelers often find themselves ensnared by the quiet enchantments of this ancient wood.'
            },
            {
                name: 'Solara Nexus',
                description: 'A high, windswept plateau where the very air shimmers with an intense, celestial light. Ancient, crystalline formations pierce the ground, drawing down solar energies from the cosmos, creating pockets of immense power and attracting beings of pure light or fiercely territorial nature.',
                recommended_level_min: 40,
                recommended_level_max: 50,
                type: 'Celestial Plateau',
                lore_text: 'Only beings of pure essence can truly thrive in the radiant heart of Solara Nexus.'
            },
            {
                name: 'Umbra Aeterna',
                description: 'A region of perpetual gloom and chilling stillness, where colossal, twisted formations of obsidian and dark rock block out the natural light. Deep caverns yawn open, leading into abyssal chasms where forgotten horrors lurk and the very silence weighs heavy on the soul, filled with latent psychic dread.',
                recommended_level_min: 45,
                recommended_level_max: 50,
                type: 'Abyssal Caverns',
                lore_text: 'The shadows here hold ancient terrors that prey on the unwary mind.'
            },
            // Greek Zones
            {
                name: 'Chthonos Reach',
                description: 'A vast, rugged expanse of deep fissures and crumbling rock formations that plummet into abyssal, mist-shrouded chasms. The ground here trembles with subterranean life and the psychic echoes of forgotten, titanic struggles that reverberate from deep beneath the surface.',
                recommended_level_min: 35,
                recommended_level_max: 50,
                type: 'Fissured Depths',
                lore_text: 'Echoes of titanic battles linger in these crumbling depths.'
            },
            {
                name: 'Ourania\'s Ascent',
                description: 'Towering, crystalline peaks that pierce the clouds, their highest reaches bathed in an ethereal glow that seems to draw power from the cosmos. The air is thin and pure, resonating with a faint, harmonious psychic hum, attracting beings of grace and celestial power.',
                recommended_level_min: 40,
                recommended_level_max: 50,
                type: 'Crystalline Peaks',
                lore_text: 'Only those truly worthy can reach the celestial heights of Ourania.'
            },
            {
                name: 'Pelagios Glyphs',
                description: 'A tumultuous expanse of churning, deep-blue waters dotted with jagged, mist-shrouded sea stacks and treacherous maelstroms. The very currents seem to etch arcane patterns on the surface, pulsing with a potent, chaotic psychic energy that can disorient and ensnare.',
                recommended_level_min: 40,
                recommended_level_max: 50,
                type: 'Chaotic Waters',
                lore_text: 'The sea\'s fury is mirrored by the untamed magic within its currents.'
            },
            {
                name: 'Tartarean Bloom',
                description: 'A vast, sunken basin where an unnaturally vibrant, bio-luminescent flora thrives amidst jagged obsidian formations. The air is heavy with a strange, sweet scent and a palpable, unsettling psychic presence that permeates the unusual growth, hinting at the corruption of life itself.',
                recommended_level_min: 30,
                recommended_level_max: 45,
                type: 'Corrupted Basin',
                lore_text: 'Beauty hides deadly corruption beneath the bio-luminescent glow.'
            },
            // Celtic Zones
            {
                name: 'Aos Sí Vale',
                description: 'A lush, verdant valley perpetually bathed in soft, shifting light, where ancient groves and clear streams wind amidst rolling hills. The very air seems to hum with ancient glamour, occasionally revealing hidden pathways or shimmering illusory vistas that test the mind\'s perception.',
                recommended_level_min: 10,
                recommended_level_max: 25,
                type: 'Enchanted Valley',
                lore_text: 'The Fae hold court here, and mortals are merely their entertainment.'
            },
            {
                name: 'Corcair Mor',
                description: 'Expansive, rolling highlands carpeted in deep purple flora that glows faintly under the alien sky. The ground here often yields strange, crystalline formations that resonate with powerful, sometimes overwhelming, psychic echoes of ancient events and primal battles.',
                recommended_level_min: 20,
                recommended_level_max: 35,
                type: 'Highlands',
                lore_text: 'The very earth here remembers ancient, violent clashes.'
            },
            {
                name: 'Dùn Ard',
                description: 'A rugged, elevated plateau crowned by colossal, naturally formed stone structures that resemble ancient fortifications, defying gravity. The constant, swirling winds carry strange, ancient whispers, and the area serves as a vantage point for fierce, territorial guardians of the skies and stone.',
                recommended_level_min: 30,
                recommended_level_max: 45,
                type: 'Stone Plateau',
                lore_text: 'Only the stoutest hearts dare challenge the guardians of Dùn Ard.'
            },
            {
                name: 'Uisge Lios',
                description: 'A vast, misty loch or bogland where dark water stretches into the horizon, dotted with small, craggy islands and obscured channels. Strange lights dance across its surface at night, and the murky depths hold ancient secrets and powerful, elusive entities.',
                recommended_level_min: 25,
                recommended_level_max: 40,
                type: 'Misty Loch',
                lore_text: 'The loch hides more than just its depths; ancient evils stir below.'
            },
            // Dacian Zones
            {
                name: 'Zalmoxis\' Reach',
                description: 'A towering, sacred mountain plateau, perpetually wreathed in mystical mists that part to reveal colossal, ancient trees and untouched stone altars. The air is thick with a palpable spiritual energy, a silent resonance that can inspire awe or dread in the unprepared, linked to primal psychic forces.',
                recommended_level_min: 40,
                recommended_level_max: 50,
                type: 'Sacred Mountain',
                lore_text: 'A place of profound spiritual power, watched over by ancient entities.'
            },
            {
                name: 'Comidava Pass',
                description: 'A perilous, narrow mountain pass cutting through sheer rock faces, often shrouded in a strange, oppressive silence. The winds howl with unseen voices, and ancient, crumbling fortifications formed by primordial geological forces line its treacherous path, hinting at forgotten, powerful guardians.',
                recommended_level_min: 35,
                recommended_level_max: 50,
                type: 'Mountain Pass',
                lore_text: 'Many have attempted this pass, few have returned.'
            },
            {
                name: 'Rubalux',
                description: 'A deep, expansive forest where the very leaves glow with an inner luminescence, casting an ethereal, shifting light across the forest floor. Strange, beautiful melodies drift through the trees, sometimes leading the unwary into bewildering psychic illusions or beckoning them deeper into the woods.',
                recommended_level_min: 15,
                recommended_level_max: 30,
                type: 'Luminescent Forest',
                lore_text: 'The light here is deceptive, weaving illusions for those who stray from the path.'
            },
            {
                name: 'Vulturon Heights',
                description: 'Soaring, craggy peaks that dominate the horizon, often circled by immense, shadowy winged creatures whose psychic calls can echo for miles. The air here is thin and biting, and the sheer cliffs conceal vast nesting grounds and ancient aeries of powerful, predatory spirits.',
                recommended_level_min: 40,
                recommended_level_max: 50,
                type: 'Craggy Peaks',
                lore_text: 'The domain of winged predators; only the foolish or brave enter.'
            }
        ];

        // --- Insert Zones ---
        // We'll store zone IDs to link creatures later
        const zoneIdMap = new Map();
        for (const zone of zones) {
            const result = await db.run(
                `INSERT OR IGNORE INTO zones (name, description, recommended_level_min, recommended_level_max, type, lore_text)
                 VALUES (?, ?, ?, ?, ?, ?);`,
                [zone.name, zone.description, zone.recommended_level_min, zone.recommended_level_max, zone.type, zone.lore_text]
            );
            if (result.lastID) {
                zoneIdMap.set(zone.name, result.lastID);
                console.log(`Inserted zone: ${zone.name} (ID: ${result.lastID})`);
            } else {
                // If it was ignored, fetch its ID
                const existingZone = await db.get('SELECT id FROM zones WHERE name = ?;', zone.name);
                if (existingZone) {
                    zoneIdMap.set(zone.name, existingZone.id);
                    console.log(`Zone already exists: ${zone.name} (ID: ${existingZone.id})`);
                } else {
                    console.error(`Failed to insert or find zone: ${zone.name}`);
                }
            }
        }
            console.log('Zones and creatures seeding completed successfully.');
    } catch (err) {
        console.error('Error during zones and creatures seeding:', err.message);
        throw err; // Re-throw to propagate the error if called by a master seed script
    }
}
*/