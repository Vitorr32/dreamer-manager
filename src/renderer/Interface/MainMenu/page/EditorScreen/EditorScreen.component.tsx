import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export function EditorScreen(_: any) {
    return (
        <menu>
            <Link to="/menu/edit/trait">
                <Button>Edit Traits</Button>
            </Link>
            <Link to="/menu/edit/event">
                <Button>New Event</Button>
            </Link>
            <Link to="/menu/edit/character">
                <Button>New Character</Button>
            </Link>
            <Link to="/menu">
                <Button>Return Menu</Button>
            </Link>
        </menu>
    );
}
