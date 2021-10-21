import React, { useEffect } from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import { EditorScreen } from './Interface/MainMenu/page/EditorScreen/EditorScreen.component';
import { MainScreen } from './Interface/MainMenu/page/MainScreen/MainScreen.component';
import { TraitEditor } from './Interface/MainMenu/sub-pages/TraitEditor/TraitEditor.component';
import { GameStartDabaseLoad } from './shared/scripts/DatabaseLoader.script';
import { store } from 'renderer/redux/store';
import { gameStartLoad } from './redux/database/database.reducer';
import { createTheme, ThemeProvider } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.global.scss';

export default function App() {
    useEffect(() => {
        store.dispatch(gameStartLoad());
        GameStartDabaseLoad();
    }, []);

    const theme = createTheme({
        palette:{
            background:{
                default: 'whitesmoke'
            }
        },
        typography: {
            fontSize: 18,
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <HashRouter>
                <Route exact path="/" render={() => <Redirect to="/menu/edit/trait/new" />} />
                <Route exact path="/menu" component={MainScreen} />
                <Route exact path="/menu/edit" component={EditorScreen} />
                <Route path="/menu/edit/trait" component={TraitEditor} />
            </HashRouter>
        </ThemeProvider>
    );
}
