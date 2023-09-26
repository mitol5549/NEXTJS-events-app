import { hashPassword } from '../../../helpers/auth';
import { connectDatabase, insertDocument } from '../../../helpers/db-util';

export default async function handler(req, res) {
  const data = req.body;

  const { email, password } = data;

  if (!email || !email.include('@') || !password || password.trim().lenght < 7) {
    res.status(422).json({ message: 'Invalid input - password should also be at least 7 characters long.' });
    return;
  }

  const hashedPassword = hashPassword(password);

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  try {
    await insertDocument(client, 'users', { email, password: hashedPassword });
    client.close();
  } catch (error) {
    res.status(500).json({ message: 'Inserting user data failed!' });
    return;
  }

  res.status(201).json({ message: 'Created user!' });
}
