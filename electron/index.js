const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');
// Keep a global reference of the window object, to spare it from garbage collection.
let mainWindow;
function createWindow() {
	mainWindow = new BrowserWindow({
		width: 525,
		height: 565,
		minWidth: 400,
		minHeight: 450,
		titleBarStyle: 'hiddenInset',
		webPreferences: {
			webSecurity: false,
		},
	});
	// Check for content either from local (when developing), or from compoiled code.
	if (process.env.FROM_LOCAL) {
		mainWindow.loadURL('http://localhost:3000');
	} else {
		mainWindow.loadURL(url.format({
			pathname: path.join(__dirname, './index.html'),
			protocol: 'file:',
			slashes: true,
		}));

		const template = [{
			label: 'Application',
			submenu: [
				{ label: 'About Application', selector: 'orderFrontStandardAboutPanel:' },
				{ type: 'separator' },
				{ label: 'Quit', accelerator: 'Command+Q', click() { app.quit(); } },
			],
		}, {
			label: 'Edit',
			submenu: [
				{ label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
				{ label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
				{ type: 'separator' },
				{ label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
				{ label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
				{ label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
				{ label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
			],
		},
		];

		Menu.setApplicationMenu(Menu.buildFromTemplate(template));
	}
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}
app.on('ready', createWindow);
app.on('window-all-closed', () => {
// Mac behaves wacky. Emulate that.
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
app.on('activate', () => {
// Open a new window if there ain't one (mostly for Mac's benefit.)
	if (mainWindow === null) {
		createWindow();
	}
});
