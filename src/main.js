var app = require('app');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function() {
	
	if (process.platform != 'darwin') {
		app.quit();
	}

});

app.on('ready', getMainWindow);


function getMainWindow() {
	const workAreaSize = require('screen').getPrimaryDisplay().workAreaSize;

	mainWindow = new BrowserWindow({
			'web-preferences': {
                'experimental-features': true,
                'experimental-canvas-features': true,
                'subpixel-font-scaling': true,
                'overlay-scrollbars': true
            },
            resizable: true,
            'min-width': 800,
            'min-height': 600,
            width: 800,
            height: 600,
            show: true
    });
	
	mainWindow.loadURL('file://' + __dirname + '/static/index.html');
	
	mainWindow.openDevTools();
	
	mainWindow.on('closed', function() {
		
		mainWindow = null;
	});
}