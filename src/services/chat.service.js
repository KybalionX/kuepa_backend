import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';

const client = new MongoClient(process.env.MONGODB_URL);

let chatCollection = null;
(async () => {
	await client.connect();
	console.log('Connected to MongoDB database');
	const mongoDB = client.db(process.env.MONGODB_NAME);
	chatCollection = mongoDB.collection(process.env.MONGODB_COLLECTION);
})();

export const insertMessage = async (data) => {
	const { data: userData } = jwt.verify(data.token, process.env.JWT_SECRET);
	const messageData = {...userData, message: data.message};
	await chatCollection.insertOne(messageData);
	return messageData;
};

export const getMessages = async() => {
	const messages = await chatCollection.find().toArray();
	return messages;
};