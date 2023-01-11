import { Socket } from "socket.io";

export interface SocketHandlerInterface {

	handleConnection(socket: Socket): void;
	middleware?(soccket: Socket, next: any): void

}
