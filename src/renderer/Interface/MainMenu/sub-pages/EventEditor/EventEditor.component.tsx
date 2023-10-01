import { Button } from '@mui/material';
import { useState } from 'react';
import { Link, Route, Routes , useNavigate } from 'react-router-dom';
import { Event } from 'renderer/shared/models/base/Event.model';
import { NewEvent } from '../NewEvent/NewEvent.component';
import { EventPicker } from './EventPicker.component';

export function EventEditor() {
    const [openEventSelectionModal, setEventSelectionModalState] = useState<boolean>(false);
    const navigate = useNavigate();

    const onEventToEditSelected = (event: Event) => {
        navigate(`edit/${event.id}`);
        setEventSelectionModalState(false);
    };

    return (
        <Routes>
            <Route path="new" element={<NewEvent />} />
            <Route path="edit/:id" element={<NewEvent />} />
            <Route
                path="/"
                element={
                    <>
                        <main id="trait-editor-page">
                            <div className="menu-wrapper">
                                <Link to="new">
                                    <button>New Event</button>
                                </Link>
                                <Button onClick={() => setEventSelectionModalState(true)}>Edit Event</Button>
                            </div>
                        </main>

                        <EventPicker open={openEventSelectionModal} onClose={() => setEventSelectionModalState(true)} onSelected={onEventToEditSelected} />
                    </>
                }
            />
        </Routes>
    );
}
