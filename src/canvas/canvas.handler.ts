import { Socket } from 'socket.io';
import { SocketHandlerInterface } from "../common/socket/socketHandler.interface";
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export class CanvasHandler implements SocketHandlerInterface {

	handleConnection(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): void {
		socket.on('fromClient', (msg) => { 
			console.log(msg);
			socket.emit('fromServer', 'Привет, братик!');
		});
	}

}