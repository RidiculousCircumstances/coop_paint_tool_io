import 'reflect-metadata';
import { createExpressServer, RoutingControllersOptions } from 'routing-controllers';
import { createServer } from 'http';
import { Websocket } from './common/socket/Websocket';
import { CanvasHandler } from './canvas/canvas.handler';


const bootstrap = (): void => {

	const port = process.env.APP_PORT || 5000;

	const routingControllerOptions: RoutingControllersOptions = {
		controllers: [`${__dirname}/modules/http/*.controller.*`],
		validation: true,
		classTransformer: true,
		cors: true,
		defaultErrorHandler: true
	}

	const app = createExpressServer(routingControllerOptions);
	const httpServer = createServer(app);
	const io = Websocket.getInstance(httpServer);


	io.initializeHandlers([
		{ path: '/', handler: new CanvasHandler() },
		// { path: '/chat', handler: {} },
	]);

	httpServer.listen(port, () => {
		console.log(`Now running on port ${port}`);
	});

}

bootstrap();
