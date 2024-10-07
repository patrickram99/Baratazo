import { Request, Response } from 'express';
import { getAllBooks } from '../services/book.service';

export const all = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await getAllBooks();
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};