import * as http from 'http';
import { Server, Socket } from 'socket.io';
import { SocketHandlerInterface } from './socketHandler.interface';

const WEBSOCKET_CORS = {
	origin: "*",
	methods: ["GET", "POST"]
}

export class Websocket extends Server {

	private static io: Websocket;

	private constructor(httpServer: http.Server) {
		super(httpServer, {
			cors: WEBSOCKET_CORS
		});
	}

	public static getInstance(httpServer?: http.Server): Websocket {

		if (!Websocket.io && httpServer) {
			Websocket.io = new Websocket(httpServer);
		}

		return Websocket.io;

	}

	/**
	 * 
	 * @param socketHandlers Инициализация обработчиков соединения
	 */
	public initializeHandlers(socketHandlers: Array<{ path: string, handler: SocketHandlerInterface }>) {
		socketHandlers.forEach(element => {
			this.on('connection', () => {
				const namespace = Websocket.io.of(element.path, (socket: Socket) => {
					element.handler.handleConnection(socket);

					socket.on('disconnect', (reason) => {
						console.log(reason);
					});
				});

				if (element.handler.middleware) {
					namespace.use(element.handler.middleware);
				}

			});

			
		});
	}
}