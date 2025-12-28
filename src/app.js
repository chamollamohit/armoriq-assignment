import express from 'express';
import cors from 'cors';
import bankRoutes from './routes/bankRoutes.js';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

const app = express();

app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: "Too many requests, please try again later." }
});
app.use(limiter);

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', bankRoutes);

// Health Check route
app.get('/', (req, res) => {
    res.json({ status: "online", service: "ArmorIQ Banking API (MVC)" });
});

export default app;