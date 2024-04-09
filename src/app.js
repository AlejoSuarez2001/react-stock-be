import express from "express";
import stocksRoutes from "./routes/stocks.routes.js";
import usersRoutes from "./routes/users.routes.js";
import followRoutes from "./routes/follows.routes.js";

const app = express();

// middlewares
app.use(express.json());

app.use(stocksRoutes);
app.use(usersRoutes);
app.use(followRoutes);

export default app;
