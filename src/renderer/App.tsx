import { MemoryRouter, Route, Routes, Navigate } from 'react-router-dom';
import { EditorScreen } from './Interface/MainMenu/page/EditorScreen/EditorScreen.component';
import { MainScreen } from './Interface/MainMenu/page/MainScreen/MainScreen.component';
import { TraitEditorContainer } from './Interface/MainMenu/sub-pages/TraitEditor/TraitEditorContainer.component';
import { createTheme, ThemeProvider } from '@mui/material';

import '@fontsource/roboto';
import './App.scss';
import { EventEditor } from './Interface/MainMenu/sub-pages/EventEditor/EventEditor.component';
import { CharacterEditorContainer } from './Interface/MainMenu/sub-pages/CharacterEditor/CharacterEditorContainer.component';
import { StartUpPage } from './Interface/MainMenu/page/MainScreen/StartUpPage.component';
import { BASE_GAME_FOLDER } from './shared/Constants';

export default function App() {
    const theme = createTheme({
        palette: {
            mode: 'dark',
            background: {
                default: '#160923',
                paper: '#1f122c',
            },
        },
        typography: {
            fontSize: 18,
        },
    });

    console.log('Game Theme', theme);

    return (
        <ThemeProvider theme={theme}>
            <MemoryRouter>
                <Routes>
                    <Route index element={<Navigate to={`/menu/edit/trait/edit/${BASE_GAME_FOLDER}/trait_0`} />} />
                    <Route path='/startup' element={<StartUpPage/>} />
                    <Route path="/menu" element={<MainScreen />} />
                    <Route path="/menu/edit" element={<EditorScreen />} />
                    <Route path="/menu/edit/trait/*" element={<TraitEditorContainer />} />
                    <Route path="/menu/edit/event/*" element={<EventEditor />} />
                    <Route path="/menu/edit/character/*" element={<CharacterEditorContainer />} />
                </Routes>
            </MemoryRouter>
        </ThemeProvider>
    );
}
