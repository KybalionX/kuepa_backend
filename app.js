import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import {GetController, AuthController} from './src/controllers/index.js';
import { ChatService } from './src/services/index.js';

dotenv.config();

const PORT = process.env.API_PORT;
const app = express();
const io = new Server(http.createServer(app), {
	cors: { origin: 'http://localhost:3000' },
});

app.use(cors({
	origin: 'http://localhost:3000'
}));
app.use(bodyParser.json());
app.use('', GetController);
app.use('/auth', AuthController);

let socketClients = [];
io.on('connection', async (socket) => {
	const messages = await ChatService.getMessages();
	socket.emit('initialMessages', messages);
	socketClients.push(socket.id);

	io.emit('usersUpdate', socketClients);

	socket.on('message', async (data) => {
		const mensajeInsertado = await ChatService.insertMessage(data);
		io.emit('messageResponse', mensajeInsertado);
	});

	socket.on('disconnect', () => {
		socketClients = socketClients.filter((userId) => userId !== socket.id);
		io.emit('usersUpdate', socketClients);
	});
});


io.listen(process.env.WS_PORT);
app.listen(PORT, () => console.log(`App Listen in port ${PORT}`));
