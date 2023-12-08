import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import products from './mockups/products';
import allergens from './mockups/allergens';

const prisma = new PrismaClient();
// For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/api', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.get('/api/allergens', (req: Request, res: Response) => {
  res.json(allergens);
});

app.get('/api/products/:gtin', async (req: Request, res: Response) => {
  const { gtin } = req.params;
  const foundProduct = products.find((product) => product.gtin.includes(gtin));
  res.json(foundProduct);
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
