import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import products from './mockups/products';
import allAllergens from './mockups/allergens';

const prisma = new PrismaClient();
// For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(express.json());

app.get('/api', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.get('/api/allergens', (req: Request, res: Response) => {
  res.json(allAllergens);
});

app.get('/api/products/:gtin', async (req: Request, res: Response) => {
  const { gtin } = req.params;
  const foundProduct = products.find((product) => product.gtin.includes(gtin));
  res.json(foundProduct);
});

app.patch(
  '/api/users/:userId/allergens',
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const { allergens } = req.body;
      const user = await prisma.user.update({
        where: { id: Number(userId) },
        data: { allergens },
      });
      res.json(user);
    } catch (error) {
      res.status(404).send();
    }
  },
);

app.get('/api/users/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    res.json(user);
  } catch (error) {
    res.status(404).send();
  }
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
