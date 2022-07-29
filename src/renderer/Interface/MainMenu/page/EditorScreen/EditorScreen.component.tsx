import React from "react";
import { Link } from "react-router-dom";

export function EditorScreen(_: any) {
    return (
        <menu>
            <Link to="/menu/edit/trait" >
                <button>Edit Traits</button>
            </Link>
            <Link to="/menu/edit/event" >
                <button>New Event</button>
            </Link>
            <Link to="/menu/edit/character" >
                <button>New Character</button>
            </Link>
            <Link to="/menu" >
                <button>Return Menu</button>
            </Link>

        </menu>
    )
}
