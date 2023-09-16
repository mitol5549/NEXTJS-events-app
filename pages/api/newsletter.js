import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    const client = await MongoClient.connect(
      'mongodb+srv://mitol5549:ZbQIyUFyrA6Pu9Cm@eventsapp.suim1u3.mongodb.net/?retryWrites=true&w=majority',
    );

    const db = client.db('newsletter');

    await db.collection('emails').insertOne({ email: userEmail });

    client.close();

    res.status(201).json({ message: 'Signet up!' });
  }
}
