const { contextBridge, ipcRenderer, app } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  fileSystem: {
    getFilesFromResources(folderPath = ''){
      return ipcRenderer.invoke('get-folder-files', folderPath);
    }
  },
  ipcRenderer: {
    invoke(channel, args){
      return ipcRenderer.invoke(channel, args);
    },
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
  app: {
    getApp(){
      return app;
    }
  }
});
