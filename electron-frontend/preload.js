const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    receiveFromQt: (callback) => ipcRenderer.on('from-qt', (event, message) => callback(message)),
});

