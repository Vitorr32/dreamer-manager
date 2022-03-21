import { useEffect } from 'react';
import { MemoryRouter, Route, Routes, Navigate } from 'react-router-dom';
import { EditorScreen } from './Interface/MainMenu/page/EditorScreen/EditorScreen.component';
import { MainScreen } from './Interface/MainMenu/page/MainScreen/MainScreen.component';
import { TraitEditor } from './Interface/MainMenu/sub-pages/TraitEditor/TraitEditor.component';
import { GameStartDatabaseLoad } from './shared/scripts/DatabaseLoader.script';
import { store } from 'renderer/redux/store';
import { gameStartLoad } from './redux/database/database.reducer';
import { createTheme, ThemeProvider } from '@mui/material';

import '@fontsource/roboto';
import './App.scss';
import { NewEvent } from './Interface/MainMenu/sub-pages/NewEvent/NewEvent.component';

export default function App() {
    useEffect(() => {
        store.dispatch(gameStartLoad());
        GameStartDatabaseLoad();
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
            <MemoryRouter>
                <Routes>
                    <Route path="/" element ={<Navigate to="/menu/edit/event" />} />
                    <Route path="/menu" element ={<MainScreen/>} />
                    <Route path="/menu/edit" element ={<EditorScreen/>} />
                    <Route path="/menu/edit/trait" element ={<TraitEditor/>} />
                    <Route path="/menu/edit/event" element ={<NewEvent/>} />
                </Routes>
            </MemoryRouter>
        </ThemeProvider>
    );
}
