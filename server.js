import express from 'express';
import "dotenv/config";
import cors from 'cors';
import http from 'http';
import { connectDB } from './lib/db.js';

//Create an Express application and HTTP server
const app = express();
const server = http.createServer(app)

//Middleware setup
app.use(express.json({limit:"4mb"}));
app.use(cors());

app.use("/api/status", (req, res) => res.send("Server is live"));


await connectDB();

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => 
  console.log('Server is running on port'+ PORT)
);

