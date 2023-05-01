import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { createRoot } from 'react-dom/client';
import { store } from './redux/store';

import './i18n/i18n';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
);
