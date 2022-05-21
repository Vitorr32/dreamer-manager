import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { NewTrait } from '../NewTrait/NewTrait.component';

export function TraitEditor() {
    return (
        <Routes>
            <Route path="new" element={<NewTrait />} />
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
                                    <button>New Trait</button>
                                </Link>

                            </div>
                        </main>
                    </>
                }
            />
        </Routes>
    );
}
