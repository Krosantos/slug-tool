const fs = require('fs');
const path = require('path');
const ncp = require('ncp');

/*
When we run electron-packager, we need all our files in one place: bundled .js, entry html, static assets,
package.json, and the main electron kick-off script. This script moves and stages those pieces.
*/

const stagingPath = path.resolve(__dirname, '../staging');
const compilePath = path.resolve(__dirname, '../compiled');
const deleteFolderRecursive = (path) => {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach((file) => {
			const curPath = `${path}/${file}`;
			if (fs.lstatSync(curPath).isDirectory()) { // recurse
				deleteFolderRecursive(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
};

// Wipe out the folders.
deleteFolderRecursive(stagingPath);
deleteFolderRecursive(compilePath);
fs.mkdirSync(stagingPath);
fs.mkdirSync(compilePath);

// Move electron/index.js to the staging folder
fs.copyFileSync(path.resolve(__dirname, 'index.js'), `${stagingPath}/index.js`);

// Copy over package.json, but modify the "main" property.
const packageJson = require('../package.json');
const newPackage = { ...packageJson, main: './index.js' };
fs.writeFileSync(`${stagingPath}/package.json`, JSON.stringify(newPackage, null, 2));

// Copy over our bootstrappy HTML, and our bundle.
fs.copyFileSync(path.resolve(__dirname, 'index.html'), `${stagingPath}/index.html`);
fs.copyFileSync('./dist/bundle.js', `${stagingPath}/bundle.js`);

// Copy over static assets.
fs.readdirSync('./src/static').forEach((file) => {
	const curPath = `./src/static/${file}`;
	if (fs.lstatSync(curPath).isDirectory()) {
		ncp(curPath, `${stagingPath}/${file}`);
	}
});

