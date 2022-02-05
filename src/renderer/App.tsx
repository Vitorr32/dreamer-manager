import { useEffect } from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import { EditorScreen } from './Interface/MainMenu/page/EditorScreen/EditorScreen.component';
import { MainScreen } from './Interface/MainMenu/page/MainScreen/MainScreen.component';
import { TraitEditor } from './Interface/MainMenu/sub-pages/TraitEditor/TraitEditor.component';
import { GameStartDabaseLoad } from './shared/scripts/DatabaseLoader.script';
import { store } from 'renderer/redux/store';
import { gameStartLoad } from './redux/database/database.reducer';
import { createTheme, ThemeProvider } from '@mui/material';

import '@fontsource/roboto';
import './App.scss';
import { NewEvent } from './Interface/MainMenu/sub-pages/NewEvent/NewEvent.component';

export default function App() {
    useEffect(() => {
        store.dispatch(gameStartLoad());
        GameStartDabaseLoad();
    }, []);

    const theme = createTheme({
        palette: {
            background: {
                default: 'whitesmoke',
            },
        },
        typography: {
            fontSize: 18,
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <HashRouter>
                <Route exact path="/" render={() => <Redirect to="/menu/edit/event" />} />
                <Route exact path="/menu" component={MainScreen} />
                <Route exact path="/menu/edit" component={EditorScreen} />
                <Route path="/menu/edit/trait" component={TraitEditor} />
                <Route path="/menu/edit/event" component={NewEvent} />
            </HashRouter>
        </ThemeProvider>
    );
}
