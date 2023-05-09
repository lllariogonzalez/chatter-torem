import express, { Request } from 'express';
import multer, { diskStorage } from 'multer';
import bodyParser from 'body-parser';
import path from 'path';
import uniqid from 'uniqid';
import cors from 'cors';
import { init } from './socket';

import userRoutes from './routes/user';
import chatRoutes from './routes/chat';
import notFoundRoutes from './routes/notFound';
import { StatusError } from './types/StatusError';

const app = express();

const options: cors.CorsOptions = {
	allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
	credentials: true,
	origin: '*',
	preflightContinue: false,
};

app.use(cors(options));

const fileStorage = diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'images');
	},
	filename: (req, file, callback) => {
		callback(null, `${uniqid()}-${file.originalname}`);
	},
});

const fileFilter = (req: Request, file: any, callback: Function) => {
	let ok = /^image\/(png|jpg|jpeg)/.test(file.mimetype);
	callback(null, ok);
};

app.use(bodyParser.json());

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

app.use('/images', express.static(path.join(__dirname, '..', 'images')));

app.use(userRoutes);
app.use(chatRoutes);

app.use(notFoundRoutes);

/*
    ERROR HANDLER
*/
app.use((error: any, req: any, res: any, next: any): void => {
	const statusError = error as StatusError;
	const status = statusError.status ?? 500;
	const message = statusError.message;
	return res.status(status).json({ message });
});

const port = 8080;
const server = app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
	const io = init(server);
	io.on('connection', () => {
		console.log('Client connected!');
	});
});
