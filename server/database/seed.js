// database/seed.js
// This script recursively reads all .js files in the 'database/seeding' directory
// and its subdirectories, then executes them to populate the database.

import fs from 'fs/promises'; // Node.js module for file system operations (async/await)
import path from 'path';     // Node.js module for working with file paths
import { fileURLToPath, pathToFileURL } from 'url'; // Utility to get __dirname in ES Modules, and to convert paths to URLs

// Helper to get the current directory in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path to the 'seeding' folder
const seedingFolderPath = path.join(__dirname, 'seeding');

async function runSeedsInDirectory(directoryPath) {
    const entries = await fs.readdir(directoryPath, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(directoryPath, entry.name);
        if (entry.isDirectory()) {
            // If it's a directory, recurse into it
            await runSeedsInDirectory(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.js')) {
            // If it's a JavaScript file, import and execute it
            console.log(`Executing seed file: ${entry.name} from ${path.relative(seedingFolderPath, fullPath)}`);
            try {
                // Convert the local file path to a file:// URL for dynamic import
                const moduleUrl = pathToFileURL(fullPath).href;
                const { default: seedFunction } = await import(moduleUrl);
                if (typeof seedFunction === 'function') {
                    await seedFunction(); // Execute the seed function
                } else {
                    console.warn(`Warning: ${entry.name} does not export a default function. Skipping.`);
                }
            } catch (importErr) {
                console.error(`Error encountered while running ${entry.name}:`, importErr.message);
                // Log and continue to allow other seeds to run, or re-throw to stop
            }
        }
    }
}

/**
 * Initiates the full database seeding process by scanning the main seeding folder.
 */
async function runAllSeeds() {
    console.log('Starting comprehensive database seeding process...');
    try {
        await runSeedsInDirectory(seedingFolderPath);
        console.log('Database seeding process finished.');
    } catch (err) {
        console.error('Failed to initiate or complete comprehensive seeding:', err);
    }
}

// Execute the runAllSeeds function when this script is run directly via Node.js
runAllSeeds();
