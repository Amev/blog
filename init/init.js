import settings from './settings';
import initDB from './initDB';
import prompt from 'prompt';

prompt.start();

function promptDB(error, result) {
	if (error) {
		console.log('Error :');
		console.log(error);
		process.exit();
	}
	console.log(result);
}

prompt.get(settings, promptDB);
