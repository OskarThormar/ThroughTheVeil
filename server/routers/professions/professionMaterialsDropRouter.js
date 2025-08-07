// database/routers/professions/professionMaterialsRouter.js
import { Router } from 'express';
import db from '../../database/connection.js';


const router = Router();

router.get('/materials/drops', async (req, res) => {
    try {
        const sql = await db.all('SELECT * FROM profession_materials WHERE type = ?;', 'Drops');
        res.json(sql);
    } catch (err) {
        console.error("Error fetching skinning items:", err);
        res.status(500).json({ error: err.message });
    }
});

// Export the router so it can be used in your main server file
export default router;