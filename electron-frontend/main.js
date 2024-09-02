const { app, BrowserWindow, ipcMain } = require('electron/main');
const { spawn } = require('child_process');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
        },
    });

    mainWindow.loadFile('index.html');
    mainWindow.webContents.openDevTools();

    console.log("createWindow() called!")
}

app.on('ready', () => {
    createWindow();

    console.log('ready')

    const qtBackend = spawn(path.join(__dirname, '..', 'qt-backend', 'build', 'QtBackend'));

    qtBackend.stdout.on('data', (data) => {
        const message = data.toString().trim();
        console.log('Message from Qt Backend:', message);
        mainWindow.webContents.send('from-qt', message);
    });

    qtBackend.on('close', (code) => {
        console.log(`Qt Backend process exited with code ${code}`);
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }

    console.log("active")
});

