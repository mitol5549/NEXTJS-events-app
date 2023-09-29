import { hashPassword } from '../../../helpers/auth';
import { connectDatabase, findOne, insertDocument } from '../../../helpers/db-util';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const { email, password } = data;

    if (!email || !email.includes('@') || !password || password.trim().length < 7) {
      res.status(422).json({ message: 'Invalid input - password should also be at least 7 characters long.' });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' });
      return;
    }
    const existingUser = await findOne(client, 'users', { email });

    if (existingUser) {
      res.status(422).json({ message: 'User already exists!' });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    try {
      await insertDocument(client, 'users', { email, password: hashedPassword });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting user data failed!' });
      return;
    }

    res.status(201).json({ message: 'Created user!' });
  }
}
