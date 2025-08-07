// database/routers/professions/professionMaterialsRouter.js
import { Router } from 'express';
import db from '../../database/connection.js';


const router = Router();

router.get('/materials/vendor', async (req, res) => {
    try {
        const sql = await db.all('SELECT * FROM vendor_materials');
        res.json(sql);
    } catch (err) {
        console.error("Error fetching vendor items:", err);
        res.status(500).json({ error: err.message });
    }
});

// Export the router so it can be used in your main server file
export default router;