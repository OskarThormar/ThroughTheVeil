import { Router } from 'express';
import db from '../database/connection.js';


const router = Router();

router.get('/items/weapons', async (req, res) => {
    try {
        const weaponItems = await db.all('SELECT * FROM items WHERE type = ?;', 'Weapon');
        res.json(weaponItems);
    } catch (err) {
        console.error("Error fetching weapon items:", err);
        res.status(500).json({ error: err.message });
    }
});

export default router;