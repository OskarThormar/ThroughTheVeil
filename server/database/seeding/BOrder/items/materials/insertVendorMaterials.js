import db from '../../../../connection.js';

export default async function seedVendorMaterials() {
    console.log('Seeding vendor materials...');

    const vendorMaterials = [
        { name: 'Rivet', 
            description: 'Used to rivet together materials', 
            rarity: 'Common', 
            type: 'Rivet' 
        },

        { name: 'Stitchings', 
            description: 'Used to stitch together materials', 
            rarity: 'Common', 
            type: 'Stichings' 
        },

        { name: 'Padding', 
            description: 'Inner lining of armors', 
            rarity: 'Common', 
            type: 'Padding' 
        },

        { name: 'Glass Vial', 
            description: 'Used to contain liquids', 
            rarity: 'Common', 
            type: 'Vial' 
        },

        { name: 'Crystal Vial', 
            description: 'Used to contain liquids', 
            rarity: 'Common', 
            type: 'Vial' 
        },

        { name: 'Arcane Vial', 
            description: 'Used to contain liquids', 
            rarity: 'Common', 
            type: 'Vial' 
        },

        { name: 'Primal Vial', 
            description: 'Used to contain liquids', 
            rarity: 'Common', 
            type: 'Vial' 
        },

        { name: 'Ether Vial', 
            description: 'Used to contain liquids', 
            rarity: 'Common', 
            type: 'Vial' 
        },
    ];

    for (const vendorMaterial of vendorMaterials) {
        await db.run(
            `INSERT OR IGNORE INTO vendor_materials (
                name, description, rarity, type
            ) VALUES (?, ?, ?, ?);`,
            [
                vendorMaterial.name, vendorMaterial.description, vendorMaterial.rarity, vendorMaterial.type
            ]
        );
    }
    console.log('Vendor materials completed successfully.');
}