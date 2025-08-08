import db from './database/connection.js';
import bcrypt from 'bcrypt';

const insertDefaultUser = async () => {
    try {
        // [TEMPORARY FIX]: This line will delete any existing 'admin' user.
        // It should be removed after you successfully run the script once.
        await db.run(`DELETE FROM users WHERE username = 'admin';`);

        // Define the plaintext credentials for the user you want to insert
        const username = 'admin';
        const password = '1234';
        
        // Check if the user already exists to prevent duplicates
        const existingUser = await db.get('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser) {
            console.log(`User '${username}' already exists. Skipping insertion.`);
            return;
        }

        // Generate a salt and hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // SQL statement to insert the new user with the hashed password
        const sql = `
            INSERT INTO users (username, password)
            VALUES (?, ?);
        `;

        // Execute the insertion
        await db.run(sql, [username, hashedPassword]);
        console.log(`Successfully inserted new user: '${username}'`);

    } catch (error) {
        console.error('Error inserting user:', error);
    } finally {
        // It's good practice to close the database connection after your script is done
        db.close();
    }
};

// Call the function to execute the insertion
insertDefaultUser();
