import express from 'express';
import cors from 'cors';
import bankRoutes from './routes/bankRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', bankRoutes);

// Health Check route
app.get('/', (req, res) => {
    res.json({ status: "online", service: "ArmorIQ Banking API (MVC)" });
});

export default app;