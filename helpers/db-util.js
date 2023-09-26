import { MongoClient } from 'mongodb';

export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://mitol5549:ZbQIyUFyrA6Pu9Cm@eventsapp.suim1u3.mongodb.net/?retryWrites=true&w=majority',
  );

  return client;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db('events');

  const result = await db.collection(collection).insertOne(document);

  return result;
};

export const getAllDocuments = async (client, collection, sort, filter = {}) => {
  const db = client.db('events');

  const documents = await db.collection(collection).find(filter).sort(sort).toArray();

  return documents;
};

export const findOne = async (client, collection, filter = {}) => {
  const db = client.db('events');

  const existingItem = await db.collection(collection).findOne(filter);

  return existingItem;
};
