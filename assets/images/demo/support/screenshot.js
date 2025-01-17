const Pageres = require('pageres');
const fetch = require('node-fetch');
const args = require('yargs').argv;
const fs = require('fs');

console.log('Running screenshot.js')

// node screenshot.js --source=http://localhost:1313/pages/index.json --dir=.

const source =  "http://localhost:1313/pages/14-support/index.json";
const dir = ".";
const inputHeight =  args.height;
const inputCrop =  args.crop;

(async () => {

	await fetch(source).then( response => response.json())
	.then( json => {
		
		json.forEach(element => {
			
			let height = inputHeight || 2000;
			let crop = inputCrop || false;

			(async () => {
				await new Pageres({delay: 10})
					.src(element.uri, [`1600x1000`], { filename:`${element.filename}`, crop: true})
					.dest(__dirname)
					.run();
	
				console.log('Finished generating screenshots!');
			})();



		});

	}).catch( (error) => console.log('error', error))
})()