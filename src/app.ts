import express from 'express';
import { Request, Response } from 'express';

const app = express();

app.use(express.json());
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

const port = 6002
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});