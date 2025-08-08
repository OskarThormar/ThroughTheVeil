import express from 'express';
import bcrypt from 'bcrypt';
import db from '../database/connection.js'; 

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);

    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user.id;
        req.session.username = user.username;
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).send('Invalid username or password');
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not log out');
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).send('Logged out successfully');
    });
});

router.get('/session', (req, res) => {
    if (req.session.userId) {
        res.json({
            isLoggedIn: true,
            username: req.session.username
        });
    } else {
        res.status(200).json({
            isLoggedIn: false
        });
    }
});

export default router;