import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(cookieParser());

// Health check
app.get('/health', (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));