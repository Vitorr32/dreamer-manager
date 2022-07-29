import { Link, Route, Routes } from 'react-router-dom';
import { CharacterEditor } from './CharacterEditor.component';

export function CharacterEditorContainer() {
    return (
        <Routes>
            <Route path="new" element={<CharacterEditor />} />
            <Route
                path="/"
                element={
                    <>
                        <main id="trait-editor-page">
                            <div className="menu-wrapper">
                                <Link to="/menu/edit">
                                    <button>Return Menu</button>
                                </Link>
                                <Link to="new">
                                    <button>New Character</button>
                                </Link>
                            </div>
                        </main>
                    </>
                }
            />
        </Routes>
    );
}
