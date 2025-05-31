import runServer from './src/server.ts';

try {
	runServer();
} catch (e) {
	console.log('Erro interno: \n', e);
}
