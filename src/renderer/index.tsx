import { StrictMode, useEffect } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { createRoot } from 'react-dom/client';
import { store } from './redux/store';

import './i18n/i18n';
import { gameStartLoad } from './redux/database/database.reducer';
import { GameStartDatabaseLoad } from './shared/scripts/DatabaseLoader.script';

const container = document.getElementById('root')!;
const root = createRoot(container);
//Startup the GameDatabase by reading all the elements and saving it to memory.
store.dispatch(gameStartLoad());
GameStartDatabaseLoad();

root.render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
);

// // calling IPC exposed from preload script
// window.electron.ipcRenderer.once('ipc-example', (arg) => {
//     // eslint-disable-next-line no-console
//     console.log(arg);
// });
// window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
